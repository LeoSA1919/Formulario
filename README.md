# Skytech-Geo · Formulario de registro de clientes

Práctica universitaria de la asignatura **Desarrollo Web**. Se construyó un formulario de registro de clientes para una plataforma ficticia de servicios geoespaciales y con drones ("Skytech-Geo"). El formulario es responsivo, semántico y valida todos los datos en el navegador, sin servidor.

## Tecnologías

Proyecto 100 % estático, sin frameworks, librerías ni recursos externos (CDN).

- **HTML5** (Lenguaje de Marcado de Hipertexto, versión 5): estructura semántica del formulario.
- **CSS3** (Hojas de Estilo en Cascada, nivel 3): diseño responsivo *mobile-first* con variables, Grid, Flexbox, transiciones y animaciones.
- **JavaScript** (puro, sin librerías): manipulación del DOM (Modelo de Objetos del Documento) y validaciones del lado del cliente.

## Funcionalidades implementadas

### Campos del formulario

| # | Campo | Tipo de control | Reglas de validación |
|---|-------|-----------------|----------------------|
| 1 | Nombre completo | `input type="text"` | Obligatorio, mínimo 3 caracteres, solo letras y espacios |
| 2 | Correo electrónico | `input type="email"` | Obligatorio, formato validado con expresión regular |
| 3 | Contraseña | `input type="password"` | Obligatoria, mínimo 8 caracteres, una mayúscula y un número; indicador visual de requisitos |
| 4 | Confirmar contraseña | `input type="password"` | Obligatoria, debe coincidir con la contraseña |
| 5 | Teléfono | `input type="tel"` | Obligatorio, solo dígitos, entre 7 y 15 caracteres |
| 6 | Edad | `input type="number"` | Obligatoria, entero entre 18 y 100 (`min`/`max`) |
| 7 | Tipo de servicio | `select` | Obligatorio (Topografía, Geoespacial, Drones, Consultoría) |
| 8 | Términos y condiciones | `input type="checkbox"` | Obligatorio (debe estar marcado) |
| 9 | Comentarios | `textarea` | Opcional, máximo 500 caracteres con contador |

### HTML5 semántico

- `<form>`, `<fieldset>` y `<legend>` para agrupar los campos en tres bloques: datos personales, datos de acceso y servicio de interés.
- Un `<label>` asociado a cada control mediante el atributo `for`.
- Tipos de `input` correctos y atributos `required`, `placeholder`, `min`, `max`, `minlength`, `maxlength`, `pattern`, `autocomplete` e `inputmode`.
- Un `<span aria-live="polite">` por campo para su mensaje de error, y un mensaje global con `role="status"`.
- `<!DOCTYPE html>`, `lang="es"`, meta *viewport* y `<title>` descriptivo.

### CSS responsivo

- Variables CSS en `:root` para colores, tipografía, espaciados y radios.
- Maquetación con CSS Grid (dos columnas en escritorio) y Flexbox (grupos, campos, botones).
- Enfoque *mobile-first* con dos *media queries*: `480px` (campos cortos en dos columnas, botones en fila) y `768px` (columna de contexto + formulario).
- Estados visuales: foco con anillo naranja, error con borde rojo y fondo tenue, válido con borde verde.
- Transiciones en bordes, sombras y botones; animaciones de aparición de mensajes, sacudida sutil al marcar un error y pulso al enviar con éxito.
- Botón con estados `hover`, `active`, `focus-visible` y `disabled`.
- Respeto a la preferencia `prefers-reduced-motion`.

### JavaScript

- Los tres eventos exigidos:
  - **input**: validación en tiempo real mientras el usuario escribe.
  - **blur**: validación al perder el foco.
  - **submit**: validación final con `event.preventDefault()`; el envío se bloquea si hay errores y el foco salta al primer campo inválido.
- Una función de validación por campo (`validarNombre`, `validarCorreo`, `validarContrasena`, `validarConfirmacion`, `validarTelefono`, `validarEdad`, `validarServicio`, `validarComentarios`, `validarTerminos`) y una función `validarFormulario()` que las ejecuta todas.
- Mensajes de error específicos por campo y mensaje de éxito global.
- Al enviar con éxito: se imprimen los datos en la consola (sin la contraseña), se muestra la confirmación, se deshabilita el botón momentáneamente y se limpia el formulario.
- Indicador de requisitos de la contraseña y contador de caracteres del textarea, ambos actualizados en tiempo real.

## Estructura del proyecto

```
Guia 1/
├── index.html        # Estructura semántica del formulario
├── css/
│   └── style.css     # Estilos, variables, responsividad y animaciones
├── js/
│   └── script.js     # Validaciones y manejo de eventos del DOM
├── README.md         # Este documento
├── GUION_VIDEO.md    # Guion para el video de evidencia
└── .gitignore        # Archivos del sistema y del editor a ignorar
```

## Cómo ejecutarlo localmente

No requiere instalación ni servidor.

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` con doble clic en cualquier navegador moderno (Chrome, Edge, Firefox).
3. Opcional: en Visual Studio Code, instala la extensión **Live Server**, haz clic derecho sobre `index.html` y elige *Open with Live Server* para recargar automáticamente al editar.
4. Abre la consola del navegador (F12 → pestaña *Console*) para ver los datos impresos tras un envío exitoso.

## Decisiones de diseño

- Se añadió `novalidate` al `<form>` para desactivar los globos de error nativos del navegador y que toda la validación (y sus mensajes en español) la controle JavaScript. Los atributos HTML5 se mantienen como respaldo y documentación.
- Los mensajes de "campo obligatorio" no aparecen mientras el usuario aún no ha interactuado con el campo; sí aparecen al perder el foco o al intentar enviar.
- La contraseña se excluye de los datos impresos en consola por buenas prácticas.
- La paleta se inspira en los mapas topográficos: fondo gris-verdoso, azul profundo para la marca y naranja de señalización para los acentos. El encabezado usa curvas de nivel dibujadas con SVG inline (sin recursos externos).

## Autores

Completar con los integrantes del grupo:

| Nombre completo | Código / Identificación | Rol en el proyecto |
|-----------------|-------------------------|--------------------|
|                 |                         |                    |
|                 |                         |                    |
|                 |                         |                    |

Asignatura: Desarrollo Web · Docente: _________________ · Periodo: _________________
