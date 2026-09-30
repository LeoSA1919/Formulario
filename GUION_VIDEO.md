# Guion del video de demostración (máximo 3 minutos)

Preparación antes de grabar:

- Abrir `index.html` en el navegador a pantalla completa.
- Abrir la consola del navegador (`F12`, pestaña *Consola*) y dejarla acoplada abajo o a la derecha.
- Tener la ventana del navegador en un tamaño que permita luego reducir el ancho.

## 1. Presentación y diseño (0:00 – 0:30)

- Decir el nombre del grupo y del proyecto: formulario de registro de socios de la Sociedad Astronómica Vega Austral, proyecto académico de Desarrollo Web.
- Recorrer la página: cabecera con la estrella en SVG, nombre en tipografía serif y panel "ficha de nuevo socio" dividido en tres secciones con `fieldset` y `legend`.
- Mencionar que solo se usan HTML5, CSS3 y JavaScript puro, sin frameworks.
- Pasar el ratón por los campos y hacer clic en uno para mostrar el estado de foco (borde y anillo latón).

## 2. Validación en tiempo real, evento `input` (0:30 – 1:05)

- En **Nombre completo**, escribir "Ma" y mostrar que aparece "al menos 3 caracteres"; escribir "Mar1a" y mostrar el mensaje de solo letras; corregir a "María Pérez" y ver el borde verde aurora.
- En **Contraseña**, escribir letra a letra "vega" (ningún chip), luego "Vega" (se enciende "Una mayúscula"), luego "Vega2026" (se encienden los tres chips).
- En **Comentarios**, escribir un par de palabras y señalar cómo el contador cambia en vivo.

## 3. Validación al perder el foco, evento `blur` (1:05 – 1:25)

- Hacer clic en **Correo electrónico**, no escribir nada y pulsar Tab: aparece "Escribe tu correo electrónico".
- Escribir "ana@correo" (sin dominio válido) y pulsar Tab: aparece el mensaje de formato con el ejemplo.
- Corregir a "ana@correo.com" y ver que el mensaje desaparece y el borde pasa a verde.

## 4. Mensajes de error por campo y bloqueo del envío inválido, evento `submit` (1:25 – 2:05)

- Dejar varios campos vacíos o incorrectos: teléfono con letras, edad 15, confirmación distinta a la contraseña, desplegable sin elegir y casilla sin marcar.
- Pulsar **Enviar solicitud** (recalcar que el botón nunca está deshabilitado).
- Mostrar que la página **no se recarga**, que el panel se sacude y aparece el aviso rojo con el número de campos por corregir, que cada campo muestra su mensaje específico y que el foco saltó al primer campo inválido.
- Mostrar en la consola que no se imprimió ningún dato.

## 5. Envío exitoso (2:05 – 2:35)

- Corregir todos los campos: teléfono con 9 dígitos, edad 24, contraseñas iguales, elegir "Astrofotografía", marcar la casilla.
- Pulsar **Enviar solicitud**: aparece el aviso verde de bienvenida con el nombre y el correo.
- Señalar en la consola la tabla con los datos registrados (la contraseña aparece enmascarada).
- Mostrar que el formulario se limpió y que los chips y el contador volvieron a cero.

## 6. Diseño responsivo (2:35 – 3:00)

- Reducir el ancho de la ventana poco a poco (o activar la vista de dispositivo móvil con `Ctrl+Shift+M` en las herramientas de desarrollo).
- Señalar los dos puntos de quiebre: por encima de 720 px hay más aire y el panel es más ancho; por debajo de 480 px los campos de teléfono y edad pasan de compartir fila a apilarse y los botones se ponen uno debajo del otro.
- Mostrar que nada se desborda ni aparece barra horizontal en móvil.
- Cerrar con una frase de despedida y el nombre del repositorio en GitHub.
