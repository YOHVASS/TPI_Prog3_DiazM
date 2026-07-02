document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addProductForm") as HTMLFormElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Capturamos valores
    const nombre = (document.getElementById("prodNombre") as HTMLInputElement).value.trim();
    const descripcion = (document.getElementById("prodDescripcion") as HTMLTextAreaElement).value.trim();
    const precio = parseFloat((document.getElementById("prodPrecio") as HTMLInputElement).value);
    const categoria = (document.getElementById("prodCategoria") as HTMLSelectElement).value;
    const stock = parseInt((document.getElementById("prodStock") as HTMLInputElement).value);
    const imagen = (document.getElementById("prodImagen") as HTMLInputElement).value.trim();

    // Validaciones según el práctico
    if (!nombre || !descripcion || !categoria) {
      alert("⚠ Todos los campos obligatorios deben estar completos.");
      return;
    }
    if (isNaN(precio) || precio <= 0) {
      alert("⚠ El precio debe ser mayor a 0.");
      return;
    }
    if (isNaN(stock) || stock < 0) {
      alert("⚠ El stock debe ser 0 o mayor.");
      return;
    }

    // Construimos el objeto producto
    const nuevoProducto = {
      id: Date.now(),
      nombre,
      descripcion,
      precio,
      categoria,
      stock,
      estado: "disponible",
      imagen: imagen || ""
    };

    // Recuperamos productos guardados previamente
    const actuales = JSON.parse(localStorage.getItem("productosNuevos") || "[]");
    actuales.push(nuevoProducto);

    // Guardamos lista actualizada en localStorage
    localStorage.setItem("productosNuevos", JSON.stringify(actuales));

    alert("🎉 ¡Producto registrado con éxito!");
    window.location.href = "./products.html"; // volver al listado
  });
});



