import type { IUser, Rol } from "../../../types/product";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const selectRol = document.getElementById("rol") as HTMLSelectElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  
  const valueEmail = inputEmail.value;
  const valueRol = selectRol.value as Rol;

  if (!valueEmail || !valueRol) {
    alert("Por favor, complete todos los campos antes de ingresar.");
    return;
  }

  const user: IUser = {
    email: valueEmail,
    role: valueRol,
    loggedIn: true,
  };

  // Guardar  sesión
  localStorage.setItem("userData", JSON.stringify(user));
  
  if (valueRol === "admin") {
    window.location.href = "../../admin/home/home.html"; 
  } else {
    
    window.location.href = "../../store/home/home.html";
  }
});