package com.tp.jpa.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "categorias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = {"productos"})
@EqualsAndHashCode(callSuper = true)
public class Categoria extends Base {

    @Column(nullable = false, unique = true)
    private String nombre;

    private String descripcion;

    // Relación unidireccional: Categoria conoce a sus Productos
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    private Set<Producto> productos = new HashSet<>();
}
