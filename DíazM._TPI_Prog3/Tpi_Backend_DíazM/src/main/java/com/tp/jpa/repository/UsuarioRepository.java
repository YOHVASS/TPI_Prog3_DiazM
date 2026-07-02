package com.tp.jpa.repository;

import com.tp.jpa.model.Usuario;
import com.tp.jpa.model.Pedido;
import com.tp.jpa.util.JPAUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import java.util.List;
import java.util.Optional;

public class UsuarioRepository extends BaseRepository<Usuario> {

    public UsuarioRepository() {
        super(Usuario.class);
    }

    /**
     * Busca un usuario activo por su email.
     * Retorna un Optional para manejar de forma segura si el usuario existe o no.
     */
    public Optional<Usuario> buscarPorMail(String mail) {
        EntityManager em = JPAUtil.getEntityManagerFactory().createEntityManager();
        try {
            String jpql = "SELECT u FROM Usuario u WHERE u.mail = :mail AND u.eliminado = false";
            Usuario usuario = em.createQuery(jpql, Usuario.class)
                    .setParameter("mail", mail)
                    .getSingleResult();
            return Optional.of(usuario);
        } catch (NoResultException e) {
            return Optional.empty();
        } finally {
            em.close();
        }
    }

    /**
     * Busca todos los pedidos asociados a un usuario específico.
     * Se utiliza JPQL tipado para garantizar seguridad en tiempo de compilación.
     *
     * @param usuarioId ID del usuario
     * @return Lista de pedidos vinculados a ese usuario
     */
    public List<Pedido> buscarPedidosPorUsuario(Long usuarioId) {
        EntityManager em = JPAUtil.getEntityManagerFactory().createEntityManager();
        try {
            String jpql = "SELECT p FROM Pedido p WHERE p.usuario.id = :usuarioId AND p.eliminado = false";
            TypedQuery<Pedido> query = em.createQuery(jpql, Pedido.class);
            query.setParameter("usuarioId", usuarioId);
            return query.getResultList();
        } finally {
            em.close();
        }
    }
}
