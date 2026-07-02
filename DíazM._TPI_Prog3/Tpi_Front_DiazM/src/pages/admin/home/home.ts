// 1. Interfaces para tipado estricto
interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
  estado: "disponible" | "no disponible";
}

interface Pedido {
  id: number;
  cliente?: string;
  fecha: string;
  productos?: any[];
  total: number;
  estado: "pending" | "processing" | "completed" | "cancelled";
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Dashboard Admin cargado con éxito.');

  // 2. Captura de elementos del DOM
  const txtCategories = document.getElementById('totalCategories');
  const txtProducts = document.getElementById('totalProducts');
  const txtOrders = document.getElementById('totalOrders');
  const txtActiveProducts = document.getElementById('activeProducts');

  const txtEarnings = document.getElementById('totalEarnings');
  const txtPending = document.getElementById('pendingOrders');
  const txtProcessing = document.getElementById('processingOrders');
  const txtCompleted = document.getElementById('completedOrders');
  const logoutButton = document.getElementById('logoutButton') as HTMLButtonElement | null;

  // 3. Rutas hacia carpeta de datos locales (Vite expone public/)
  const PATH_CATEGORIES = "/data/categorias.json";
  const PATH_PRODUCTS = "/data/productos.json";
  const PATH_ORDERS = "/data/pedidos.json";

  try {
    // 4. Petición en paralelo
    const [resCats, resProds, resOrders] = await Promise.all([
      fetch(PATH_CATEGORIES),
      fetch(PATH_PRODUCTS),
      fetch(PATH_ORDERS)
    ]);

    if (!resCats.ok || !resProds.ok || !resOrders.ok) {
      throw new Error("No se pudo obtener la información de uno o más archivos JSON.");
    }

    const categorias: Categoria[] = await resCats.json();
    let productos: Producto[] = (await resProds.json()).map((p: any) => ({
      ...p,
      estado: p.disponible ? "disponible" : "no disponible",
      categoria: p.categoriaId?.toString() || "Sin categoría"
    }));

    // Normalización de estados de pedidos
    function mapEstadoPedido(estado: string): "pending" | "processing" | "completed" | "cancelled" {
      switch (estado) {
        case "PENDIENTE": return "pending";
        case "EN_PREPARACION": return "processing";
        case "ENTREGADO": return "completed";
        case "CANCELADO": return "cancelled";
        default: return "pending";
      }
    }

    const pedidos: Pedido[] = (await resOrders.json()).map((p: any) => ({
      ...p,
      estado: mapEstadoPedido(p.estado)
    }));

    // Unificación con productos nuevos guardados en localStorage
    const productosLocales = localStorage.getItem("productosNuevos");
    if (productosLocales) {
      const nuevosProductos: Producto[] = JSON.parse(productosLocales);
      productos = [...productos, ...nuevosProductos];
    }

    // 5. Cálculos dinámicos
    const totalCategories = categorias.length;
    const totalProducts = productos.length;
    const totalOrders = pedidos.length;
    const activeProductsCount = productos.filter(p => p.estado === "disponible").length;

    const pendingCount = pedidos.filter((p: Pedido) => p.estado === 'pending').length;
    const processingCount = pedidos.filter((p: Pedido) => p.estado === 'processing').length;
    const completedCount = pedidos.filter((p: Pedido) => p.estado === 'completed').length;

    const totalEarningsValue = pedidos
      .filter((p: Pedido) => p.estado === 'completed' || p.estado === 'processing')
      .reduce((acc, p) => acc + p.total, 0);

    // 6. Inyección en el DOM
    if (txtCategories) txtCategories.textContent = totalCategories.toString();
    if (txtProducts) txtProducts.textContent = totalProducts.toString();
    if (txtOrders) txtOrders.textContent = totalOrders.toString();
    if (txtActiveProducts) txtActiveProducts.textContent = activeProductsCount.toString();

    if (txtEarnings) txtEarnings.textContent = `$${totalEarningsValue.toFixed(2)}`;
    if (txtPending) txtPending.textContent = pendingCount.toString();
    if (txtProcessing) txtProcessing.textContent = processingCount.toString();
    if (txtCompleted) txtCompleted.textContent = completedCount.toString();

  } catch (error) {
    console.error('Hubo un problema cargando los datos reales del Dashboard:', error);
    if (txtEarnings) txtEarnings.textContent = "$0.00";
  }

  // 7. Logout
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('usuarioLogueado');
      window.location.href = '../../auth/login/login.html';
    });
  }
});
