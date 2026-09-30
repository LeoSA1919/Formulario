# Guion del video de demostración

**Duración máxima:** 3 minutos.
**Preparación:** abrir `index.html` en el navegador con la ventana maximizada, tener las herramientas de desarrollador (F12) listas en la pestaña **Consola** y grabar la pantalla con el audio del micrófono.

Cada bloque indica qué mostrar, qué decir y qué punto de la rúbrica evidencia.

---

## 1. Presentación y diseño del formulario (0:00 – 0:30)

**Evidencia:** requerimientos técnicos (HTML5 semántico y CSS3).

- Mostrar la página completa: encabezado con el emblema, título, texto de introducción y la hoja del formulario.
- Recorrer con el cursor las tres secciones: **Datos personales**, **Cuenta de acceso** y **Programa de interés**.
- Señalar los asteriscos de campos obligatorios, el campo opcional de comentarios con su contador y el desplegable **Ver términos**.
- Decir: "El formulario está construido con HTML5 semántico: `form`, `fieldset`, `legend`, `label` con atributo `for`, `input`, `select` y `button`. Los estilos están en un archivo CSS separado con variables, Flexbox, Grid y transiciones. No usamos frameworks ni librerías."
- Opcional (5 segundos): mostrar en el editor el árbol de archivos `index.html`, `css/style.css` y `js/script.js`.

## 2. Validación en tiempo real al escribir (0:30 – 1:05)

**Evidencia:** evento `input` y manipulación del DOM.

- Hacer clic en **Nombre completo** y escribir `Lu`: aparece el mensaje "Usa solo letras y espacios (mínimo 3)". Completar `Luis Pérez`: el mensaje desaparece y el borde se pone verde.
- En **Correo electrónico**, escribir `luis@correo` y mostrar el error de formato; agregar `.com` y ver que se corrige.
- En **Contraseña**, escribir letra por letra `abc`, luego `Abc`, luego `Abc12345`, y mostrar cómo los tres requisitos (8 caracteres, una mayúscula, un número) se van marcando en verde.
- Decir: "Cada campo se valida con el evento `input` mientras se escribe, y el mensaje de error se actualiza en el DOM sin recargar la página."

## 3. Mensajes de error por campo con el evento `blur` (1:05 – 1:30)

**Evidencia:** evento `blur` y mensajes específicos por campo.

- Hacer clic en **Teléfono** y salir del campo sin escribir (tabulador): aparece "Escribe tu número de teléfono".
- Escribir `12ab` en teléfono y salir: aparece "El teléfono debe tener entre 7 y 15 dígitos".
- En **Edad**, escribir `15` y salir: aparece "La edad debe estar entre 18 y 100".
- En **Confirmar contraseña**, escribir algo distinto a la contraseña: aparece "Las contraseñas no coinciden".
- Decir: "Al perder el foco, el evento `blur` valida el campo y muestra un mensaje distinto para cada tipo de error."

## 4. Bloqueo del envío con datos inválidos (1:30 – 2:00)

**Evidencia:** evento `submit` con `preventDefault()` y bloqueo del envío.

- Pulsar **Limpiar** para empezar desde cero.
- Sin llenar nada, pulsar **Enviar solicitud**.
- Mostrar que: aparece el aviso rojo "Revisa los campos marcados antes de enviar la solicitud", todos los campos obligatorios se marcan en rojo con su mensaje, el foco salta al primer campo con error y la página no se recarga.
- Llenar algunos campos dejando la casilla de términos sin marcar y volver a pulsar **Enviar solicitud**: sigue bloqueado y aparece "Debes aceptar los términos para continuar".
- Decir: "El evento `submit` usa `preventDefault()` para impedir el envío mientras exista al menos un error."

## 5. Envío exitoso con confirmación (2:00 – 2:30)

**Evidencia:** mensaje de éxito y registro en consola.

- Completar todos los campos con datos válidos, por ejemplo:
  - Nombre: `Laura Martínez Ruiz`
  - Correo: `laura@correo.com`
  - Teléfono: `0991234567`
  - Edad: `29`
  - Contraseña y confirmación: `Meridiano2026`
  - Programa: `Analítica de Datos`
  - Comentarios: cualquier texto breve (mostrar que el contador avanza)
  - Marcar la casilla de términos.
- Pulsar **Enviar solicitud**.
- Mostrar el aviso verde "Solicitud enviada" y cómo el formulario queda limpio.
- Señalar en la **Consola** el objeto registrado con el mensaje "Solicitud válida:" y los datos enviados.
- Decir: "Como no hay servidor, el envío válido muestra la confirmación y registra los datos en la consola."

## 6. Diseño responsivo (2:30 – 2:55)

**Evidencia:** media queries y adaptación a distintos anchos.

- Reducir el ancho de la ventana del navegador arrastrando el borde (o usar el modo de dispositivo móvil de las herramientas de desarrollador).
- Mostrar que por debajo de 480 px los campos **Teléfono** y **Edad** pasan de dos columnas a una, los márgenes se reducen y el encabezado se reorganiza sin que nada se desborde.
- Volver a ampliar la ventana y mostrar cómo recupera la disposición de escritorio.
- Decir: "El diseño es responsivo gracias a media queries en 480 y 720 píxeles, y a Flexbox y Grid."

## 7. Cierre (2:55 – 3:00)

- Mostrar brevemente el repositorio en GitHub con los archivos y el historial de commits.
- Decir: "El código completo está en el repositorio con su README y control de versiones. Gracias."

---

## Lista de comprobación antes de grabar

- [ ] La consola del navegador está abierta y visible en la parte inferior.
- [ ] La ventana empieza maximizada.
- [ ] Se probó el flujo completo una vez antes de grabar.
- [ ] El micrófono funciona y no hay ruido de fondo.
- [ ] El video final dura 3 minutos o menos.
