# Este README corresponde a # Proyecto:  3PROGRAMACIÓN III  Trabajo Final - Food Store

# link video : https://drive.google.com/file/d/1Jb9XLf4vA9P2o1ekuzITVRAmKe435VjF/view?usp=drive_link

# link Informe :  https://drive.google.com/file/d/1FaXWY_NBfxbNgqUtmYPz74xXFsEoyLXp/view?usp=sharing

## Food Store Backend

## 📌 Descripción
Este proyecto implementa un sistema de gestión para una tienda de alimentos utilizando **Java**, **JPA (Jakarta Persistence API)** y una arquitectura basada en repositorios.  
Permite administrar **categorías, productos, usuarios, pedidos y reportes** desde un menú de consola.

---

## 🚀 Funcionalidades principales
- **Gestión de Categorías**
    - Alta de categoría
    - Baja lógica
    - Listado de categorías activas

- **Gestión de Productos**
    - Alta de producto
    - Edición de producto
    - Baja lógica
    - Listado de productos activos

- **Gestión de Usuarios**
    - Alta de usuario
    - Búsqueda por mail
    - Listado de usuarios activos

- **Gestión de Pedidos**
    - Alta de pedido (con detalles y actualización de stock)
    - Búsqueda de pedidos por estado

- **Reportes**
    - Pedidos por usuario
    - Productos por categoría
    - Pedidos por estado



---

## Tecnologías

- Java 21
- JPA / Hibernate 6
- H2 (base de datos en archivo — `./data/jpa_db`)
- Lombok
- Gradle 8

---

## Estructura del proyecto

```
src/main/java/com/tp/jpa/
│
├── model/                        # Entidades JPA (NO modificar)
│   ├── Base.java                 # Clase abstracta base (id, eliminado, createdAt)
│   ├── Calculable.java           # Interfaz con calcularTotal()
│   ├── Categoria.java
│   ├── Producto.java
│   ├── Usuario.java
│   ├── Pedido.java
│   ├── DetallePedido.java
│   └── enums/
│       ├── Rol.java
│       ├── Estado.java
│       └── FormaPago.java
│
├── util/
│   └── JPAUtil.java              # Factory singleton (NO modificar — ya implementado)
│
├── repository/                   # ★ COMPLETAR — queries personalizadas
│   ├── BaseRepository.java       # CRUD genérico (NO modificar — ya implementado)
│   ├── ProductoRepository.java   # Sin queries extra (NO modificar)
│   ├── CategoriaRepository.java  # ★ Implementar buscarProductosPorCategoria()
│   ├── UsuarioRepository.java    # ★ Implementar buscarPorMail() y buscarPedidosPorUsuario()
│   └── PedidoRepository.java     # ★ Implementar buscarPorEstado()
│
└── Main.java                     # ★ COMPLETAR — menús de consola
```

---


---

## Cómo ejecutar

```bash
./gradlew run
```

O compilar y ejecutar el JAR:

```bash
./gradlew jar
java -jar build/libs/foodstore-jpa-0.0.1-SNAPSHOT.jar
```
