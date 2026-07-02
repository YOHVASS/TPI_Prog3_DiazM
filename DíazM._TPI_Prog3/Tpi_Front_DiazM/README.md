# Proyecto:  3PROGRAMACIÓN III  Trabajo Final - Food Store

# link video : https://drive.google.com/file/d/1Jb9XLf4vA9P2o1ekuzITVRAmKe435VjF/view?usp=drive_link

# link Informe :  https://drive.google.com/file/d/1FaXWY_NBfxbNgqUtmYPz74xXFsEoyLXp/view?usp=sharing


## ✍️ Descripción

FoodStore es una plataforma diseñada para la gestión de compra y venta de productos, permitiendo dos tipos de perfiles: Usuario Cliente (búsqueda, carrito y checkout) y Usuario Administrador (gestión de catálogo y control de pedidos). El proyecto pone énfasis en la persistencia de datos, la integridad transaccional y la escalabilidad del frontend.


## Notas Técnicas Adicionales
Delegación de Eventos: Se utilizó un único listener en el contenedor de productos para manejar los clics en los botones "Agregar", optimizando el uso de memoria.

Toasts de Notificación: Se implementó una función personalizada para mostrar avisos visuales (verdes) cada vez que un producto se suma con éxito al carrito.

## 🛠️ Tecnologías Utilizadas

*   **HTML5 & CSS3:** Estructura semántica y diseño responsivo.
*   **TypeScript:** Programación con tipado fuerte para mayor robustez.
*   **Vite:** Herramienta de construcción y servidor de desarrollo rápido.
*   **Local Storage:** Almacenamiento local para persistencia de datos.

## 📁 Estructura del Proyecto

```
/
├── src/
│   ├── pages/                # Contiene las páginas de la aplicación
│   │   ├── admin/            # Páginas solo para administradores
│   │   ├── auth/             # Páginas de autenticación (login, registro)
│   │   └── client/           # Páginas solo para clientes
│   ├── types/                # Define las interfaces y tipos (IUser, Rol)
│   └── utils/                # Lógica reutilizable
│       ├── auth.ts           # Función principal de verificación de rol y sesión
│       ├── localStorage.ts   # Funciones para leer/escribir en localStorage
│       └── navigate.ts       # Función para redirigir al usuario
├── package.json              # Dependencias y scripts
└── README.md                 # Este archivo

## 🚀 Instalación y Uso

se instalo pnpm


```bash
npm install -g pnpm
```

### 2. Instalar Dependencias del Proyecto

instaladas las dependencias necesarias con `pnpm`:

```bash
pnpm install
```

### 3. Ejecutar el Proyecto


```bash
pnpm dev
```

 `http://localhost:5173`.


Autor
Yohanna  Díaz Monroy - Estudiante de la Tecnicatura Universitaria en Programación a Distancia, Comisión - 13 Tutor Renzo Sosa