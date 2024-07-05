import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();  // Obtener la función navigate para la navegación

  const goHome = () => {
    navigate('/');  // Suponiendo que '/' es tu ruta de inicio
  };

  if (!currentUser) {
    return <p>Cargando...</p>;
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: 'auto',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#007BFF', // Color de fondo azul
      color: '#ffffff', // Texto en blanco para mayor contraste
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ marginBottom: '20px' }}>Perfil de Usuario</h1>
      <p><strong>Correo electrónico:</strong> {currentUser.email}</p>
      <button onClick={goHome} style={{
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#004085', // Color del botón
        color: '#ffffff', // Color del texto en el botón
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>Regresar al Inicio</button>
      {/* Agrega más campos si es necesario */}
    </div>
  );
};

export default Profile;

