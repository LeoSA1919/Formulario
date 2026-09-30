# Registro de socios: Sociedad Astronómica Vega Austral

Formulario web de inscripción de nuevos socios para una sociedad astronómica y observatorio comunitario **ficticios**. Es una práctica universitaria de la asignatura **Desarrollo Web**: un proyecto estático, responsivo y con validaciones del lado del cliente hechas en JavaScript puro.

## Siglas utilizadas

| Sigla | Significado |
|-------|-------------|
| HTML5 | Lenguaje de Marcado de Hipertexto, versión 5 |
| CSS3  | Hojas de Estilo en Cascada, versión 3 |
| DOM   | Modelo de Objetos del Documento |
| SVG   | Gráficos Vectoriales Escalables |
| ARIA  | Aplicaciones de Internet Enriquecidas y Accesibles (atributos de accesibilidad) |

## Tecnologías utilizadas

- **HTML5** semántico: `form`, `fieldset`, `legend`, `label` asociado con `for`, tipos de input correctos y atributos de validación nativos.
- **CSS3**: variables CSS (custom properties), CSS Grid y Flexbox, diseño *mobile-first* con dos media queries (480 px y 720 px), transiciones y animaciones con respeto a `prefers-reduced-motion`.
- **JavaScript** puro (sin frameworks ni librerías): manipulación del DOM y validaciones con los eventos `input`, `blur` y `submit`.
- Tipografías de Google Fonts: *Instrument Serif* (titulares) e *IBM Plex Sans* (cuerpo), con pila de respaldo local.

## Funcionalidades implementadas

- Nueve campos: nombre completo, correo electrónico, teléfono, edad, contraseña, confirmación de contraseña, área de interés (desplegable), comentarios (opcional, con contador de caracteres) y aceptación de términos (casilla).
- **Validación en tiempo real** (evento `input`) mientras se escribe.
- **Validación al perder el foco** (evento `blur`).
- **Validación final al enviar** (evento `submit`) con `event.preventDefault()`: si hay datos inválidos, el envío se **bloquea**, se muestra un resumen de error dentro del panel y el foco salta al primer campo inválido.
- Mensajes de error **específicos** bajo cada campo, con espacio reservado para que el diseño no salte, y anunciados a lectores de pantalla con `aria-live`.
- Chips de requisitos de la contraseña (8 caracteres, una mayúscula, un número) que se encienden al cumplirse.
- Contador de caracteres en los comentarios (máximo 500).
- Aviso global de éxito al enviar correctamente; los datos se imprimen en la consola del navegador (la contraseña se muestra enmascarada) y el formulario se limpia.
- Botón secundario "Limpiar ficha" que vacía los valores y todos los estados visuales.
- El botón de envío **nunca se deshabilita**, para poder demostrar el bloqueo de envíos inválidos.
- Estados visuales de foco (borde y anillo latón), error (ámbar rosado) y válido (aurora) en todos los campos; foco visible por teclado.

## Reglas de validación

| Campo | Regla |
|-------|-------|
| Nombre completo | Obligatorio, mínimo 3 caracteres, solo letras y espacios (admite tildes y ñ) |
| Correo electrónico | Obligatorio, formato válido comprobado con expresión regular |
| Teléfono | Obligatorio, solo dígitos, entre 7 y 15 |
| Edad | Obligatoria, número entero entre 18 y 100 |
| Contraseña | Obligatoria, mínimo 8 caracteres, al menos una mayúscula y un número |
| Confirmar contraseña | Obligatoria, debe coincidir con la contraseña |
| Área de interés | Obligatoria, hay que elegir una opción del desplegable |
| Comentarios | Opcional, máximo 500 caracteres |
| Términos y condiciones | Obligatorio marcar la casilla |

## Estructura del proyecto

```
Guia 1/
├── index.html        Estructura semántica del formulario (HTML5)
├── css/
│   └── style.css     Estilos, variables, diseño responsivo y animaciones (CSS3)
├── js/
│   └── script.js     Validaciones y manejo de eventos mediante el DOM (JavaScript)
├── README.md         Este documento
├── GUION_VIDEO.md    Guion para el video de demostración
└── .gitignore        Archivos del sistema y del editor que no se versionan
```

## Cómo ejecutarlo localmente

No necesita servidor ni instalación.

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` con doble clic en cualquier navegador moderno (Chrome, Firefox, Edge o Safari).

Opcionalmente, en Visual Studio Code puedes instalar la extensión **Live Server**, hacer clic derecho sobre `index.html` y elegir *Open with Live Server* para que la página se recargue sola al guardar cambios.

Para ver los datos que se registran al enviar el formulario, abre la consola del navegador con `F12` (pestaña *Consola*).

## Decisiones de diseño

- Concepto visual "noche de observación": un único mundo oscuro elegido a propósito (se declara `color-scheme: dark` y fondos explícitos; no hay modo claro).
- Paleta de índigo y ciruela con acento latón para foco, enlaces y botón primario; ámbar rosado para errores y verde aurora para lo válido.
- Columna central única de 640 px como máximo. La cabecera celeste (estrella de ocho puntas en SVG, nombre en serif y divisor con estrella) es el único golpe de audacia; el panel del formulario es sobrio.
- El tema aparece como contenido, no como adorno: las áreas de interés son astronómicas y los textos hablan de salidas de observación y astrofotografía.

## Autores

Completar con los integrantes del grupo:

- Nombre y apellidos, código de estudiante
- Nombre y apellidos, código de estudiante
- Nombre y apellidos, código de estudiante

Asignatura: Desarrollo Web. Docente: ______________________. Periodo: ______________________.
