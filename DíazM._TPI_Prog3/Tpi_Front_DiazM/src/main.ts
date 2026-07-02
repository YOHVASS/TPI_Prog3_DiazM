import './style.css';
import type { IUser } from './types/product';

console.log('FoodStore cargado correctamente');

// Seleccionamos el botón de "Ingresar al Catálogo"
const btnLibre = document.getElementById("btn-libre");

// "Ingreso Libre"
btnLibre?.addEventListener("click", () => {

    // 1. Creamos un usuario de tipo "Invitado"
    const guestUser: IUser = {
        email: "invitado@foodstore.com",
        role: "client", // Entra con rol de cliente
        loggedIn: true
    };

    // 2. Lo guardamos en el LocalStorage
    // Esto hace que "ambas entradas sean iguales" para la aplicación
    localStorage.setItem("userData", JSON.stringify(guestUser));

    // 3.ir al catálogo
    console.log('Ingresando como invitado...');
});