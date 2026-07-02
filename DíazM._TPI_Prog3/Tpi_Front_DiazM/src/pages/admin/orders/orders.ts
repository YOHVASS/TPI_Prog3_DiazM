interface Pedido {
  id: number;
  cliente: string;
  fecha: string;
  productos: number;
  total: number;
  estado: "pending" | "processing" | "completed" | "cancelled";
}

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
}

document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("ordersTableBody") as HTMLTableSectionElement | null;
  const filtro = document.getElementById("filtroEstado") as HTMLSelectElement | null;
  const logoutButton = document.getElementById("logoutButton") as HTMLButtonElement | null;

  const PATH_ORDERS = "/data/pedidos.json";
  const PATH_USERS = "/data/usuarios.json";

  let pedidos: Pedido[] = [];

  function mapEstadoPedido(estado: string): "pending" | "processing" | "completed" | "cancelled" {
    switch (estado) {
      case "PENDIENTE": return "pending";
      case "EN_PREPARACION": return "processing";
      case "ENTREGADO": return "completed";
      case "CANCELADO": return "cancelled";
      default: return "pending";
    }
  }

  async function cargarPedidos() {
    try {
      const pedidosRaw = await (await fetch(PATH_ORDERS)).json();
      const usuarios: Usuario[] = await (await fetch(PATH_USERS)).json();

      pedidos = pedidosRaw.map((p: any) => {
        const usuario = usuarios.find((u: Usuario) => u.id === p.idUsuario);
        return {
          id: p.id,
          cliente: usuario ? `${usuario.nombre} ${usuario.apellido}` : "Desconocido",
          fecha: p.fecha,
          productos: p.detalles.length, // ✅ corregido
          total: p.total,
          estado: mapEstadoPedido(p.estado)
        };
      });

      renderPedidos();
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
      if (tbody) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Error al cargar pedidos.</td></tr>`;
      }
    }
  }

  function renderPedidos() {
    if (!tbody) return;
    const estadoFiltro = filtro?.value || "todos";
    const filtrados = estadoFiltro === "todos" ? pedidos : pedidos.filter(p => p.estado === estadoFiltro);

    tbody.innerHTML = filtrados.map(p => `
      <tr>
        <td>${p.id}</td>
        <td>${p.cliente}</td>
        <td>${p.fecha}</td>
        <td>${p.productos}</td>
        <td>${p.estado}</td>
        <td>$${p.total.toFixed(2)}</td>
      </tr>
    `).join('');
  }

  if (filtro) {
    filtro.addEventListener("change", renderPedidos);
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogueado");
      window.location.href = "../../auth/login/login.html";
    });
  }

  cargarPedidos();
});

