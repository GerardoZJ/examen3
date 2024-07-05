// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Profile from './components/Profile';
import { AuctionBody } from './components/auctions/Body';
import { NavComp } from './components/authentication/NavComp';
import Statistics from './components/Statistics'; // Importa el nuevo componente

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NavComp />
        <Routes>
          <Route path="/" element={<AuctionBody />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/statistics" element={<Statistics />} /> {/* Nueva ruta */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};
