// src/pages/store/cart/cart.ts
import '../../../style.css';
import type { CartItem } from "../../../types/product";

const cartContainer = document.getElementById("cart-items") as HTMLTableSectionElement;
const totalDisplay = document.getElementById("cart-total") as HTMLElement;
const btnEmpty = document.getElementById("btn-empty") as HTMLButtonElement;
const btnFinish = document.getElementById("btn-finish") as HTMLButtonElement;

// Modales
const modalSuccess = document.getElementById("modal-success") as HTMLDivElement;
const btnModalOk = document.getElementById("btn-modal-ok") as HTMLButtonElement;
const modalConfirm = document.getElementById("modal-confirm") as HTMLDivElement;
const btnConfirmYes = document.getElementById("btn-confirm-yes") as HTMLButtonElement;
const btnConfirmNo = document.getElementById("btn-confirm-no") as HTMLButtonElement;

function renderCart() {
    let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cartContainer || !totalDisplay) return;
    cartContainer.innerHTML = "";
    let totalAcumulado = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<tr><td colspan="5" class="empty-message">Tu carrito está vacío.</td></tr>`;
        totalDisplay.innerText = "$ 0";
        return;
    }

    cart.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalAcumulado += subtotal;
        
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.nombre}</td>
            <td>$${item.precio.toLocaleString('es-AR')}</td>
            <td class="cantidad-cell">
                <div class="cantidad-control">
                    <button class="btn-cantidad btn-menos" data-id="${item.id}">-</button>
                    <span class="cantidad-valor">${item.cantidad}</span>
                    <button class="btn-cantidad btn-mas" data-id="${item.id}">+</button>
                </div>
            </td>
            <td>$${subtotal.toLocaleString('es-AR')}</td>
            <td>
                <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
            </td>
        `;
        cartContainer.appendChild(tr);
    });

    totalDisplay.innerText = `$ ${totalAcumulado.toLocaleString('es-AR')}`;
    asignarEventosBotones(); // Activamos los clics de los nuevos botones
}

// Nueva función para manejar el cambio de cantidades
function asignarEventosBotones() {
    const botonesMas = document.querySelectorAll('.btn-mas');
    const botonesMenos = document.querySelectorAll('.btn-menos');
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');

    botonesMas.forEach(boton => {
        boton.addEventListener('click', () => cambiarCantidad(boton.getAttribute('data-id'), 1));
    });

    botonesMenos.forEach(boton => {
        boton.addEventListener('click', () => cambiarCantidad(boton.getAttribute('data-id'), -1));
    });

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', () => eliminarProducto(boton.getAttribute('data-id')));
    });
}

function cambiarCantidad(id: string | null, cambio: number) {
    if (!id) return;
    let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    
    const producto = cart.find(item => item.id.toString() === id);
    if (producto) {
        producto.cantidad += cambio;
        
        // Si la cantidad llega a 0, lo eliminamos
        if (producto.cantidad <= 0) {
            cart = cart.filter(item => item.id.toString() !== id);
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

function eliminarProducto(id: string | null) {
    if (!id) return;
    let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter(item => item.id.toString() !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Vaciar Carrito 
btnEmpty?.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length > 0) {
        modalConfirm.style.display = "flex";
    }
});

btnConfirmYes?.addEventListener("click", () => {
    localStorage.removeItem("cart");
    renderCart();
    modalConfirm.style.display = "none";
});

btnConfirmNo?.addEventListener("click", () => {
    modalConfirm.style.display = "none";
});

// Finalizar Compra
btnFinish?.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) return;
    
    localStorage.removeItem("cart");
    renderCart();
    modalSuccess.style.display = "flex";
});

btnModalOk?.addEventListener("click", () => {
    modalSuccess.style.display = "none";
    window.location.href = "../home/home.html";
});

document.addEventListener("DOMContentLoaded", renderCart);