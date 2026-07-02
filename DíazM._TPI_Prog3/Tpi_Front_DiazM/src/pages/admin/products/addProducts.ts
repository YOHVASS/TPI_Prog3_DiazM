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
  imagen?: string;
}

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("addProductForm") as HTMLFormElement | null;
  const selectCategoria = document.getElementById("prodCategoria") as HTMLSelectElement | null;

  const PATH_CATEGORIES = "/data/categorias.json";
  const PATH_PRODUCTS = "/data/productos.json";

  // 1. Cargar categorías en el <select>
  if (selectCategoria) {
    try {
      const res = await fetch(PATH_CATEGORIES);
      if (res.ok) {
        const categorias: Categoria[] = await res.json();
        categorias.forEach(cat => {
          const option = document.createElement("option");
          option.value = cat.nombre;
          option.textContent = cat.nombre;
          selectCategoria.appendChild(option);
        });
      }
    } catch {
      console.warn("No se pudieron cargar las categorías, usando opciones por defecto.");
      ["Hamburguesas", "Pizzas", "Empanadas", "Bebidas"].forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        selectCategoria.appendChild(option);
      });
    }
  }

  // 2. Procesar el alta de producto
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombre = (document.getElementById("prodNombre") as HTMLInputElement).value;
      const descripcion = (document.getElementById("prodDescripcion") as HTMLTextAreaElement).value;
      const precio = parseFloat((document.getElementById("prodPrecio") as HTMLInputElement).value);
      const stock = parseInt((document.getElementById("prodStock") as HTMLInputElement).value);
      const categoria = (document.getElementById("prodCategoria") as HTMLSelectElement).value;
      const imagenUrl = (document.getElementById("prodImagen") as HTMLInputElement).value;

      if (!nombre || !descripcion || !categoria) {
        alert("Completa todos los campos obligatorios.");
        return;
      }
      if (precio <= 0 || stock < 0) {
        alert("El precio debe ser mayor a 0 y el stock no puede ser negativo.");
        return;
      }

      let productosLista: Producto[] = [];
      try {
        const res = await fetch(PATH_PRODUCTS);
        if (res.ok) {
          productosLista = await res.json();
        }
      } catch {
        console.warn("No se pudo acceder a productos.json, se calculará el ID de forma local.");
      }

      const productosLocales = localStorage.getItem("productosNuevos");
      if (productosLocales) {
        const extra: Producto[] = JSON.parse(productosLocales);
        productosLista = [...productosLista, ...extra];
      }

      const nuevoId = productosLista.length > 0
        ? Math.max(...productosLista.map(p => p.id)) + 1
        : Math.floor(Math.random() * 1000) + 20;

      const nuevoProducto: Producto = {
        id: nuevoId,
        nombre,
        descripcion,
        precio,
        categoria,
        stock,
        estado: stock > 0 ? "disponible" : "no disponible",
        imagen: imagenUrl || undefined
      };

      const actualesNuevos: Producto[] = productosLocales ? JSON.parse(productosLocales) : [];
      actualesNuevos.push(nuevoProducto);
      localStorage.setItem("productosNuevos", JSON.stringify(actualesNuevos));

      alert("🎉 ¡Producto registrado con éxito!");
      window.location.href = "../products/products.html"; // ✅ ruta corregida
    });
  }
});
