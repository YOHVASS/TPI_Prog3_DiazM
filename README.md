FoodStore - Sistema de Gestión de E-commerce
Proyecto final integrador desarrollado para la materia Programación 3. Consiste en una plataforma de e-commerce completa con un backend robusto en Java y un frontend dinámico en TypeScript, simulando un entorno de ventas real.

🚀 Descripción del Proyecto
FoodStore permite la gestión integral de un catálogo de productos, procesamiento de pedidos y administración de usuarios. El sistema fue diseñado bajo una arquitectura en capas para asegurar la escalabilidad y el mantenimiento del código.

🛠 Stack Tecnológico
Backend (Java)
Lenguaje: Java 23.

Persistencia: JPA (Java Persistence API) con Hibernate.

Base de Datos: H2 Database (modo archivo).

Arquitectura: Patrón Repository genérico, manejo de transacciones atómicas y uso de DTOs.

Frontend (TypeScript)
Lenguaje: TypeScript + Vite.

Gestión de Estado: localStorage para persistencia de sesiones y carrito.

Estructura: Arquitectura basada en módulos (auth, store, admin) y capa de servicios para el consumo de datos.

🔑 Características Principales
Gestión de Usuarios: Autenticación simulada con roles definidos (CLIENTE / ADMIN).

Backend Transaccional: Alta de pedidos con control de integridad (rollback automático ante errores de stock).

Administración: CRUD completo de productos y categorías, junto con gestión de estados de pedidos.

Experiencia de Usuario: Catálogo interactivo con filtros, carrito de compras en tiempo real y vista de historial de pedidos.

🏗 Arquitectura
El proyecto se divide en dos bloques claramente diferenciados:

Frontend: Enfocado en la interfaz de usuario y la experiencia de compra.

Backend: Enfocado en la lógica de negocio, la integridad de los datos y la persistencia relacional.

Instrucciones de uso
(Aquí puedes agregar las instrucciones específicas de tu entorno, por ejemplo:)

Para el Backend: Ejecutar el Main.java desde tu IDE configurado con el entorno de Java 23.

Para el Frontend:

npm install

npm run dev
