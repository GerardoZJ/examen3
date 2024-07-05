// src/components/authentication/NavComp.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import { AuthContext } from '../../context/AuthContext';
import { LoginComp } from './LoginComp';
import { RegisterComp } from './RegisterComp';

export const NavComp = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const goToHome = () => navigate('/');
  const goToProfile = () => navigate('/profile');
  const goToStatistics = () => navigate('/statistics');

  return (
    <nav className="container navbar sticky-top navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">
          <img src={logoImg} alt="logo" height="75" />
        </div>
        <div className="d-flex">
          <div className="col">
            <div
              onClick={goToHome}
              className="btn btn-outline-primary mx-2"
            >
              Inicio
            </div>
            {currentUser ? (
              <>
                <div className="btn btn-outline-secondary mx-2 disabled">
                  {currentUser.email}
                </div>
                <div
                  onClick={() => logout()}
                  className="btn btn-outline-secondary mx-2"
                >
                  Cerrar Sesión
                </div>
                <div
                  onClick={goToProfile}
                  className="btn btn-outline-primary mx-2"
                >
                  Perfil
                </div>
                <div
                  onClick={goToStatistics}
                  className="btn btn-outline-primary mx-2"
                >
                  Estadísticas
                </div>
              </>
            ) : (
              <>
                <LoginComp />
                <RegisterComp />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
