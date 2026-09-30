(function () {
  "use strict";

  var form = document.getElementById("form");
  var okBanner = document.getElementById("okBanner");
  var errBanner = document.getElementById("errBanner");

  var el = {
    nombre: document.getElementById("nombre"),
    correo: document.getElementById("correo"),
    telefono: document.getElementById("telefono"),
    edad: document.getElementById("edad"),
    password: document.getElementById("password"),
    password2: document.getElementById("password2"),
    programa: document.getElementById("programa"),
    comentarios: document.getElementById("comentarios"),
    acepto: document.getElementById("acepto")
  };

  // Expresiones para validar nombre, correo y teléfono.
  var reNombre = /^[\p{L} '\-]+$/u;
  var reCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var reTelefono = /^\+?\d{7,15}$/;

  // ---- Una función de validación por campo ----
  function vNombre() {
    var v = el.nombre.value.trim();
    if (!v) return "Escribe tu nombre completo.";
    if (v.length < 3 || !reNombre.test(v)) return "Usa solo letras y espacios (mínimo 3).";
    return "";
  }
  function vCorreo() {
    var v = el.correo.value.trim();
    if (!v) return "Escribe tu correo electrónico.";
    if (!reCorreo.test(v)) return "El correo no tiene un formato válido.";
    return "";
  }
  function vTelefono() {
    var v = el.telefono.value.replace(/\s+/g, "");
    if (!v) return "Escribe tu número de teléfono.";
    if (!reTelefono.test(v)) return "El teléfono debe tener entre 7 y 15 dígitos.";
    return "";
  }
  function vEdad() {
    var v = el.edad.value;
    if (v === "") return "Indica tu edad.";
    var n = Number(v);
    if (!Number.isInteger(n) || n < 18 || n > 100) return "La edad debe estar entre 18 y 100.";
    return "";
  }
  function vPassword() {
    var v = el.password.value;
    if (!v) return "Crea una contraseña.";
    if (v.length < 8 || !/[A-Z]/.test(v) || !/\d/.test(v)) return "Debe tener 8 caracteres, una mayúscula y un número.";
    return "";
  }
  function vPassword2() {
    var v = el.password2.value;
    if (!v) return "Repite la contraseña.";
    if (v !== el.password.value) return "Las contraseñas no coinciden.";
    return "";
  }
  function vPrograma() {
    if (!el.programa.value) return "Selecciona un programa.";
    return "";
  }
  function vAcepto() {
    if (!el.acepto.checked) return "Debes aceptar los términos para continuar.";
    return "";
  }

  // Mapa de cada campo con su contenedor y su validador.
  var campos = [
    { input: el.nombre, wrap: "f-nombre", msg: "e-nombre", fn: vNombre },
    { input: el.correo, wrap: "f-correo", msg: "e-correo", fn: vCorreo },
    { input: el.telefono, wrap: "f-tel", msg: "e-tel", fn: vTelefono },
    { input: el.edad, wrap: "f-edad", msg: "e-edad", fn: vEdad },
    { input: el.password, wrap: "f-pass", msg: "e-pass", fn: vPassword },
    { input: el.password2, wrap: "f-pass2", msg: "e-pass2", fn: vPassword2 },
    { input: el.programa, wrap: "f-programa", msg: "e-programa", fn: vPrograma },
    { input: el.acepto, wrap: "f-acepto", msg: "e-acepto", fn: vAcepto }
  ];

  function pintar(campo) {
    var wrap = document.getElementById(campo.wrap);
    var msg = document.getElementById(campo.msg);
    var error = campo.fn();
    msg.textContent = error;
    if (error) {
      wrap.classList.add("is-error");
      wrap.classList.remove("is-valid");
      if (campo.input) campo.input.setAttribute("aria-invalid", "true");
    } else {
      wrap.classList.remove("is-error");
      if (campo.input && campo.input.type !== "checkbox") wrap.classList.add("is-valid");
      if (campo.input) campo.input.removeAttribute("aria-invalid");
    }
    return !error;
  }

  // Requisitos de la contraseña que se encienden al cumplirse.
  function actualizarRequisitos() {
    var v = el.password.value;
    var reqs = { len: v.length >= 8, upper: /[A-Z]/.test(v), num: /\d/.test(v) };
    var items = document.querySelectorAll("#pw-reqs li");
    items.forEach(function (li) {
      li.classList.toggle("ok", !!reqs[li.getAttribute("data-req")]);
    });
  }

  // Contador de caracteres del área de comentarios.
  var countNum = document.getElementById("count-num");
  el.comentarios.addEventListener("input", function () {
    countNum.textContent = el.comentarios.value.length;
  });

  // ---- Los tres eventos exigidos: input, blur y submit ----

  // input y blur en cada campo.
  campos.forEach(function (campo) {
    if (!campo.input) return;
    var ev = campo.input.type === "checkbox" ? "change" : "input";
    campo.input.addEventListener(ev, function () {
      pintar(campo);
      if (campo.input === el.password) {
        actualizarRequisitos();
        if (el.password2.value) pintar(campos[5]); // revalidar la confirmación
      }
    });
    campo.input.addEventListener("blur", function () { pintar(campo); });
  });

  // submit: validar todo y bloquear si hay errores.
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    var primerError = null;
    campos.forEach(function (campo) {
      var valido = pintar(campo);
      if (!valido && !primerError) primerError = campo.input;
      if (!valido) ok = false;
    });

    if (!ok) {
      okBanner.hidden = true;
      errBanner.hidden = false;
      if (primerError) {
        primerError.focus();
        primerError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Todo válido: sin servidor, se muestra confirmación y se registra en consola.
    errBanner.hidden = true;
    var datos = {
      nombre: el.nombre.value.trim(),
      correo: el.correo.value.trim(),
      telefono: el.telefono.value.trim(),
      edad: Number(el.edad.value),
      programa: el.programa.value,
      comentarios: el.comentarios.value.trim()
    };
    console.log("Solicitud válida:", datos);

    form.reset();
    actualizarRequisitos();
    countNum.textContent = "0";
    campos.forEach(function (campo) {
      var wrap = document.getElementById(campo.wrap);
      wrap.classList.remove("is-error", "is-valid");
      document.getElementById(campo.msg).textContent = "";
    });
    okBanner.hidden = false;
    okBanner.focus();
    okBanner.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // Limpiar: reinicia el formulario y sus estados.
  document.getElementById("limpiar").addEventListener("click", function () {
    form.reset();
    actualizarRequisitos();
    countNum.textContent = "0";
    okBanner.hidden = true;
    errBanner.hidden = true;
    campos.forEach(function (campo) {
      var wrap = document.getElementById(campo.wrap);
      wrap.classList.remove("is-error", "is-valid");
      document.getElementById(campo.msg).textContent = "";
    });
    el.nombre.focus();
  });
})();
