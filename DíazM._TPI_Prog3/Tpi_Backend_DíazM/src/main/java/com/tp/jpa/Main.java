package com.tp.jpa;


import com.tp.jpa.model.enums.FormaPago;
import jakarta.persistence.*;   // <-- corregido
import com.tp.jpa.model.Usuario;
import com.tp.jpa.model.Pedido;
import com.tp.jpa.model.Producto;


import com.tp.jpa.model.*;
import com.tp.jpa.model.enums.Estado;
import com.tp.jpa.repository.*;
import com.tp.jpa.util.JPAUtil;
import jakarta.persistence.EntityManager;
import lombok.Builder;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.Scanner;

@SuperBuilder
public class Main {
    private static final Scanner scanner = new Scanner(System.in);

    private static final CategoriaRepository categoriaRepo = new CategoriaRepository();
    private static final ProductoRepository productoRepo = new ProductoRepository();
    private static final UsuarioRepository usuarioRepo = new UsuarioRepository();
    private static final PedidoRepository pedidoRepo = new PedidoRepository();


    public static void main(String[] args) {
        int opcion = -1;
        while (opcion != 0) {
            System.out.println("\n--- FOOD STORE MENU ---");
            System.out.println("1. Categorías | 2. Productos | 3. Usuarios | 4. Pedidos | 5. Reportes | 0. Salir");
            System.out.print("Seleccione una opción: ");

            try {
                opcion = Integer.parseInt(scanner.nextLine());
                switch (opcion) {
                    case 1: menuCategorias(); break;
                    case 2: menuProductos(); break;
                    case 3: menuUsuarios(); break;
                    case 4: menuPedidos(); break;
                    case 5: menuReportes(); break;
                    case 0: JPAUtil.close(); System.out.println("Sistema cerrado."); break;
                    default: System.out.println("Opción inválida.");

                }
            } catch (NumberFormatException e) {
                System.out.println("Error: ingrese un número válido.");
            }
        }
    }

    // -------------------- MENÚ CATEGORÍAS --------------------
    private static void menuCategorias() {
        System.out.println("\n--- Gestión de Categorías ---");
        System.out.println("1. Alta | 2. Baja lógica | 3. Listar | 0. Volver");
        int sub = Integer.parseInt(scanner.nextLine());
        switch (sub) {
            case 1:
                System.out.print("Nombre: ");
                String nombre = scanner.nextLine();
                if (nombre.isBlank()) {
                    System.out.println("Error: el nombre no puede estar vacío.");
                    break;
                }
                System.out.print("Descripción: ");
                String descripcion = scanner.nextLine();
                Categoria nueva = new Categoria();
                nueva.setNombre(nombre);
                nueva.setDescripcion(descripcion);
                Categoria guardada = categoriaRepo.guardar(nueva);
                System.out.println("Categoría creada con ID: " + guardada.getId());
                break;

            case 2:
                System.out.print("Ingrese ID de la categoría: ");
                Long id = Long.parseLong(scanner.nextLine());
                if (categoriaRepo.eliminarLogico(id)) {
                    System.out.println("Categoría dada de baja correctamente.");
                } else {
                    System.out.println("Error: categoría no encontrada.");
                }
                break;

            case 3:
                for (Categoria c : categoriaRepo.listarActivos()) {
                    System.out.println("ID: " + c.getId() + " | " + c.getNombre() + " - " + c.getDescripcion());
                }
                break;

            case 0: break;
            default: System.out.println("Opción inválida.");
        }
    }



    // -------------------- MENÚ PRODUCTOS --------------------
    private static void menuProductos() {
        System.out.println("\n--- Gestión de Productos ---");
        System.out.println("1. Alta | 2. Editar | 3. Baja lógica | 4. Listar | 0. Volver");
        int sub = Integer.parseInt(scanner.nextLine());
        switch (sub) {
            case 1:
                System.out.print("Nombre: ");
                String nombre = scanner.nextLine();
                System.out.print("Precio: ");
                double precio = Double.parseDouble(scanner.nextLine());
                System.out.print("Stock: ");
                int stock = Integer.parseInt(scanner.nextLine());
                Producto nuevo = new Producto();
                nuevo.setNombre(nombre);
                nuevo.setPrecio(precio);
                nuevo.setStock(stock);
                Producto guardado = productoRepo.guardar(nuevo);
                System.out.println("Producto creado con ID: " + guardado.getId());
                break;

            case 2:
                System.out.print("Ingrese ID del producto: ");
                Long id = Long.parseLong(scanner.nextLine());
                Producto prod = productoRepo.buscarPorId(id).orElse(null);
                if (prod == null) {
                    System.out.println("Producto no encontrado.");
                    break;
                }
                System.out.print("Nuevo nombre (Enter para mantener): ");
                String nuevoNombre = scanner.nextLine();
                if (!nuevoNombre.isBlank()) prod.setNombre(nuevoNombre);
                productoRepo.guardar(prod);
                System.out.println("Producto actualizado.");
                break;

            case 3:
                System.out.print("Ingrese ID del producto: ");
                Long idProd = Long.parseLong(scanner.nextLine());
                if (productoRepo.eliminarLogico(idProd)) {
                    System.out.println("Producto dado de baja correctamente.");
                } else {
                    System.out.println("Error: producto no encontrado.");
                }
                break;

            case 4:
                for (Producto p : productoRepo.listarActivos()) {
                    System.out.println("ID: " + p.getId() + " | " + p.getNombre() + " | Precio: " + p.getPrecio() + " | Stock: " + p.getStock());
                }
                break;

            case 0: break;
            default: System.out.println("Opción inválida.");
        }
    }


    // -------------------- MENÚ USUARIOS --------------------
    private static void menuUsuarios() {
        System.out.println("\n--- Gestión de Usuarios ---");
        System.out.println("1. Alta | 2. Buscar por mail | 3. Listar | 0. Volver");
        int sub = Integer.parseInt(scanner.nextLine());
        switch (sub) {
            case 1:
                System.out.print("Nombre: ");
                String nombre = scanner.nextLine();
                System.out.print("Apellido: ");
                String apellido = scanner.nextLine();
                System.out.print("Mail: ");
                String mail = scanner.nextLine();
                Usuario nuevo = new Usuario();
                nuevo.setNombre(nombre);
                nuevo.setApellido(apellido);
                nuevo.setMail(mail);
                Usuario guardado = usuarioRepo.guardar(nuevo);
                System.out.println("Usuario creado con ID: " + guardado.getId());
                break;

            case 2:
                System.out.print("Ingrese mail: ");
                String buscarMail = scanner.nextLine();
                usuarioRepo.buscarPorMail(buscarMail).ifPresentOrElse(
                        u -> System.out.println("Usuario encontrado: " + u.getNombre() + " " + u.getApellido()),
                        () -> System.out.println("No existe usuario activo con ese mail.")
                );
                break;

            case 3:
                for (Usuario u : usuarioRepo.listarActivos()) {
                    System.out.println("ID: " + u.getId() + " | " + u.getNombre() + " " + u.getApellido() + " | Mail: " + u.getMail());
                }
                break;

            case 0: break;
            default: System.out.println("Opción inválida.");
        }
    }


    // -------------------- MENÚ PEDIDOS --------------------

    // -------------------- MENÚ PEDIDOS --------------------
    private static void menuPedidos() {
        System.out.println("\n--- Gestión de Pedidos ---");
        System.out.println("1. Alta de pedido | 2. Buscar por estado | 0. Volver");
        int sub = Integer.parseInt(scanner.nextLine());
        switch (sub) {
            case 1:
                realizarAltaPedido();   // <- este método ya lo tienes
                break;

            case 2:
                System.out.print("Ingrese estado (PENDIENTE, CONFIRMADO, TERMINADO, CANCELADO): ");
                String estadoStr = scanner.nextLine().toUpperCase();
                try {
                    Estado estado = Estado.valueOf(estadoStr);
                    for (Pedido p : pedidoRepo.buscarPorEstado(estado)) {
                        System.out.println("ID: " + p.getId() +
                                " | Fecha: " + p.getFecha() +
                                " | Usuario: " + p.getUsuario().getNombre() +
                                " | Estado: " + p.getEstado() +
                                " | Total: $" + p.getTotal());
                    }
                } catch (IllegalArgumentException e) {
                    System.out.println("Estado inválido.");
                }
                break;

            case 0:
                break;

            default:
                System.out.println("Opción inválida.");
        }
    }

    private static void realizarAltaPedido() {
        Usuario usuario = null;
        while (usuario == null) {
            System.out.print("Ingrese ID del Usuario: ");
            Long idUsuario = Long.parseLong(scanner.nextLine());
            usuario = usuarioRepo.buscarPorId(idUsuario).orElse(null);
            if (usuario == null) {
                System.out.println("Usuario no encontrado. Intente nuevamente.");
            }
        }

        Pedido nuevoPedido = new Pedido();
        nuevoPedido.setUsuario(usuario);
        nuevoPedido.setFecha(LocalDate.now());
        nuevoPedido.setEstado(Estado.PENDIENTE);

        boolean formaValida = false;
        while (!formaValida) {
            System.out.print("Ingrese forma de pago (TARJETA, TRANSFERENCIA, EFECTIVO): ");
            String formaPago = scanner.nextLine().toUpperCase();
            try {
                nuevoPedido.setFormaPago(FormaPago.valueOf(formaPago));
                formaValida = true;
            } catch (IllegalArgumentException e) {
                System.out.println("Forma de pago inválida. Intente nuevamente.");
            }
        }

        boolean agregarOtro = true;
        while (agregarOtro) {
            System.out.print("Ingrese ID del producto: ");
            Long idProd = Long.parseLong(scanner.nextLine());
            Producto prod = productoRepo.buscarPorId(idProd).orElse(null);

            if (prod != null && prod.getDisponible()) {
                System.out.print("Cantidad: ");
                int cant = Integer.parseInt(scanner.nextLine());
                if (prod.getStock() >= cant) {
                    nuevoPedido.addDetallePedido(cant, prod);
                } else {
                    System.out.println("Stock insuficiente. Disponible: " + prod.getStock());
                }
            } else {
                System.out.println("Producto no encontrado o no disponible.");
            }

            System.out.print("¿Agregar otro producto? (s/n): ");
            agregarOtro = scanner.nextLine().equalsIgnoreCase("s");
        }

        if (nuevoPedido.getDetalles().isEmpty()) {
            System.out.println("El pedido debe tener al menos un detalle. No se guardó.");
            return;
        }

        nuevoPedido.calcularTotal();

        EntityManager em = JPAUtil.getEntityManagerFactory().createEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(nuevoPedido);

            for (DetallePedido dp : nuevoPedido.getDetalles()) {
                Producto p = em.find(Producto.class, dp.getProducto().getId());
                p.setStock(p.getStock() - dp.getCantidad());
            }

            em.getTransaction().commit();
            System.out.println("Pedido guardado exitosamente. Total: $" + nuevoPedido.getTotal());
        } catch (Exception e) {
            if (em.getTransaction().isActive()) em.getTransaction().rollback();
            System.out.println("Error en la transacción: " + e.getMessage());
        } finally {
            em.close();
        }
    }




    // -------------------- MENÚ REPORTES --------------------

    private static void menuReportes() {
        System.out.println("\n--- Reportes ---");
        System.out.println("1. Pedidos por usuario | 2. Productos por categoría | 3. Pedidos por estado | 0. Volver");
        int sub = Integer.parseInt(scanner.nextLine());
        switch (sub) {
            case 1:
                System.out.print("Ingrese ID del usuario: ");
                Long idUsuario = Long.parseLong(scanner.nextLine());
                for (Pedido p : pedidoRepo.buscarPedidosPorUsuario(idUsuario)) {
                    System.out.println("ID: " + p.getId() + " | Fecha: " + p.getFecha() +
                            " | Estado: " + p.getEstado() + " | Total: $" + p.getTotal());
                }
                break;

            case 2:
                System.out.print("Ingrese ID de la categoría: ");
                Long idCategoria = Long.parseLong(scanner.nextLine());
                for (Producto prod : categoriaRepo.buscarProductosPorCategoria(idCategoria)) {
                    System.out.println("ID: " + prod.getId() + " | " + prod.getNombre() +
                            " | Precio: " + prod.getPrecio() + " | Stock: " + prod.getStock());
                }
                break;

            case 3:
                System.out.print("Ingrese estado (PENDIENTE, CONFIRMADO, TERMINADO, CANCELADO): ");
                String estadoStr = scanner.nextLine().toUpperCase();
                try {
                    Estado estado = Estado.valueOf(estadoStr);
                    for (Pedido p : pedidoRepo.buscarPorEstado(estado)) {
                        System.out.println("ID: " + p.getId() + " | Fecha: " + p.getFecha() +
                                " | Usuario: " + p.getUsuario().getNombre() +
                                " | Total: $" + p.getTotal());
                    }
                } catch (IllegalArgumentException e) {
                    System.out.println("Estado inválido.");
                }
                break;

            case 0: break;
            default: System.out.println("Opción inválida.");
        }
    }
}



