import { createContext, useContext, useState, useEffect } from 'react';
import { authApp } from '../config/firebase'; // Importa la instancia de auth desde tu archivo de configuración de Firebase

// Crear un contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación que encapsula a los hijos
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authApp.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
