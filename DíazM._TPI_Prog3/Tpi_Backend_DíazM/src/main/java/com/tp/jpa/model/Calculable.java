package com.tp.jpa.model;

public interface Calculable {
     /**
      * Calcula el total del objeto basándose en sus componentes internos
      * y actualiza su estado (campo total).
      */
     void calcularTotal();
}