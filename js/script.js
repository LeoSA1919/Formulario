/* ============================================================================
   Skytech-Geo · Registro de clientes
   Validaciones del lado del cliente con JavaScript puro (sin librerías)

   Organización del archivo:
     1. Referencias al DOM
     2. Expresiones regulares y mensajes
     3. Utilidades para mostrar / limpiar estados de un campo
     4. Una función de validación por campo
     5. Validación completa del formulario
     6. Registro de eventos: input, blur (y change) y submit
     7. Inicialización

   Eventos exigidos por la rúbrica:
     - input  → validación en tiempo real mientras el usuario escribe
     - blur   → validación al perder el foco
     - submit → validación final; se bloquea el envío si hay errores
   ============================================================================ */

"use strict";


/* ----------------------------------------------------------------------------
   1. REFERENCIAS AL DOM
   ---------------------------------------------------------------------------- */
const formulario = document.getElementById("formulario-registro");
const botonEnviar = document.getElementById("boton-enviar");
const botonLimpiar = document.getElementById("boton-limpiar");
const mensajeGlobal = document.getElementById("mensaje-global");
const contadorComentarios = document.getElementById("contador-comentarios");
const itemsRequisitos = document.querySelectorAll("#requisitos-contrasena .requisitos__item");

/* Objeto con todos los controles del formulario, indexados por nombre */
const campos = {
  nombre: document.getElementById("nombre"),
  correo: document.getElementById("correo"),
  telefono: document.getElementById("telefono"),
  edad: document.getElementById("edad"),
  contrasena: document.getElementById("contrasena"),
  confirmar: document.getElementById("confirmar"),
  servicio: document.getElementById("servicio"),
  comentarios: document.getElementById("comentarios"),
  terminos: document.getElementById("terminos")
};

/* Conjunto de campos que el usuario ya "tocó" (perdieron el foco al menos una
   vez). Sirve para no mostrar "campo obligatorio" antes de que el usuario
   haya tenido la oportunidad de escribir. */
const camposTocados = new Set();


/* ----------------------------------------------------------------------------
   2. EXPRESIONES REGULARES Y MENSAJES
   ---------------------------------------------------------------------------- */
const REGEX = {
  // Solo letras (incluye acentos y ñ) y espacios
  soloLetras: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/,
  // Formato básico de correo: texto@dominio.extensión (sin espacios)
  correo: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  // Solo dígitos, entre 7 y 15
  telefono: /^[0-9]{7,15}$/,
  mayuscula: /[A-ZÁÉÍÓÚÑ]/,
  numero: /[0-9]/
};

const LIMITES = {
  nombreMin: 3,
  contrasenaMin: 8,
  telefonoMin: 7,
  telefonoMax: 15,
  edadMin: 18,
  edadMax: 100,
  comentariosMax: 500
};


/* ----------------------------------------------------------------------------
   3. UTILIDADES DE ESTADO VISUAL
   ---------------------------------------------------------------------------- */

/**
 * Devuelve el elemento <span> donde se muestra el error de un campo.
 * Convención: el id del span es "error-" + id del campo.
 * @param {HTMLElement} campo
 * @returns {HTMLElement|null}
 */
function obtenerContenedorError(campo) {
  return document.getElementById("error-" + campo.id);
}

/**
 * Marca un campo como inválido: borde rojo + mensaje específico.
 * @param {HTMLElement} campo
 * @param {string} mensaje
 * @returns {boolean} siempre false, para encadenar en las validaciones
 */
function mostrarError(campo, mensaje) {
  const contenedor = obtenerContenedorError(campo);

  campo.classList.remove("es-valido");
  campo.classList.add("es-invalido");
  campo.setAttribute("aria-invalid", "true");

  if (contenedor) {
    contenedor.textContent = mensaje;
  }
  return false;
}

/**
 * Marca un campo como válido: borde verde y sin mensaje.
 * @param {HTMLElement} campo
 * @returns {boolean} siempre true
 */
function marcarValido(campo) {
  const contenedor = obtenerContenedorError(campo);

  campo.classList.remove("es-invalido");
  campo.classList.add("es-valido");
  campo.removeAttribute("aria-invalid");

  if (contenedor) {
    contenedor.textContent = "";
  }
  return true;
}

/**
 * Quita cualquier estado visual del campo (ni válido ni inválido).
 * @param {HTMLElement} campo
 */
function limpiarEstado(campo) {
  const contenedor = obtenerContenedorError(campo);

  campo.classList.remove("es-invalido", "es-valido");
  campo.removeAttribute("aria-invalid");

  if (contenedor) {
    contenedor.textContent = "";
  }
}

/**
 * Muestra el mensaje global (éxito o error) debajo de los botones.
 * @param {string} texto
 * @param {"exito"|"error"} tipo
 */
function mostrarMensajeGlobal(texto, tipo) {
  mensajeGlobal.textContent = texto;
  mensajeGlobal.classList.remove("mensaje--exito", "mensaje--error");
  mensajeGlobal.classList.add(tipo === "exito" ? "mensaje--exito" : "mensaje--error");
}

/** Oculta el mensaje global. */
function ocultarMensajeGlobal() {
  mensajeGlobal.textContent = "";
  mensajeGlobal.classList.remove("mensaje--exito", "mensaje--error");
}

/**
 * Actualiza el indicador visual de requisitos de la contraseña.
 * @param {string} valor contraseña actual
 */
function actualizarRequisitosContrasena(valor) {
  const cumple = {
    longitud: valor.length >= LIMITES.contrasenaMin,
    mayuscula: REGEX.mayuscula.test(valor),
    numero: REGEX.numero.test(valor)
  };

  itemsRequisitos.forEach(function (item) {
    const clave = item.dataset.requisito;
    item.classList.toggle("cumplido", Boolean(cumple[clave]));
  });
}

/**
 * Actualiza el contador de caracteres del textarea de comentarios.
 */
function actualizarContadorComentarios() {
  const longitud = campos.comentarios.value.length;
  contadorComentarios.textContent = longitud + " / " + LIMITES.comentariosMax;
}


/* ----------------------------------------------------------------------------
   4. VALIDACIONES POR CAMPO
   Cada función devuelve true si el campo es válido y false si no lo es,
   y se encarga de pintar el estado correspondiente.
   ---------------------------------------------------------------------------- */

/** Nombre: obligatorio, mínimo 3 caracteres, solo letras y espacios. */
function validarNombre() {
  const campo = campos.nombre;
  const valor = campo.value.trim();

  if (valor === "") {
    return mostrarError(campo, "El nombre es obligatorio.");
  }
  if (valor.length < LIMITES.nombreMin) {
    return mostrarError(campo, "El nombre debe tener al menos " + LIMITES.nombreMin + " caracteres.");
  }
  if (!REGEX.soloLetras.test(valor)) {
    return mostrarError(campo, "El nombre solo puede contener letras y espacios.");
  }
  return marcarValido(campo);
}

/** Correo: obligatorio y con formato válido (expresión regular). */
function validarCorreo() {
  const campo = campos.correo;
  const valor = campo.value.trim();

  if (valor === "") {
    return mostrarError(campo, "El correo electrónico es obligatorio.");
  }
  if (!REGEX.correo.test(valor)) {
    return mostrarError(campo, "Escribe un correo válido, por ejemplo nombre@empresa.com.");
  }
  return marcarValido(campo);
}

/** Contraseña: obligatoria, mínimo 8 caracteres, una mayúscula y un número. */
function validarContrasena() {
  const campo = campos.contrasena;
  const valor = campo.value;

  // El indicador se actualiza siempre, incluso cuando el campo está vacío
  actualizarRequisitosContrasena(valor);

  if (valor === "") {
    return mostrarError(campo, "La contraseña es obligatoria.");
  }
  if (valor.length < LIMITES.contrasenaMin) {
    return mostrarError(campo, "La contraseña debe tener al menos " + LIMITES.contrasenaMin + " caracteres.");
  }
  if (!REGEX.mayuscula.test(valor)) {
    return mostrarError(campo, "La contraseña debe incluir al menos una letra mayúscula.");
  }
  if (!REGEX.numero.test(valor)) {
    return mostrarError(campo, "La contraseña debe incluir al menos un número.");
  }
  return marcarValido(campo);
}

/** Confirmación: obligatoria y debe coincidir con la contraseña. */
function validarConfirmacion() {
  const campo = campos.confirmar;
  const valor = campo.value;

  if (valor === "") {
    return mostrarError(campo, "Confirma tu contraseña.");
  }
  if (valor !== campos.contrasena.value) {
    return mostrarError(campo, "Las contraseñas no coinciden.");
  }
  return marcarValido(campo);
}

/** Teléfono: obligatorio, solo dígitos, entre 7 y 15 caracteres. */
function validarTelefono() {
  const campo = campos.telefono;
  const valor = campo.value.trim();

  if (valor === "") {
    return mostrarError(campo, "El teléfono es obligatorio.");
  }
  if (!/^[0-9]+$/.test(valor)) {
    return mostrarError(campo, "El teléfono solo puede contener dígitos, sin espacios ni símbolos.");
  }
  if (!REGEX.telefono.test(valor)) {
    return mostrarError(
      campo,
      "El teléfono debe tener entre " + LIMITES.telefonoMin + " y " + LIMITES.telefonoMax + " dígitos."
    );
  }
  return marcarValido(campo);
}

/** Edad: obligatoria, número entero entre 18 y 100. */
function validarEdad() {
  const campo = campos.edad;
  const valor = campo.value.trim();

  if (valor === "") {
    return mostrarError(campo, "La edad es obligatoria.");
  }

  const edad = Number(valor);

  if (!Number.isInteger(edad)) {
    return mostrarError(campo, "La edad debe ser un número entero.");
  }
  if (edad < LIMITES.edadMin) {
    return mostrarError(campo, "Debes tener al menos " + LIMITES.edadMin + " años para registrarte.");
  }
  if (edad > LIMITES.edadMax) {
    return mostrarError(campo, "La edad máxima permitida es " + LIMITES.edadMax + " años.");
  }
  return marcarValido(campo);
}

/** Tipo de servicio: se debe elegir una opción distinta de la vacía. */
function validarServicio() {
  const campo = campos.servicio;

  if (campo.value === "") {
    return mostrarError(campo, "Selecciona el tipo de servicio que te interesa.");
  }
  return marcarValido(campo);
}

/** Comentarios: opcional; solo se comprueba la longitud máxima. */
function validarComentarios() {
  const campo = campos.comentarios;
  const valor = campo.value;

  if (valor.length > LIMITES.comentariosMax) {
    return mostrarError(campo, "Los comentarios no pueden superar " + LIMITES.comentariosMax + " caracteres.");
  }

  // Al ser opcional, si está vacío no se pinta ni verde ni rojo
  if (valor.trim() === "") {
    limpiarEstado(campo);
    return true;
  }
  return marcarValido(campo);
}

/** Términos y condiciones: la casilla debe estar marcada. */
function validarTerminos() {
  const campo = campos.terminos;

  if (!campo.checked) {
    return mostrarError(campo, "Debes aceptar los términos y condiciones para continuar.");
  }
  return marcarValido(campo);
}

/* Mapa nombre-de-campo → función de validación. Permite recorrer todas las
   validaciones de forma genérica y asociar los eventos sin repetir código. */
const validadores = {
  nombre: validarNombre,
  correo: validarCorreo,
  telefono: validarTelefono,
  edad: validarEdad,
  contrasena: validarContrasena,
  confirmar: validarConfirmacion,
  servicio: validarServicio,
  comentarios: validarComentarios,
  terminos: validarTerminos
};


/* ----------------------------------------------------------------------------
   5. VALIDACIÓN COMPLETA DEL FORMULARIO
   ---------------------------------------------------------------------------- */

/**
 * Ejecuta todas las validaciones y devuelve true solo si TODAS pasan.
 * Se recorren todas (sin cortocircuito) para que cada campo muestre su error.
 * @returns {boolean}
 */
function validarFormulario() {
  let todoValido = true;

  Object.keys(validadores).forEach(function (nombreCampo) {
    const esValido = validadores[nombreCampo]();
    if (!esValido) {
      todoValido = false;
    }
  });

  return todoValido;
}

/**
 * Recopila los valores del formulario en un objeto plano.
 * @returns {Object}
 */
function obtenerDatos() {
  return {
    nombre: campos.nombre.value.trim(),
    correo: campos.correo.value.trim(),
    telefono: campos.telefono.value.trim(),
    edad: Number(campos.edad.value),
    servicio: campos.servicio.options[campos.servicio.selectedIndex].text,
    comentarios: campos.comentarios.value.trim(),
    aceptaTerminos: campos.terminos.checked
    // La contraseña NO se imprime en consola por buenas prácticas de seguridad.
  };
}

/**
 * Restablece todos los estados visuales del formulario (tras limpiar o enviar).
 */
function reiniciarEstados() {
  Object.keys(campos).forEach(function (nombreCampo) {
    limpiarEstado(campos[nombreCampo]);
  });
  camposTocados.clear();
  actualizarRequisitosContrasena("");
  actualizarContadorComentarios();
}


/* ----------------------------------------------------------------------------
   6. MANEJADORES DE EVENTOS
   ---------------------------------------------------------------------------- */

/**
 * Evento INPUT: validación en tiempo real.
 * Si el campo tiene contenido se valida de inmediato. Si está vacío y el
 * usuario aún no lo había tocado, se limpia el estado para no mostrar
 * "obligatorio" antes de tiempo.
 * @param {string} nombreCampo
 */
function manejarInput(nombreCampo) {
  const campo = campos[nombreCampo];
  const tieneContenido = campo.type === "checkbox" ? campo.checked : campo.value !== "";

  ocultarMensajeGlobal();

  if (nombreCampo === "comentarios") {
    actualizarContadorComentarios();
  }

  if (tieneContenido || camposTocados.has(nombreCampo)) {
    validadores[nombreCampo]();
  } else {
    limpiarEstado(campo);
    if (nombreCampo === "contrasena") {
      actualizarRequisitosContrasena("");
    }
  }

  // Si cambia la contraseña y ya hay algo en la confirmación, se revalida
  if (nombreCampo === "contrasena" && campos.confirmar.value !== "") {
    validarConfirmacion();
  }
}

/**
 * Evento BLUR: el campo pierde el foco → se marca como tocado y se valida.
 * @param {string} nombreCampo
 */
function manejarBlur(nombreCampo) {
  camposTocados.add(nombreCampo);
  validadores[nombreCampo]();
}

/**
 * Evento SUBMIT: validación final. Se evita el envío nativo con
 * preventDefault() y solo se "procesa" si todo es válido.
 * @param {SubmitEvent} evento
 */
function manejarSubmit(evento) {
  evento.preventDefault();

  // Todos los campos cuentan como tocados a partir del intento de envío
  Object.keys(campos).forEach(function (nombreCampo) {
    camposTocados.add(nombreCampo);
  });

  const esValido = validarFormulario();

  if (!esValido) {
    mostrarMensajeGlobal("Revisa los campos marcados en rojo antes de crear la cuenta.", "error");

    // Lleva el foco al primer campo con error para facilitar la corrección
    const primerInvalido = formulario.querySelector(".es-invalido");
    if (primerInvalido) {
      primerInvalido.focus();
    }
    return; // Envío bloqueado
  }

  // --- Envío exitoso (simulado: no hay backend) ---
  const datos = obtenerDatos();
  console.log("Registro válido. Datos del cliente:", datos);

  botonEnviar.disabled = true;
  botonEnviar.textContent = "Creando cuenta...";

  // Pequeña espera para mostrar el estado "disabled" del botón y la animación
  setTimeout(function () {
    mostrarMensajeGlobal(
      "¡Cuenta creada con éxito! Bienvenido/a a Skytech-Geo, " + datos.nombre + ". Revisa la consola para ver los datos enviados.",
      "exito"
    );
    formulario.reset();
    reiniciarEstados();
    botonEnviar.disabled = false;
    botonEnviar.textContent = "Crear cuenta";
  }, 900);
}

/**
 * Botón "Limpiar": además del reset nativo del <button type="reset">,
 * se borran los estados visuales y el mensaje global.
 * Se escucha el clic del botón (y no el evento "reset" del formulario) para
 * que el reset programático tras un envío exitoso no oculte el mensaje de éxito.
 */
function manejarLimpiar() {
  // setTimeout(0) espera a que el reset nativo termine de vaciar los campos
  setTimeout(function () {
    reiniciarEstados();
    ocultarMensajeGlobal();
  }, 0);
}


/* ----------------------------------------------------------------------------
   7. INICIALIZACIÓN: registro de eventos
   ---------------------------------------------------------------------------- */
function inicializar() {
  Object.keys(campos).forEach(function (nombreCampo) {
    const campo = campos[nombreCampo];

    // input: tiempo real (para checkbox y select también dispara "change")
    campo.addEventListener("input", function () {
      manejarInput(nombreCampo);
    });

    // change: complementa a input en select y checkbox en navegadores antiguos
    if (campo.tagName === "SELECT" || campo.type === "checkbox") {
      campo.addEventListener("change", function () {
        manejarInput(nombreCampo);
      });
    }

    // blur: al perder el foco
    campo.addEventListener("blur", function () {
      manejarBlur(nombreCampo);
    });
  });

  // submit: validación final
  formulario.addEventListener("submit", manejarSubmit);

  // clic en "Limpiar": borrar estados visuales y mensaje global
  botonLimpiar.addEventListener("click", manejarLimpiar);

  // Estado inicial de los indicadores
  actualizarRequisitosContrasena("");
  actualizarContadorComentarios();
}

inicializar();
