import type { Product } from "../types/product";

export const PRODUCTS: Product[] = [
    { id: 1, nombre: "Pizza Napolitana", precio: 8500, categoria: "Pizzas", subcategoria: "napolitana", imagen: "/img/napolitana.jpg", descripcion: "Salsa de tomate, mozzarella, tomate fresco y ajo." },
    { id: 2, nombre: "Pizza Mozzarella", precio: 7000, categoria: "Pizzas", subcategoria: "mozzarella", imagen: "/img/pizza.jpg", descripcion: "Clásica mozzarella artesanal." },
    { id: 3, nombre: "Hamburguesas", precio: 6500, categoria: "Hamburguesas", subcategoria: "carne", imagen: "/img/hamburguesa.jpg", descripcion: "Medallón vacuno premium." },
    { id: 4, nombre: "Hamburguesas", precio: 6800, categoria: "Hamburguesas", subcategoria: "vegana", imagen: "/img/vegana.jpg", descripcion: "Medallón de legumbres y vegetales." },
    { id: 7, nombre: "Empanadas de Pollo", precio: 9000, categoria: "Empanadas", subcategoria: "pollo", imagen: "/img/pollo.jpg", descripcion: "Docena de pollo cortado a cuchillo." },
    { id: 8, nombre: "Ensalada Caesar", precio: 5500, categoria: "Ensaladas", subcategoria: "pollo", imagen: "/img/ensalada.jpg", descripcion: "Pollo grillado, crutones y aderezo." },
    { id: 9, nombre: "Agua Mineral", precio: 1500, categoria: "Bebidas", subcategoria: "agua", imagen: "/img/agua.jpg", descripcion: "500ml natural." },
    { id: 10, nombre: "Gaseosa Cola", precio: 2200, categoria: "Bebidas", subcategoria: "cola", imagen: "/img/cola.jpg", descripcion: "Sabor original 500ml." },
    { id: 11, nombre: "Choripán", precio: 6800, categoria: "Choripán", subcategoria: "choripán", imagen: "/img/choripan.jpg", descripcion: "tipo Salchicha grande de carne con Salsa criolla(cebolla,morron, tomate) en pan." },
    { id: 12, nombre: "Licuado de Fruta", precio: 3200, categoria: "Bebidas", subcategoria: "licuado", imagen: "/img/Licuados.jpg", descripcion: "Fruta de estación con agua o leche." }
];

