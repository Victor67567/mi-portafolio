# Portafolio Profesional — Víctor Mireles 🚀

> **Estudiante de Análisis de Sistemas & Desarrollador**  
> *Instituto Universitario de Tecnología para la Informática (IUTEPI) — Acarigua, Venezuela*

---

## 📌 1. Descripción del Proyecto

Este proyecto es un **portafolio web profesional, moderno, estático y 100% responsive** diseñado para presentar proyectos de software, conocimientos técnicos, formación académica y vías de contacto de **Víctor Johan Mireles Torres**.

Está optimizado para cargarse de forma ultra rápida y sin dependencias de backend, bases de datos o servidores, permitiendo su despliegue gratuito e inmediato en **GitHub Pages**.

---

## 🛠️ 2. Tecnologías Utilizadas

- **HTML5 Semántico**: Estructuración accesible, moderna y optimizada para SEO.
- **CSS3 Moderno**:
  - Variables nativas (Design Tokens)
  - Paleta en modo oscuro (Grafito, Negro, Azul Eléctrico y Cian)
  - Efectos sutiles de Glassmorphism (`backdrop-filter`)
  - Sistema de Grid y Flexbox completamente responsive
  - Animaciones fluidas mediante CSS y Scroll Reveal
- **JavaScript Vanilla (ES6+)**:
  - Menú de navegación responsive tipo hamburguesa
  - Sistema de filtrado interactivo de proyectos por categoría
  - Ventana modal interactiva para detalles de cada proyecto
  - Copiado de correo y código con notificaciones flotantes (*Toasts*)
  - Detección de scroll y enlaces activos dinámicos
- **Iconos & Tipografía**:
  - **Font Awesome 6.5.1** (vía CDN)
  - **Google Fonts** (*Plus Jakarta Sans* y *JetBrains Mono*)

---

## 📁 3. Estructura de Archivos

El proyecto utiliza rutas relativas para garantizar total compatibilidad con GitHub Pages:

```text
mi-portafolio/
│
├── index.html               # Documento principal del portafolio (SPA)
│
├── css/
│   └── style.css            # Hoja de estilos (Dark theme, responsive, animaciones)
│
├── js/
│   └── script.js            # Lógica interactiva y configuración
│
├── assets/
│   ├── images/              # Imágenes y capturas de pantalla de proyectos
│   ├── icons/               # Iconos y logotipos personalizados
│   └── docs/
│       └── CV_Victor_Mireles.pdf  # (Coloca aquí tu archivo PDF real de CV)
│
└── README.md                # Documentación del proyecto y guía de despliegue
```

---

## 💻 4. Cómo Ejecutar el Proyecto Localmente

No se requiere ningún gestor de paquetes (npm/yarn) ni servidor backend.

### Opción 1: Abrir directamente en el navegador
1. Haz doble clic sobre el archivo `index.html`.
2. Se abrirá inmediatamente en tu navegador web preferido (Chrome, Edge, Firefox, Brave, Safari, etc.).

### Opción 2: Usar la extensión Live Server (VS Code / Antigravity IDE)
1. Abre la carpeta del proyecto en el editor.
2. Haz clic derecho en `index.html` y selecciona **"Open with Live Server"**.
3. El sitio se ejecutará en `http://127.0.0.1:5500/`.

---

## ⚙️ 5. Personalización Rápida de Datos

Para actualizar tus enlaces y datos personales, modifica los placeholders en los siguientes archivos:

### En `js/script.js` (Líneas 10-18):
```javascript
const CONFIG = {
  nombre: "Víctor Johan Mireles Torres",
  titulo: "Estudiante de Análisis de Sistemas & Desarrollador",
  email: "tu_correo_real@gmail.com",            // <- Coloca tu correo aquí
  github: "https://github.com/tu-usuario",       // <- Coloca tu usuario de GitHub
  linkedin: "https://linkedin.com/in/tu-perfil", // <- Coloca tu LinkedIn
  cvPath: "assets/docs/CV_Victor_Mireles.pdf",
  institucion: "IUTEPI",
  ubicacion: "Acarigua, Venezuela"
};
```

### En `index.html`:
- Busca `TU_EMAIL@ejemplo.com` y reemplázalo por tu correo electrónico.
- Busca `https://github.com/TU_USUARIO` y actualízalo con la URL de tu perfil o repositorios.
- Busca `https://linkedin.com/in/TU_USUARIO` y actualízalo con la URL de tu perfil en LinkedIn.
- Para agregar tu currículum, simplemente guarda tu archivo PDF con el nombre exacto `CV_Victor_Mireles.pdf` dentro de la carpeta `assets/docs/`.
- Para agregar capturas reales a los proyectos, puedes guardar las imágenes en `assets/images/` y reemplazar el contenedor `<div class="project-placeholder">...</div>` por `<img src="assets/images/tu-captura.png" alt="Nombre del Proyecto" class="project-img">`.

---

## 🌐 6. Cómo Subir el Proyecto a GitHub y Activar GitHub Pages

### Paso 1: Crear un repositorio en GitHub
1. Inicia sesión en [GitHub](https://github.com).
2. Haz clic en **New repository** (Nuevo repositorio).
3. Asigna un nombre al repositorio (por ejemplo: `mi-portafolio` o `tu-usuario.github.io`).
4. Selecciona visibilidad **Public** (Público) y haz clic en **Create repository**.

### Paso 2: Subir el código mediante la terminal Git
Abre la terminal en la carpeta de tu proyecto y ejecuta los siguientes comandos:

```bash
# 1. Inicializar repositorio Git
git init

# 2. Agregar todos los archivos
git add .

# 3. Crear el primer commit
git commit -m "Portafolio profesional de Víctor Mireles"

# 4. Renombrar la rama principal a main
git branch -M main

# 5. Conectar con tu repositorio remoto en GitHub
git remote add origin https://github.com/TU_USUARIO/mi-portafolio.git

# 6. Subir los archivos a GitHub
git push -u origin main
```

*(Reemplaza `TU_USUARIO` y `mi-portafolio` por tu usuario y nombre de repositorio real).*

---

### Paso 3: Activar GitHub Pages (Gratis)
1. Ve a la página de tu repositorio en GitHub.
2. Haz clic en la pestaña **Settings** (Configuración) en la parte superior.
3. En la barra lateral izquierda, selecciona la sección **Pages**.
4. En **Build and deployment > Source**, selecciona **Deploy from a branch**.
5. En **Branch**, selecciona la rama `main` y la carpeta `/(root)`.
6. Haz clic en **Save** (Guardar).
7. Espera 1 a 2 minutos y GitHub generará tu enlace público:
   `https://TU_USUARIO.github.io/mi-portafolio/`

---

## 🔄 7. Cómo Actualizar el Sitio después de Realizar Cambios

Cada vez que realices una mejora en el código, agregues un nuevo proyecto o actualices tu CV:

```bash
# 1. Guardar cambios
git add .

# 2. Confirmar cambios con un mensaje descriptivo
git commit -m "Actualización de proyectos y CV"

# 3. Enviar a GitHub
git push origin main
```

GitHub Pages actualizará automáticamente el sitio web en cuestión de segundos.

---

## 📄 8. Licencia

© 2026 **Víctor Mireles**. Todos los derechos reservados.
Desarrollado con estándares web modernos, limpios y accesibles.
