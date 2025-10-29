import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage.jsx';
import RoleSelection from './components/RoleSelection.jsx';
import Login from './components/auth/Login.jsx';
import SignUp from './components/auth/SignUp.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import BuyerDashboard from './components/dashboard/buyer/BuyerDashboard.jsx';
import SellerDashboard from './components/dashboard/seller/SellerDashboard.jsx';

function App() {
  return (
    <div className="App">
      <Routes future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/buyer/*" element={<BuyerDashboard />} />
        <Route path="/seller/*" element={<SellerDashboard />} />
      </Routes>
    </div>
  );
}

export default App;