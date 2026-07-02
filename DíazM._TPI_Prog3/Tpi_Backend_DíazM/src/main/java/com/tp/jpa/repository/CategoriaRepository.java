package com.tp.jpa.repository;

import com.tp.jpa.model.Usuario;
import com.tp.jpa.model.Pedido;
import com.tp.jpa.model.Producto;
import com.tp.jpa.model.Categoria;
import com.tp.jpa.model.Producto;

import com.tp.jpa.util.JPAUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import java.util.List;

public class CategoriaRepository extends BaseRepository<Categoria> {

    public CategoriaRepository() {
        super(Categoria.class);
    }

    /**
     * Busca todos los productos asociados a una categoría específica.
     * Se utiliza JPQL tipado para garantizar seguridad en tiempo de compilación.
     *
     * @param categoriaId ID de la categoría
     * @return Lista de productos vinculados a esa categoría
     */
    public List<Producto> buscarProductosPorCategoria(Long categoriaId) {
        EntityManager em = JPAUtil.getEntityManagerFactory().createEntityManager();
        try {
            String jpql = "SELECT p FROM Producto p WHERE p.categoria.id = :categoriaId AND p.eliminado = false";
            TypedQuery<Producto> query = em.createQuery(jpql, Producto.class);
            query.setParameter("categoriaId", categoriaId);
            return query.getResultList();
        } finally {
            em.close();
        }
    }
}
