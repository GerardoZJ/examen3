import { useState, useEffect } from 'react';
import { firestoreApp } from '../config/firebase'; // Importa la instancia de Firestore

export const useUserData = (userId) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const docRef = firestoreApp.doc(`usuarios/${userId}`);

    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        setUserData(doc.data());
        setLoading(false);
      } else {
        setUserData(null);
        setLoading(false);
      }
    }, (error) => {
      console.error("Error al obtener datos del usuario:", error);
      setLoading(false);
    });

    // Cleanup
    return () => unsubscribe();
  }, [userId]);

  return { userData, loading };
};
