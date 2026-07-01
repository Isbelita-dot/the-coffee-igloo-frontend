# ☕ The Coffee Igloo Frontend

The Coffee Igloo es una aplicación web Full-Stack que permite gestionar recetas saludables de café mediante una API REST. Este repositorio contiene el **frontend** de la aplicación, desarrollado con HTML, CSS y JavaScript.

---

## Descripción

La aplicación permite a los usuarios:

* Crear nuevas recetas de café.
* Visualizar todas las recetas disponibles.
* Buscar recetas por nombre o categoría.
* Editar recetas existentes.
* Eliminar recetas.
* Acceder a la documentación interactiva de la API mediante Swagger.

---

## Tecnologías utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)
* Axios

### Backend

El frontend consume una API REST desarrollada con:

* Python
* FastAPI
* SQLite

---

## Estructura del proyecto

```text
frontend/
│
├── assets/
│   ├── favicon.png
│   └── images/
│
├── css/
│   └── styles.css
│
├── js/
│   └── script.js
│
├── index.html
├── documentation.html
└── README.md
```

---

## Funcionalidades

* Gestión completa de recetas (CRUD).
* Búsqueda dinámica por nombre o categoría.
* Interfaz responsive para dispositivos móviles y escritorio.
* Imágenes para cada receta.
* Confirmación antes de eliminar una receta.
* Página de documentación de la API.
* Acceso directo a Swagger UI.

---

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/TU_USUARIO/the-coffee-igloo-frontend.git
```

Accede a la carpeta del proyecto:

```bash
cd the-coffee-igloo-frontend
```

Asegúrate de que el backend esté ejecutándose en:

```text
http://127.0.0.1:8000
```

Abre el proyecto utilizando **Live Server** o cualquier servidor local.

---

## API

La aplicación consume la API REST mediante Axios.

URL base:

```text
http://127.0.0.1:8000/recipes
```

Operaciones disponibles:

* GET
* POST
* PUT
* DELETE

La documentación interactiva de la API está disponible en:

```text
http://127.0.0.1:8000/docs
```
---

## Mejoras futuras

* Sistema de autenticación de usuarios.
* Subida de imágenes personalizadas.
* Filtros avanzados de búsqueda.
* Despliegue de la aplicación en la nube.

---

## Autora

**Isbel Hernandez**

Proyecto desarrollado como parte del aprendizaje de desarrollo web Full-Stack utilizando FastAPI, JavaScript y tecnologías web modernas.
