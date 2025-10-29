import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import MLInsights from './MLInsights';
import ProductGrid from '../ProductGrid';

// Mock data as fallback
const mockProducts = [
  {
    id: '1',
    title: 'Smartphone',
    description: 'Latest model smartphone with advanced features',
    price: 699.99,
    originalPrice: 799.99,
    category: 'electronics',
    condition: 'new',
    images: ['https://via.placeholder.com/300x200?text=Smartphone'],
    sellerId: 'current-seller',
    createdAt: new Date(),
    status: 'active'
  },
  {
    id: '2',
    title: 'Laptop',
    description: 'High-performance laptop for work and gaming',
    price: 1299.99,
    originalPrice: 1499.99,
    category: 'electronics',
    condition: 'new',
    images: ['https://via.placeholder.com/300x200?text=Laptop'],
    sellerId: 'current-seller',
    createdAt: new Date(),
    status: 'active'
  }
];

const mockNotifications = [
  {
    id: '1',
    title: 'New Order',
    message: 'You have a new order for Wireless Headphones',
    userId: 'seller1',
    createdAt: new Date(),
    read: false
  },
  {
    id: '2',
    title: 'Payment Received',
    message: 'Payment received for order #12345',
    userId: 'seller1',
    createdAt: new Date(),
    read: false
  }
];

const SellerDashboard = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data from localStorage
        const userId = localStorage.getItem('userId');
        const userEmail = localStorage.getItem('userEmail');
        
        if (!userId) {
          // If no user ID, redirect to login
          window.location.href = '/login';
          return;
        }
        
        // Set user data
        setUserData({
          id: userId,
          name: userEmail?.split('@')[0] || "Seller",
          email: userEmail,
          storeName: "My Store",
          memberSince: "2022-11-20"
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          // Use hardcoded API URL since process.env is not available in browser
          const apiUrl = 'http://localhost:3001/api';
          
          // Fetch seller's products from MongoDB API
          const response = await fetch(`${apiUrl}/products`);
          const data = await response.json();
          
          if (data.success && data.products) {
            // Filter products by seller ID
            const sellerProducts = data.products.filter(product => product.sellerId === userId);
            setProducts(sellerProducts);
            setUseMockData(false);
          } else {
            // Use mock data if API fails
            setProducts(mockProducts);
            setUseMockData(true);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to mock data
        setProducts(mockProducts);
        setUseMockData(true);
      }
    };

    const fetchNotifications = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          // Use hardcoded API URL since process.env is not available in browser
          const apiUrl = 'http://localhost:3001/api';
          
          // Fetch notifications from MongoDB API
          const response = await fetch(`${apiUrl}/notifications/${userId}`);
          const data = await response.json();
          
          if (data.success && data.notifications) {
            setNotifications(data.notifications);
          } else {
            // Use mock data if API fails
            setNotifications(mockNotifications);
          }
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        // Fallback to mock data
        setNotifications(mockNotifications);
      }
    };

    fetchUserData();
    fetchProducts();
    fetchNotifications();
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = async () => {
    try {
      // Clear user data from localStorage
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      localStorage.removeItem('token');
      window.location.href = '/';
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  if (loading) {
    return <div className="seller-dashboard">Loading...</div>;
  }

  return (
    <div className="seller-dashboard">
      <div className="sidebar">
        <h2>Seller Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="/seller" className={isActive('/seller')}>Home</Link></li>
            <li><Link to="/seller/products" className={isActive('/seller/products')}>Products</Link></li>
            <li><Link to="/seller/orders" className={isActive('/seller/orders')}>Orders</Link></li>
            <li><Link to="/seller/messages" className={isActive('/seller/messages')}>Messages</Link></li>
            <li><Link to="/seller/store" className={isActive('/seller/store')}>Store</Link></li>
            <li><Link to="/seller/promotions" className={isActive('/seller/promotions')}>Promotions</Link></li>
            <li><Link to="/seller/earnings" className={isActive('/seller/earnings')}>Earnings</Link></li>
            <li><Link to="/seller/analytics" className={isActive('/seller/analytics')}>Analytics</Link></li>
            <li><Link to="/seller/disputes" className={isActive('/seller/disputes')}>Disputes</Link></li>
            <li><Link to="/seller/notifications" className={isActive('/seller/notifications')}>Notifications</Link></li>
            <li><Link to="/seller/settings" className={isActive('/seller/settings')}>Settings</Link></li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="logout-button sidebar-logout">
          Logout
        </button>
      </div>
      
      <div className="main-content">
        {useMockData && (
          <div className="mock-data-warning">
            <p>⚠️ Using mock data. Data will not be saved.</p>
          </div>
        )}
        
        <Routes>
          <Route path="/" element={<SellerHome userData={userData} products={products} notifications={notifications} />} />
          <Route path="/products" element={<SellerProducts products={products} setProducts={setProducts} useMockData={useMockData} />} />
          <Route path="/orders" element={<SellerOrders />} />
          <Route path="/messages" element={<SellerMessages />} />
          <Route path="/store" element={<SellerStore />} />
          <Route path="/promotions" element={<SellerPromotions />} />
          <Route path="/earnings" element={<SellerEarnings />} />
          <Route path="/analytics" element={<SellerAnalytics />} />
          <Route path="/disputes" element={<SellerDisputes />} />
          <Route path="/notifications" element={<SellerNotifications notifications={notifications} />} />
          <Route path="/settings" element={<SellerSettings />} />
        </Routes>
      </div>
    </div>
  );
};

const SellerHome = ({ userData, products, notifications }) => (
  <div>
    <div className="dashboard-summary">
      <div className="summary-card">
        <h3>Welcome back, {userData?.name}!</h3>
        <p><strong>Store:</strong> {userData?.storeName}</p>
        <p><strong>Member since:</strong> {userData?.memberSince}</p>
        <div style={{ marginTop: '1rem' }}>
          <Link to="/seller/store" className="btn btn-primary">Manage Store</Link>
        </div>
      </div>
      
      <div className="summary-card">
        <h3>Your Products</h3>
        <p><strong>Total Products:</strong> {products.length}</p>
        <p><strong>Active Products:</strong> {products.filter(p => p.status === 'active').length}</p>
        <Link to="/seller/products" className="btn btn-primary">Manage Products</Link>
      </div>
      
      <div className="summary-card">
        <h3>Recent Notifications</h3>
        {notifications.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {notifications.slice(0, 3).map(notification => (
              <li key={notification.id} style={{ marginBottom: '0.5rem', padding: '0.5rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <strong>{notification.title}</strong>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>{notification.message}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No new notifications</p>
        )}
        <Link to="/seller/notifications" className="btn btn-secondary">View All</Link>
      </div>
    </div>
    
    <div className="card">
      <div className="card-header">
        <h3>Recently Added Products</h3>
      </div>
      <ProductGrid products={products.slice(0, 4)} userType="seller" />
    </div>
    
    {/* ML Insights Section */}
    <MLInsights products={products} />
  </div>
);

const SellerProducts = ({ products, setProducts, useMockData }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    subcategory: '',
    condition: 'new',
    images: [],
    specifications: {}, // This should be an object, not a string
    location: {}, // This should be an object, not a string
    tags: []
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      if (useMockData) {
        alert('Cannot save product in mock mode. Please configure MongoDB to save data.');
        setUploading(false);
        return;
      }
      
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token'); // Get token from localStorage
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', newProduct.title);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('originalPrice', newProduct.originalPrice);
      formData.append('category', newProduct.category);
      formData.append('subcategory', newProduct.subcategory);
      formData.append('condition', newProduct.condition);
      
      // Handle specifications - only append if it's a valid object
      if (newProduct.specifications && Object.keys(newProduct.specifications).length > 0) {
        formData.append('specifications', JSON.stringify(newProduct.specifications));
      }
      
      formData.append('sellerId', userId);
      
      // Handle location - only append if it's a valid object
      if (newProduct.location && Object.keys(newProduct.location).length > 0) {
        formData.append('location', JSON.stringify(newProduct.location));
      }
      
      // Handle tags - only append if there are tags
      if (newProduct.tags && newProduct.tags.length > 0) {
        formData.append('tags', newProduct.tags.join(','));
      }
      
      // Append image files
      for (let i = 0; i < imageFiles.length; i++) {
        formData.append('images', imageFiles[i]);
      }
      
      // Log FormData for debugging
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      // Send to MongoDB API (using hardcoded URL)
      const apiUrl = 'http://localhost:3001/api';
      const response = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}` // Add authentication token
        }
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const result = await response.json();
      console.log('Response data:', result);
      
      if (response.ok && result.success) {
        // Update local state
        setProducts(prev => [...prev, result.product]);
        
        // Reset form
        setNewProduct({
          title: '',
          description: '',
          price: '',
          originalPrice: '',
          category: '',
          subcategory: '',
          condition: 'new',
          images: [],
          specifications: {},
          location: {},
          tags: []
        });
        setImageFiles([]);
        setShowAddForm(false);
        
        alert('Product added successfully!');
      } else {
        const errorMessage = result.message || 'Unknown error occurred';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert('Error adding product: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="products-header">
        <h2>Manage Products</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>
      
      {showAddForm && (
        <div className="add-product-form">
          <h3>Add New Product</h3>
          <form onSubmit={handleAddProduct}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newProduct.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="originalPrice">Original Price ($)</label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={newProduct.originalPrice}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subcategory">Subcategory</label>
                <input
                  type="text"
                  id="subcategory"
                  name="subcategory"
                  value={newProduct.subcategory}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="condition">Condition</label>
              <select
                id="condition"
                name="condition"
                value={newProduct.condition}
                onChange={handleInputChange}
                required
              >
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="images">Product Images</label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleImageChange}
                multiple
                accept="image/*"
              />
              <small>Upload up to 5 images</small>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={uploading}
            >
              {uploading ? 'Adding Product...' : 'Add Product'}
            </button>
          </form>
        </div>
      )}
      
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="product-card">
      <div className="product-image">
        {product.images && product.images.length > 0 && !imageError ? (
          <img 
            src={`http://localhost:3001${product.images[0]}`} 
            alt={product.title}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="placeholder-image">
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          <span className="current-price">${product.price}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>
        <div className="product-meta">
          <span className="condition">{product.condition}</span>
          <span className="category">{product.category}</span>
        </div>
        <div className="product-actions">
          <button className="btn btn-secondary">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
};

const SellerOrders = () => (
  <div>
    <h2>Orders</h2>
    <p>Order management will be displayed here.</p>
  </div>
);

const SellerMessages = () => (
  <div>
    <h2>Messages</h2>
    <p>Message system will be displayed here.</p>
  </div>
);

const SellerStore = () => (
  <div>
    <h2>Store Profile</h2>
    <p>Store profile management will be displayed here.</p>
  </div>
);

const SellerPromotions = () => (
  <div>
    <h2>Promotions</h2>
    <p>Promotion management will be displayed here.</p>
  </div>
);

const SellerEarnings = () => (
  <div>
    <h2>Earnings</h2>
    <p>Earnings tracking will be displayed here.</p>
  </div>
);

const SellerAnalytics = () => (
  <div>
    <h2>Analytics</h2>
    <p>Analytics dashboard will be displayed here.</p>
  </div>
);

const SellerDisputes = () => (
  <div>
    <h2>Disputes</h2>
    <p>Dispute management will be displayed here.</p>
  </div>
);

const SellerNotifications = ({ notifications }) => (
  <div>
    <h2>Notifications</h2>
    {notifications.length > 0 ? (
      <ul className="notifications-list">
        {notifications.map(notification => (
          <li key={notification.id} className="notification-item">
            <h4>{notification.title}</h4>
            <p>{notification.message}</p>
            <small>{new Date(notification.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    ) : (
      <p>No notifications</p>
    )}
  </div>
);

const SellerSettings = () => (
  <div>
    <h2>Settings</h2>
    <p>Settings will be displayed here.</p>
  </div>
);

export default SellerDashboard;