package com.tp.jpa.model;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Table(name = "productos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = {"categoria"})
@EqualsAndHashCode(callSuper = true)
public class Producto extends Base {

    @Column(nullable = false, unique = true)
    private String nombre;

    private String descripcion;

    @Column(nullable = false)
    private Double precio;

    @Column(nullable = false)
    private Integer stock;

    private String imagen; // Campo requerido por la consigna 2.1

    @Builder.Default
    private Boolean disponible = true;

    // Relación con Categoría
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
}
