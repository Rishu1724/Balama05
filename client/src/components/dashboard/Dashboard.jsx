import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Get user role from localStorage
        const role = localStorage.getItem('userRole') || 'buyer';
        setUserRole(role);
        setLoading(false);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (userRole) {
      // Redirect to the appropriate dashboard based on user role
      if (userRole === 'seller') {
        navigate('/seller');
      } else {
        navigate('/buyer');
      }
    }
  }, [userRole, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear user data from localStorage
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>
      
      <div className="dashboard-content">
        <p>Welcome to your dashboard!</p>
        <nav>
          <ul>
            <li><a href="/seller">Seller Dashboard</a></li>
            <li><a href="/buyer">Buyer Dashboard</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;