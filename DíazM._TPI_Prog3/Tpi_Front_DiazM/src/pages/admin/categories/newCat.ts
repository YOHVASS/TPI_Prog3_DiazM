document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addCategoryForm") as HTMLFormElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = (document.getElementById("catNombre") as HTMLInputElement).value.trim();

    if (!nombre) {
      alert("⚠ Debes ingresar un nombre de categoría.");
      return;
    }

    const nuevaCategoria = {
      id: Date.now(),
      nombre
    };

    const actuales = JSON.parse(localStorage.getItem("categoriasNuevas") || "[]");
    actuales.push(nuevaCategoria);

    localStorage.setItem("categoriasNuevas", JSON.stringify(actuales));

    alert("🎉 ¡Categoría registrada con éxito!");
    window.location.href = "./categories.html";
  });
});
