# Instituto Meridiano — Solicitud de admisión

Formulario web de solicitud de admisión para programas de educación ejecutiva del Instituto Meridiano (institución ficticia). Es una práctica académica de Desarrollo Web: todo se valida en el navegador, sin servidor. El proyecto está construido con HTML5, CSS3 y JavaScript puro, sin frameworks ni librerías; la única dependencia externa es Google Fonts.

## Lista de siglas

- **HTML5**: Lenguaje de Marcado de Hipertexto, versión 5.
- **CSS3**: Hojas de Estilo en Cascada, versión 3.
- **DOM**: Modelo de Objetos del Documento.

## Tecnologías utilizadas

- **HTML5**: estructura semántica del documento y del formulario.
- **CSS3**: variables personalizadas, Flexbox, CSS Grid, transiciones y media queries.
- **JavaScript (ES5, sin dependencias)**: manipulación del DOM, manejo de eventos y validaciones.
- **Google Fonts**: tipografías Source Serif 4 e IBM Plex Sans (única dependencia externa).

## Funcionalidades implementadas

### Campos del formulario

| Campo | Tipo | Obligatorio |
|---|---|---|
| Nombre completo | `text` | Sí |
| Correo electrónico | `email` | Sí |
| Teléfono | `tel` | Sí |
| Edad | `number` (18 a 100) | Sí |
| Contraseña | `password` | Sí |
| Confirmar contraseña | `password` | Sí |
| Programa | `select` | Sí |
| Comentarios | `textarea` (máx. 500 caracteres, con contador) | No |
| Aceptación de términos | `checkbox` | Sí |

### Validaciones

- **Campos obligatorios**: ningún campo requerido puede quedar vacío.
- **Nombre**: solo letras, espacios, apóstrofes y guiones; mínimo 3 caracteres.
- **Correo**: debe tener formato `usuario@dominio.ext`.
- **Teléfono**: solo dígitos (con prefijo `+` opcional), entre 7 y 15 dígitos.
- **Edad**: número entero entre 18 y 100.
- **Contraseña**: mínimo 8 caracteres, al menos una mayúscula y un número; con lista de requisitos que se marcan al cumplirse.
- **Confirmación de contraseña**: debe coincidir exactamente con la contraseña.
- **Programa**: es obligatorio seleccionar una opción.
- **Términos y condiciones**: la casilla debe estar marcada.

### Los tres eventos exigidos

- **`input`**: valida cada campo en tiempo real mientras la persona escribe (en la casilla de términos se usa `change`, su equivalente para casillas).
- **`blur`**: valida el campo al perder el foco, para marcar campos que se dejaron vacíos.
- **`submit`**: valida todos los campos a la vez y, con `preventDefault()`, bloquea el envío si alguno es inválido.

### Estados de error y de éxito

- Cada campo tiene su propio contenedor de mensaje (`aria-live="polite"`, enlazado con `aria-describedby`) que muestra el error específico y pinta el borde en rojo.
- Los campos válidos se marcan con borde verde.
- Al intentar enviar con errores aparece un aviso general (`role="alert"`) y el foco se mueve al primer campo con error.
- Al enviar correctamente se muestra un aviso de éxito (`role="status"`), se registran los datos en la consola del navegador y el formulario se reinicia.
- El botón **Limpiar** reinicia el formulario y todos sus estados.

### Diseño responsivo y accesibilidad

- Maquetación con Flexbox y CSS Grid.
- Media queries en 480 px (teléfono y edad pasan a dos columnas) y 720 px (más espacio interior en pantallas amplias).
- Foco visible en campos y botones.
- Respeto por `prefers-reduced-motion` (sin transiciones ni animaciones cuando el sistema lo pide).
- Etiquetas asociadas con `for`, agrupación con `fieldset`/`legend` y atributos `required`, `placeholder`, `min`, `max`, `minlength`, `maxlength`, `inputmode` y `autocomplete`.

## Estructura del proyecto

```
Guia 1/
├── index.html        # Estructura HTML5 del formulario
├── css/
│   └── style.css     # Estilos: variables, Flexbox, Grid, media queries
├── js/
│   └── script.js     # Validaciones, eventos y manipulación del DOM
├── README.md         # Este documento
├── GUION_VIDEO.md    # Guion del video de demostración
└── .gitignore        # Archivos del sistema y del editor que no se versionan
```

## Cómo ejecutarlo localmente

No necesita servidor ni instalación.

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` con doble clic en cualquier navegador moderno (Chrome, Edge, Firefox o Safari).

Alternativa recomendada para desarrollo: abre la carpeta en Visual Studio Code, instala la extensión **Live Server**, haz clic derecho sobre `index.html` y elige **Open with Live Server**. La página se recargará automáticamente con cada cambio.

Para ver el registro en consola del envío exitoso, abre las herramientas de desarrollador del navegador (tecla F12) y ve a la pestaña **Consola**.

## Autores

Completar con los nombres de las personas integrantes del grupo:

- Nombre y apellido 1
- Nombre y apellido 2
- Nombre y apellido 3
