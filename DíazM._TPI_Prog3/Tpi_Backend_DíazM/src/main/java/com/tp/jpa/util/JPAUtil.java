package com.tp.jpa.util;

import jakarta.persistence.*;   // <-- corregido
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class JPAUtil {

    // Debe coincidir con el name en persistence.xml
    private static final String PERSISTENCE_UNIT_NAME = "PERSISTENCE_UNIT";
    private static final EntityManagerFactory emf =
            Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);

    public static EntityManagerFactory getEntityManagerFactory() {
        return emf;
    }

    public static void close() {
        if (emf != null && emf.isOpen()) {
            emf.close();
        }
    }
}
