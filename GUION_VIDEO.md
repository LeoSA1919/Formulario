# Guion del video de evidencia (máximo 3 minutos)

Antes de grabar: abre `index.html` en el navegador, abre las herramientas de desarrollador (F12) con la pestaña **Console** visible, y ten Visual Studio Code abierto con los tres archivos del proyecto.

| Tiempo | Qué mostrar | Requisito de la rúbrica que evidencia |
|--------|-------------|----------------------------------------|
| 0:00 – 0:15 | Presentación del grupo y del proyecto: "Formulario de registro de clientes para Skytech-Geo, hecho con HTML5, CSS3 y JavaScript puro". Mostrar la página completa en escritorio. | Contexto general |
| 0:15 – 0:40 | En VS Code, recorrer rápidamente `index.html`: `<form>`, los tres `<fieldset>` con `<legend>`, un `<label for>` asociado a su `input`, los tipos (`text`, `email`, `password`, `tel`, `number`, `select`, `checkbox`, `textarea`) y el `<span aria-live="polite">` de error. Señalar `<!DOCTYPE html>`, `lang="es"` y el meta *viewport*. | HTML5 semántico y campos (mínimo 5, aquí 9) |
| 0:40 – 1:00 | En `css/style.css`, mostrar las variables en `:root`, el `display: grid` de `.principal`, y las dos *media queries* (`480px` y `768px`). Mostrar las `@keyframes`. | CSS: variables, Grid/Flexbox, responsivo, animaciones |
| 1:00 – 1:35 | **Validación en tiempo real (evento input):** escribir "Ab" en Nombre y ver el error de mínimo 3 caracteres; completar "Ana López" y ver el borde verde. Escribir un correo sin "@" y ver el error; corregirlo. En Contraseña, escribir letra a letra y mostrar cómo se encienden los requisitos (8 caracteres, mayúscula, número). Escribir una confirmación distinta y ver "Las contraseñas no coinciden". | JavaScript: evento `input`, mensajes de error específicos, estados error/válido |
| 1:35 – 1:50 | **Evento blur:** hacer clic en Teléfono, salir sin escribir y ver "El teléfono es obligatorio". Escribir "12ab" y salir: error de solo dígitos. Escribir la edad "15" y salir: error de mínimo 18. | JavaScript: evento `blur`, validación de teléfono y rango de edad |
| 1:50 – 2:10 | **Bloqueo del envío inválido (evento submit):** dejar el select sin elegir y la casilla sin marcar, pulsar "Crear cuenta". Mostrar que no se envía, aparece el mensaje global rojo, se marcan todos los campos con error y el foco salta al primero. Mostrar en `js/script.js` la línea `evento.preventDefault()`. | JavaScript: evento `submit`, bloqueo de envío inválido |
| 2:10 – 2:35 | **Envío exitoso:** completar todos los campos correctamente, marcar la casilla y pulsar "Crear cuenta". Mostrar el botón deshabilitado ("Creando cuenta..."), el mensaje verde con animación, el formulario limpio y el objeto con los datos en la consola. | Funcionalidad completa y mensaje de éxito global |
| 2:35 – 2:55 | **Diseño responsivo:** activar el modo dispositivo (Ctrl+Shift+M) y cambiar entre un móvil (~375 px), una tablet (~768 px) y escritorio. Mostrar cómo el formulario pasa de una columna a dos y cómo Teléfono/Edad se colocan en fila desde 480 px. | CSS responsivo *mobile-first* |
| 2:55 – 3:00 | Cierre: mostrar el `README.md` y el repositorio en GitHub con el historial de commits. | Organización y documentación |

## Consejos de grabación

- Graba en una sola toma con una resolución de al menos 1280×720.
- Habla mientras muestras; no leas el código completo, solo señala los fragmentos clave.
- Usa datos de prueba preparados para no perder tiempo escribiendo:
  - Nombre: `Ana López Ruiz`
  - Correo: `ana.lopez@skytech-geo.com`
  - Contraseña: `Drone2026`
  - Teléfono: `3001234567`
  - Edad: `29`
  - Servicio: `Drones`
