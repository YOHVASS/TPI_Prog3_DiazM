export type Rol = 'admin' | 'client';

export interface IUser {
  email: string;
  loggedIn: boolean;
  role: Rol;
}

export interface Product {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  subcategoria: string; 
  imagen: string;
  descripcion?: string; 
}

export interface CartItem extends Product {
  cantidad: number;
}