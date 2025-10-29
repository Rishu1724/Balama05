import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const selectRole = (role) => {
    if (role === 'buyer') {
      navigate('/signup');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="role-selection">
      <h2>Select Your Role</h2>
      <p>Choose how you want to use Balama Marketplace</p>
      
      <div className="role-options">
        <div className="role-card" onClick={() => selectRole('buyer')}>
          <h3>Buyer</h3>
          <p>Browse and purchase products from sellers</p>
        </div>
        
        <div className="role-card" onClick={() => selectRole('seller')}>
          <h3>Seller</h3>
          <p>List and sell your products to buyers</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;