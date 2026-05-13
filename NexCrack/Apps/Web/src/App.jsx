import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import GameDetailPage from './pages/GameDetailPage.jsx';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SettingsPage from "./pages/SettingsPage";
import Conditions from "./pages/conditions.jsx"; 
import DMCA from "./pages/DMCA.jsx"; // Ajout de l'import DMCA
import { Toaster } from '@/components/ui/sonner';
import GamesPage from "./pages/GamesPage";

function App() {
  return (
    <Router>
      <Helmet>
        <title>NexCrack - Votre Plateforme de Jeux Ultime</title>
        <meta name="description" content="Découvrez, téléchargez et jouez à des milliers de jeux de tous genres sur NexCrack, votre plateforme de jeux ultime." />
      </Helmet>
      
      <ScrollToTop />
      
      <Routes>
        {/* Route principale */}
        <Route path="/" element={<HomePage />} />
        
        {/* Pages Légales */}
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/dmca" element={<DMCA />} />
        
        {/* Authentification et Profil */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* Détails des jeux */}
        <Route path="/game/:id" element={<GameDetailPage />} />
        <Route path="/games" element={<GamesPage />} />
      </Routes>

      <Toaster />
    </Router>
  );
}

export default App;