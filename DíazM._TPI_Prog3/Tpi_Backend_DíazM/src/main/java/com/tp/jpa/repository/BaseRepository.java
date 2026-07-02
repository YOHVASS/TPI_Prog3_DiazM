package com.tp.jpa.repository;

import com.tp.jpa.model.Base;
import com.tp.jpa.util.JPAUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.TypedQuery;
import java.util.List;
import java.util.Optional;

import com.tp.jpa.model.Usuario;
import com.tp.jpa.model.Pedido;
import com.tp.jpa.model.Producto;

public abstract class BaseRepository<T extends Base> {

    private final Class<T> classType;

    public BaseRepository(Class<T> classType) {
        this.classType = classType;
    }

    // ✅ Alta con persist() si id es null, actualización con merge() si ya existe
    public T guardar(T entity) {
        EntityManager em = JPAUtil.getEntityManagerFactory().createEntityManager();
        EntityTransaction tx = em.getTransaction();
        try {
            tx.begin();
            if (entity.getId() == null) {
                em.persist(entity); // Alta
            } else {
                entity = em.merge(entity); // Actualización
            }
            tx.commit();
            return entity;
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        } finally {
            em.close();
        }
    }

    // ✅ Retorna Optional<T>
    public Optional<T> buscarPorId(Long id) {
        EntityManager em = JPAUtil.getEntityManagerFactory().createEntityManager();
        try {
            T entity = em.find(classType, id);
            return Optional.ofNullable(entity);
        } finally {
            em.close();
        }
    }

    // ✅ JPQL con eliminado = false
    public List<T> listarActivos() {
        EntityManager em = JPAUtil.getEntityManagerFactory().createEntityManager();
        try {
            String jpql = "SELECT e FROM " + classType.getSimpleName() + " e WHERE e.eliminado = false";
            TypedQuery<T> query = em.createQuery(jpql, classType);
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    // ✅ Baja lógica con merge()
    public boolean eliminarLogico(Long id) {
        EntityManager em = JPAUtil.getEntityManagerFactory().createEntityManager();
        EntityTransaction tx = em.getTransaction();
        try {
            T entity = em.find(classType, id);
            if (entity == null) return false;
            tx.begin();
            entity.setEliminado(true);
            em.merge(entity);
            tx.commit();
            return true;
        } catch (Exception e) {
            if (tx.isActive()) tx.rollback();
            throw e;
        } finally {
            em.close();
        }
    }
}
