interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("categoriesTableBody") as HTMLTableSectionElement | null;
  const logoutButton = document.getElementById("logoutButton") as HTMLButtonElement | null;

  const PATH_CATEGORIES = "/data/categorias.json";
  let categorias: Categoria[] = [];

  // Cargar categorías desde JSON + localStorage
  async function cargarCategorias() {
    try {
      const res = await fetch(PATH_CATEGORIES);
      if (res.ok) {
        categorias = await res.json();
      }
    } catch {
      console.warn("No se pudo leer categorias.json, se usarán las locales.");
    }

    const locales = localStorage.getItem("categoriasNuevas");
    if (locales) {
      const extras: Categoria[] = JSON.parse(locales);
      categorias = [...categorias, ...extras];
    }

    renderCategorias();
  }

  // Renderizar tabla
  function renderCategorias() {
    if (!tbody) return;
    if (categorias.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-center">No hay categorías registradas.</td></tr>`;
      return;
    }

    tbody.innerHTML = categorias.map(cat => `
      <tr>
        <td>${cat.id}</td>
        <td>${cat.nombre}</td>
        <td>${cat.descripcion}</td>
        <td>
          <button class="btn-secondary" onclick="editarCategoria(${cat.id})">✏️ Editar</button>
        </td>
      </tr>
    `).join('');
  }

  // Editar categoría
  (window as any).editarCategoria = (id: number) => {
    const cat = categorias.find(c => c.id === id);
    if (!cat) return;

    const nuevoNombre = prompt("Editar nombre:", cat.nombre);
    const nuevaDescripcion = prompt("Editar descripción:", cat.descripcion);

    if (nuevoNombre && nuevaDescripcion) {
      cat.nombre = nuevoNombre;
      cat.descripcion = nuevaDescripcion;

      const actuales = localStorage.getItem("categoriasNuevas");
      let lista: Categoria[] = actuales ? JSON.parse(actuales) : [];
      lista = lista.map(c => c.id === id ? cat : c);
      localStorage.setItem("categoriasNuevas", JSON.stringify(lista));

      renderCategorias();
      alert("✏️ Categoría editada con éxito.");
    }
  };

  // Logout
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogueado");
      window.location.href = "../../auth/login/login.html";
    });
  }

  cargarCategorias();
});
