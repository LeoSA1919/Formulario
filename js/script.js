/* ==========================================================================
   Sociedad Astronómica Vega Austral — Validaciones del formulario de socios
   JavaScript puro, sin librerías. Manipula el formulario mediante el DOM.

   Eventos implementados (exigidos por la práctica):
     - input : validación en tiempo real mientras el usuario escribe.
     - blur  : validación del campo al perder el foco.
     - submit: validación final; si hay errores se BLOQUEA el envío.
   ========================================================================== */

"use strict";

/* --------------------------------------------------------------------------
   1. Referencias a los elementos del DOM
   -------------------------------------------------------------------------- */
const formulario = document.getElementById("formulario-registro");
const panelBitacora = document.querySelector(".bitacora");
const avisoExito = document.getElementById("aviso-exito");
const avisoError = document.getElementById("aviso-error");

// Campos del formulario, accesibles por su id
const campos = {
  nombre: document.getElementById("nombre"),
  correo: document.getElementById("correo"),
  telefono: document.getElementById("telefono"),
  edad: document.getElementById("edad"),
  contrasena: document.getElementById("contrasena"),
  confirmacion: document.getElementById("confirmacion"),
  interes: document.getElementById("interes"),
  comentarios: document.getElementById("comentarios"),
  terminos: document.getElementById("terminos"),
};

// Chips de requisitos de la contraseña y contador de comentarios
const chipsRequisitos = document.querySelectorAll("#requisitos-contrasena .requisito");
const contadorComentarios = document.getElementById("contador-comentarios");
const LIMITE_COMENTARIOS = 500;

/* --------------------------------------------------------------------------
   2. Expresiones regulares reutilizables
   -------------------------------------------------------------------------- */
// Letras (incluidas tildes, diéresis y ñ) y espacios
const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/;
// Formato de correo: texto@dominio.extensión (sin espacios)
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Solo dígitos, entre 7 y 15
const REGEX_TELEFONO = /^\d{7,15}$/;
const REGEX_MAYUSCULA = /[A-ZÁÉÍÓÚÑ]/;
const REGEX_NUMERO = /\d/;

/* --------------------------------------------------------------------------
   3. Funciones de apoyo para pintar estados en el DOM
   -------------------------------------------------------------------------- */

/** Devuelve el contenedor .campo del control indicado. */
function obtenerContenedor(control) {
  return control.closest(".campo");
}

/** Devuelve el <span> donde se escribe el error del control (aria-describedby). */
function obtenerElementoError(control) {
  return document.getElementById("error-" + control.id);
}

/** Marca el campo como inválido y muestra su mensaje específico. */
function mostrarError(control, mensaje) {
  const contenedor = obtenerContenedor(control);
  contenedor.classList.add("campo--error");
  contenedor.classList.remove("campo--valido");
  control.setAttribute("aria-invalid", "true");
  obtenerElementoError(control).textContent = mensaje;
}

/** Marca el campo como válido (borde aurora) y limpia el mensaje. */
function marcarValido(control) {
  const contenedor = obtenerContenedor(control);
  contenedor.classList.remove("campo--error");
  contenedor.classList.add("campo--valido");
  control.removeAttribute("aria-invalid");
  obtenerElementoError(control).textContent = "";
}

/** Quita cualquier estado visual del campo (ni válido ni inválido). */
function limpiarEstado(control) {
  const contenedor = obtenerContenedor(control);
  contenedor.classList.remove("campo--error", "campo--valido");
  control.removeAttribute("aria-invalid");
  obtenerElementoError(control).textContent = "";
}

/**
 * Aplica el resultado de una validación al campo.
 * @param {HTMLElement} control  Campo validado.
 * @param {string} mensajeError  Cadena vacía si es válido; mensaje si no.
 * @returns {boolean} true si el campo es válido.
 */
function aplicarResultado(control, mensajeError) {
  if (mensajeError) {
    mostrarError(control, mensajeError);
    return false;
  }
  marcarValido(control);
  return true;
}

/** Oculta ambos avisos globales. */
function ocultarAvisos() {
  avisoExito.hidden = true;
  avisoError.hidden = true;
  avisoExito.replaceChildren();
  avisoError.replaceChildren();
}

/**
 * Muestra un aviso global con título y detalle.
 * Se construye con createElement (DOM) en lugar de innerHTML.
 */
function mostrarAviso(elemento, titulo, detalle) {
  elemento.replaceChildren();

  const parrafoTitulo = document.createElement("p");
  const negrita = document.createElement("strong");
  negrita.textContent = titulo;
  parrafoTitulo.appendChild(negrita);
  elemento.appendChild(parrafoTitulo);

  if (detalle) {
    const parrafoDetalle = document.createElement("p");
    parrafoDetalle.textContent = detalle;
    elemento.appendChild(parrafoDetalle);
  }

  elemento.hidden = false;
}

/* --------------------------------------------------------------------------
   4. Una función de validación por campo
   Cada función devuelve "" si el valor es válido o un mensaje específico si no.
   -------------------------------------------------------------------------- */

function validarNombre() {
  const valor = campos.nombre.value.trim();
  if (valor === "") return "Escribe tu nombre completo.";
  if (valor.length < 3) return "El nombre debe tener al menos 3 caracteres.";
  if (!REGEX_NOMBRE.test(valor)) return "Usa solo letras y espacios (se admiten tildes y ñ).";
  return "";
}

function validarCorreo() {
  const valor = campos.correo.value.trim();
  if (valor === "") return "Escribe tu correo electrónico.";
  if (!REGEX_CORREO.test(valor)) return "El formato no es válido. Ejemplo: nombre@dominio.com";
  return "";
}

function validarTelefono() {
  const valor = campos.telefono.value.trim();
  if (valor === "") return "Escribe un teléfono de contacto.";
  if (!/^\d+$/.test(valor)) return "El teléfono solo puede contener dígitos, sin espacios ni guiones.";
  if (!REGEX_TELEFONO.test(valor)) return "El teléfono debe tener entre 7 y 15 dígitos.";
  return "";
}

function validarEdad() {
  const valor = campos.edad.value.trim();
  if (valor === "") return "Indica tu edad.";
  const edad = Number(valor);
  if (!Number.isInteger(edad)) return "La edad debe ser un número entero.";
  if (edad < 18) return "Debes tener al menos 18 años para asociarte.";
  if (edad > 100) return "La edad máxima admitida es 100.";
  return "";
}

/**
 * Comprueba cada requisito de la contraseña y devuelve un objeto con el
 * resultado de cada uno. Se reutiliza para encender los chips.
 */
function evaluarRequisitosContrasena(valor) {
  return {
    longitud: valor.length >= 8,
    mayuscula: REGEX_MAYUSCULA.test(valor),
    numero: REGEX_NUMERO.test(valor),
  };
}

function validarContrasena() {
  const valor = campos.contrasena.value;
  if (valor === "") return "Crea una contraseña.";
  const requisitos = evaluarRequisitosContrasena(valor);
  if (!requisitos.longitud) return "La contraseña debe tener al menos 8 caracteres.";
  if (!requisitos.mayuscula) return "Añade al menos una letra mayúscula.";
  if (!requisitos.numero) return "Añade al menos un número.";
  return "";
}

function validarConfirmacion() {
  const valor = campos.confirmacion.value;
  if (valor === "") return "Repite la contraseña para confirmarla.";
  if (valor !== campos.contrasena.value) return "Las contraseñas no coinciden.";
  return "";
}

function validarInteres() {
  if (campos.interes.value === "") return "Elige el área que más te interesa.";
  return "";
}

function validarComentarios() {
  // Campo opcional: solo se controla el límite de caracteres
  if (campos.comentarios.value.length > LIMITE_COMENTARIOS) {
    return "Los comentarios no pueden superar los 500 caracteres.";
  }
  return "";
}

function validarTerminos() {
  if (!campos.terminos.checked) return "Debes aceptar los términos y condiciones.";
  return "";
}

// Tabla campo → validador, para poder recorrerla en la validación completa
const validadores = {
  nombre: validarNombre,
  correo: validarCorreo,
  telefono: validarTelefono,
  edad: validarEdad,
  contrasena: validarContrasena,
  confirmacion: validarConfirmacion,
  interes: validarInteres,
  comentarios: validarComentarios,
  terminos: validarTerminos,
};

/**
 * Valida un campo por su nombre y pinta el resultado en el DOM.
 * @returns {boolean} true si es válido.
 */
function validarCampo(nombreCampo) {
  const mensaje = validadores[nombreCampo]();
  return aplicarResultado(campos[nombreCampo], mensaje);
}

/**
 * Valida TODOS los campos. Devuelve la lista de nombres de campos inválidos
 * (vacía si el formulario entero es válido).
 */
function validarFormulario() {
  const invalidos = [];
  Object.keys(validadores).forEach(function (nombreCampo) {
    if (!validarCampo(nombreCampo)) invalidos.push(nombreCampo);
  });
  return invalidos;
}

/* --------------------------------------------------------------------------
   5. Indicadores en tiempo real: chips de contraseña y contador
   -------------------------------------------------------------------------- */

/** Enciende (aurora) o apaga cada chip según los requisitos cumplidos. */
function actualizarChipsContrasena() {
  const requisitos = evaluarRequisitosContrasena(campos.contrasena.value);
  chipsRequisitos.forEach(function (chip) {
    const clave = chip.dataset.requisito;
    chip.classList.toggle("requisito--cumplido", requisitos[clave]);
  });
}

/** Actualiza el texto "n / 500" del área de comentarios. */
function actualizarContadorComentarios() {
  const longitud = campos.comentarios.value.length;
  contadorComentarios.textContent = longitud + " / " + LIMITE_COMENTARIOS;
  contadorComentarios.classList.toggle("contador--limite", longitud >= LIMITE_COMENTARIOS);
}

/* --------------------------------------------------------------------------
   6. Registro de eventos: input, blur, change
   -------------------------------------------------------------------------- */

Object.keys(campos).forEach(function (nombreCampo) {
  const control = campos[nombreCampo];

  // EVENTO input: se dispara con cada tecla. Valida en tiempo real y actualiza
  // los indicadores. En el campo de comentarios, que es opcional, solo se
  // muestra estado cuando hay texto escrito.
  control.addEventListener("input", function () {
    ocultarAvisos();

    if (nombreCampo === "contrasena") {
      actualizarChipsContrasena();
      // Si ya se había escrito la confirmación, revalidarla al cambiar la contraseña
      if (campos.confirmacion.value !== "") validarCampo("confirmacion");
    }

    if (nombreCampo === "comentarios") {
      actualizarContadorComentarios();
      if (control.value === "") {
        limpiarEstado(control);
        return;
      }
    }

    validarCampo(nombreCampo);
  });

  // EVENTO blur: se dispara al perder el foco. Valida el campo aunque el
  // usuario no haya escrito nada (así aparecen los errores de "obligatorio").
  control.addEventListener("blur", function () {
    if (nombreCampo === "comentarios" && control.value === "") {
      limpiarEstado(control);
      return;
    }
    validarCampo(nombreCampo);
  });
});

// EVENTO change: para la casilla y el desplegable el cambio de valor no
// siempre dispara "input" en todos los navegadores, así que se cubre aparte.
campos.terminos.addEventListener("change", function () {
  ocultarAvisos();
  validarCampo("terminos");
});
campos.interes.addEventListener("change", function () {
  ocultarAvisos();
  validarCampo("interes");
});

/* --------------------------------------------------------------------------
   7. EVENTO submit: validación final y bloqueo del envío inválido
   -------------------------------------------------------------------------- */

formulario.addEventListener("submit", function (evento) {
  // Siempre se cancela el envío nativo: no hay backend y queremos controlarlo
  evento.preventDefault();
  ocultarAvisos();

  const invalidos = validarFormulario();

  if (invalidos.length > 0) {
    // ENVÍO BLOQUEADO: resumen de error y foco en el primer campo inválido
    const cantidad = invalidos.length;
    const titulo =
      cantidad === 1
        ? "No se pudo enviar la ficha: hay 1 campo por corregir."
        : "No se pudo enviar la ficha: hay " + cantidad + " campos por corregir.";
    mostrarAviso(avisoError, titulo, "Revisa los mensajes bajo cada campo marcado.");

    // Sacudida breve del panel como refuerzo visual (respeta reduced-motion vía CSS)
    panelBitacora.classList.remove("bitacora--sacudida");
    void panelBitacora.offsetWidth; // reinicia la animación
    panelBitacora.classList.add("bitacora--sacudida");

    campos[invalidos[0]].focus();
    avisoError.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }

  // ENVÍO VÁLIDO: se recogen los datos, se muestran en consola y se confirma
  const datos = {
    nombre: campos.nombre.value.trim(),
    correo: campos.correo.value.trim(),
    telefono: campos.telefono.value.trim(),
    edad: Number(campos.edad.value),
    // Por seguridad la contraseña no se imprime en claro: solo su longitud
    contrasena: "•".repeat(campos.contrasena.value.length),
    interes: campos.interes.options[campos.interes.selectedIndex].text,
    comentarios: campos.comentarios.value.trim(),
    aceptaTerminos: campos.terminos.checked,
    fechaRegistro: new Date().toISOString(),
  };

  console.log("Nueva solicitud de socio registrada:");
  console.table(datos);
  console.log(datos);

  mostrarAviso(
    avisoExito,
    "Solicitud registrada. Bienvenido/a a la Sociedad Astronómica Vega Austral, " + datos.nombre + ".",
    "Te escribiremos a " + datos.correo + " con la fecha de la próxima salida de observación."
  );

  reiniciarFormulario();
  avisoExito.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

/* --------------------------------------------------------------------------
   8. Limpieza del formulario (tras el envío y con el botón "Limpiar ficha")
   -------------------------------------------------------------------------- */

/** Quita los estados visuales de todos los campos y pone a cero los indicadores. */
function limpiarEstadosFormulario() {
  Object.keys(campos).forEach(function (nombreCampo) {
    limpiarEstado(campos[nombreCampo]);
  });
  actualizarChipsContrasena();
  actualizarContadorComentarios();
}

/** Vacía los valores (reset nativo) y, a continuación, los estados visuales. */
function reiniciarFormulario() {
  formulario.reset(); // dispara el evento "reset" de abajo
}

// EVENTO reset: lo lanza tanto el botón "Limpiar ficha" como formulario.reset().
// Se dispara ANTES de que el navegador vacíe los valores, por eso la limpieza
// de estados e indicadores se pospone al siguiente ciclo con setTimeout.
formulario.addEventListener("reset", function () {
  setTimeout(limpiarEstadosFormulario, 0);
});

// El botón "Limpiar ficha" además oculta los avisos y devuelve el foco al inicio
const botonLimpiar = formulario.querySelector('button[type="reset"]');
botonLimpiar.addEventListener("click", function () {
  ocultarAvisos();
  campos.nombre.focus();
});

/* --------------------------------------------------------------------------
   9. Estado inicial
   -------------------------------------------------------------------------- */
actualizarChipsContrasena();
actualizarContadorComentarios();
