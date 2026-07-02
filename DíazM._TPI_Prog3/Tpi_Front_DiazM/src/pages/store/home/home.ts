import '../../../style.css';
import { PRODUCTS } from "../../../data/data";
import type { Product, CartItem, IUser } from "../../../types/product";

const productsGrid = document.getElementById("products-grid") as HTMLDivElement;
const searchInput = document.getElementById("product-search") as HTMLInputElement;
const welcomeMsg = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

// --- 1. Verificación de Seguridad y Sesión ---
function checkSession() {
    const userData = localStorage.getItem("userData");

    if (!userData) {
        window.location.href = "/index.html";
        return null;
    }
    
    const user: IUser = JSON.parse(userData);
    
    if (welcomeMsg) {
        welcomeMsg.innerText = `Bienvenido, ${user.email}`;
    }
    return user;
}

// --- 2. Funciones de Carrito ---
function getCart(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId: number) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.cantidad += 1;
    } else {
        cart.push({ ...product, cantidad: 1 });
    }

    saveCart(cart);
    showToast(`${product.nombre} agregado`);
}

// --- 3. Renderizado y UI ---
function renderProducts(items: Product[]) {
    if (!productsGrid) return;
    productsGrid.innerHTML = "";

    if (items.length === 0) {
        productsGrid.innerHTML = `<p class="empty-message">No se encontraron productos.</p>`;
        return;
    }

    items.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}" class="product-img">
            <h3>${product.nombre}</h3>
            <p class="price">$${product.precio.toLocaleString('es-AR')}</p>
            <button class="btn-add" data-id="${product.id}">Agregar</button>
        `;
        productsGrid.appendChild(card);
    });
}

function showToast(message: string) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>✓</span> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => toast.remove(), 350);
    }, 2000);
}

// --- 4. Eventos ---
function setupEventListeners() {
    // Botón Salir
    btnLogout?.addEventListener("click", () => {
        localStorage.removeItem("userData");
        window.location.href = "/index.html";
    });

    // Agregar al carrito
    productsGrid?.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("btn-add")) {
            const id = Number(target.getAttribute("data-id"));
            addToCart(id);
        }
    });

    // --- NUEVO: Filtros de Categoría  ---
    const categoryItems = document.querySelectorAll("#category-list li");
    categoryItems.forEach(item => {
        item.addEventListener("click", () => {
            const category = item.getAttribute("data-category");

            // Cambiar clase activa visualmente
            categoryItems.forEach(li => li.classList.remove("active"));
            item.classList.add("active");

            // Filtrar productos
            const filtered = category === "todos" 
                ? PRODUCTS 
                : PRODUCTS.filter(p => p.categoria === category);
            
            renderProducts(filtered);
        });
    });

    // Buscador
    searchInput?.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = PRODUCTS.filter(p => 
            p.nombre.toLowerCase().includes(query) || 
            p.categoria.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });
}

// --- 5. Inicialización ---
document.addEventListener("DOMContentLoaded", () => {
    const sessionActive = checkSession();
    
    if (sessionActive) {
        renderProducts(PRODUCTS);
        setupEventListeners();
    }
});