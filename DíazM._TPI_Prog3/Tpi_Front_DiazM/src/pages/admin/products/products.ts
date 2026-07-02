interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  stock: number;
  estado: "disponible" | "no disponible";
  imagen?: string;
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Gestión de Productos cargada con éxito.");

  const tbody = document.getElementById("productsTableBody") as HTMLTableSectionElement | null;
  const logoutButton = document.getElementById("logoutButton") as HTMLButtonElement | null;

  const PATH_PRODUCTS = "/data/productos.json";
  const PATH_CATEGORIES = "/data/categorias.json";

  if (tbody) {
    try {
      // 1. Traemos productos base
      const resProds = await fetch(PATH_PRODUCTS);
      if (!resProds.ok) throw new Error("No se pudo leer productos.json");
      let productos: Producto[] = await resProds.json();

      // 2. Normalizamos estado y categoría
      const resCats = await fetch(PATH_CATEGORIES);
      const categorias = resCats.ok ? await resCats.json() : [];

      productos = productos.map((p: any) => ({
        ...p,
        estado: p.disponible ? "disponible" : "no disponible",
        categoria: categorias.find((c: any) => c.id === p.categoriaId)?.nombre || "Sin categoría"
      }));

      // 3. Unimos con productos nuevos del LocalStorage
      const productosLocales = localStorage.getItem("productosNuevos");
      if (productosLocales) {
        const extras: Producto[] = JSON.parse(productosLocales);
        productos = [...productos, ...extras];
      }

      // 4. Renderizamos en la tabla
      tbody.innerHTML = productos.map(p => `
        <tr>
          <td>${p.id}</td>
          <td>${p.imagen ? `<img src="${p.imagen}" width="50">` : "-"}</td>
          <td>${p.nombre}</td>
          <td>${p.descripcion}</td>
          <td>$${p.precio.toFixed(2)}</td>
          <td>${p.categoria}</td>
          <td>${p.stock}</td>
          <td>${p.estado}</td>
        </tr>
      `).join('');

    } catch (error) {
      console.error("Error al cargar productos:", error);
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center text-danger">
            ⚠ Error al cargar productos. Verifica la ruta o el servidor.
          </td>
        </tr>
      `;
    }
  }

  // 5. Logout
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogueado");
      window.location.href = "../../auth/login/login.html";
    });
  }
});
