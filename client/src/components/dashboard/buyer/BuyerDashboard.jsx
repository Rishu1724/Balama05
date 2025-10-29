import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import MLRecommendations from './MLRecommendations';
import ProductGrid from '../ProductGrid';

// Mock data as fallback
const mockProducts = [
  {
    id: '1',
    title: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 129.99,
    originalPrice: 149.99,
    category: 'electronics',
    condition: 'new',
    images: ['https://via.placeholder.com/300x200?text=Headphones'],
    sellerId: 'seller1',
    createdAt: new Date(),
    status: 'active'
  },
  {
    id: '2',
    title: 'Smart Watch',
    description: 'Feature-rich smartwatch with health monitoring',
    price: 199.99,
    originalPrice: 249.99,
    category: 'electronics',
    condition: 'new',
    images: ['https://via.placeholder.com/300x200?text=Smart+Watch'],
    sellerId: 'seller2',
    createdAt: new Date(),
    status: 'active'
  },
  {
    id: '3',
    title: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with excellent sound quality',
    price: 79.99,
    originalPrice: 99.99,
    category: 'electronics',
    condition: 'used',
    images: ['https://via.placeholder.com/300x200?text=Speaker'],
    sellerId: 'seller1',
    createdAt: new Date(),
    status: 'active'
  }
];

const mockNotifications = [
  {
    id: '1',
    title: 'New Message',
    message: 'You have a new message from seller',
    userId: 'buyer1',
    createdAt: new Date(),
    read: false
  },
  {
    id: '2',
    title: 'Order Shipped',
    message: 'Your order #12345 has been shipped',
    userId: 'buyer1',
    createdAt: new Date(),
    read: false
  }
];

const BuyerDashboard = () => {
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
        
        setUserData({
          id: userId,
          name: userEmail?.split('@')[0] || "Buyer",
          email: userEmail,
          memberSince: "2023-01-15"
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        // Use hardcoded API URL since process.env is not available in browser
        const apiUrl = 'http://localhost:3001/api';
        
        // Fetch from MongoDB API
        const response = await fetch(`${apiUrl}/products`);
        const data = await response.json();
        
        if (data.success && data.products) {
          setProducts(data.products);
          setUseMockData(false);
        } else {
          // Fallback to mock data
          setProducts(mockProducts);
          setUseMockData(true);
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
            // Fallback to mock data
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
    return <div className="buyer-dashboard">Loading...</div>;
  }

  return (
    <div className="buyer-dashboard">
      <div className="sidebar">
        <h2>Buyer Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="/buyer" className={isActive('/buyer')}>Home</Link></li>
            <li><Link to="/buyer/products" className={isActive('/buyer/products')}>Products</Link></li>
            <li><Link to="/buyer/orders" className={isActive('/buyer/orders')}>My Orders</Link></li>
            <li><Link to="/buyer/wishlist" className={isActive('/buyer/wishlist')}>Wishlist</Link></li>
            <li><Link to="/buyer/messages" className={isActive('/buyer/messages')}>Messages</Link></li>
            <li><Link to="/buyer/profile" className={isActive('/buyer/profile')}>Profile</Link></li>
            <li><Link to="/buyer/notifications" className={isActive('/buyer/notifications')}>Notifications</Link></li>
            <li><Link to="/buyer/settings" className={isActive('/buyer/settings')}>Settings</Link></li>
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
          <Route path="/" element={<BuyerHome userData={userData} products={products} notifications={notifications} />} />
          <Route path="/products" element={<ProductList products={products} />} />
          <Route path="/products/:productId" element={<ProductDetailRoute />} />
          <Route path="/orders" element={<BuyerOrders />} />
          <Route path="/wishlist" element={<BuyerWishlist />} />
          <Route path="/messages" element={<BuyerMessages />} />
          <Route path="/profile" element={<BuyerProfile userData={userData} />} />
          <Route path="/notifications" element={<BuyerNotifications notifications={notifications} />} />
          <Route path="/settings" element={<BuyerSettings />} />
        </Routes>
      </div>
    </div>
  );
};

// Buyer Home Component
const BuyerHome = ({ userData, products, notifications }) => (
  <div>
    <div className="dashboard-summary">
      <div className="summary-card">
        <h3>Welcome back, {userData?.name}!</h3>
        <p><strong>Email:</strong> {userData?.email}</p>
        <p><strong>Member since:</strong> {userData?.memberSince}</p>
        <div style={{ marginTop: '1rem' }}>
          <Link to="/buyer/profile" className="btn btn-primary">View Profile</Link>
        </div>
      </div>
      
      <div className="summary-card">
        <h3>Marketplace Overview</h3>
        <p><strong>Total Products:</strong> {products.length}</p>
        <p><strong>Categories:</strong> {new Set(products.map(p => p.category)).size}</p>
        <Link to="/buyer/products" className="btn btn-primary">Browse Products</Link>
      </div>
      
      <div className="summary-card">
        <h3>Recent Activity</h3>
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
          <p>No recent activity</p>
        )}
        <Link to="/buyer/notifications" className="btn btn-secondary">View All</Link>
      </div>
    </div>
    
    <div className="card">
      <div className="card-header">
        <h3>Featured Products</h3>
      </div>
      <ProductGrid products={products.slice(0, 4)} userType="buyer" />
    </div>
    
    {/* ML Recommendations Section */}
    <div className="ml-recommendations">
      <div className="recommendations-header">
        <h2>Recommended For You</h2>
      </div>
      <MLRecommendations products={products} userId={userData?.id} />
    </div>
  </div>
);

// Product Grid Component
const ProductGrid = ({ products }) => (
  <div className="product-grid">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

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
        <Link to={`/buyer/products/${product.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

// Product List Component
const ProductList = ({ products }) => (
  <div>
    <h2>All Products</h2>
    <div className="product-list">
      {products.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  </div>
);

// Product List Item Component
const ProductListItem = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="product-list-item">
      <div className="product-list-image">
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
      <div className="product-list-info">
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
        <Link to={`/buyer/products/${product.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

// Product Detail Route Component
const ProductDetailRoute = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = 'http://localhost:3001/api';
        const response = await fetch(`${apiUrl}/products/${productId}`);
        const data = await response.json();
        
        if (data.success && data.product) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (productId) {
      fetchProduct();
    }
  }, [productId]);
  
  if (loading) {
    return <div>Loading product details...</div>;
  }
  
  return <ProductDetail product={product} />;
};

// Product Detail Component
const ProductDetail = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  
  if (!product) {
    return <div>Product not found</div>;
  }
  
  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };
  
  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <div className="product-detail-images">
          <div className="product-detail-main-image-container">
            {product.images && product.images.length > 0 && !imageErrors[selectedImageIndex] ? (
              <img 
                src={`http://localhost:3001${product.images[selectedImageIndex]}`} 
                alt={`${product.title} - Image ${selectedImageIndex + 1}`}
                className="product-detail-main-image"
                onError={() => handleImageError(selectedImageIndex)}
              />
            ) : (
              <div className="placeholder-image product-detail-main-image">
                <span>No Image Available</span>
              </div>
            )}
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="product-detail-thumbnails">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`product-detail-thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  {!imageErrors[index] ? (
                    <img 
                      src={`http://localhost:3001${image}`} 
                      alt={`Thumbnail ${index + 1}`}
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div className="placeholder-image">
                      <span>❌</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          
          <div className="product-detail-price-section">
            <span className="product-detail-price">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="product-detail-original-price">${product.originalPrice}</span>
            )}
          </div>
          
          <div className="product-detail-meta">
            <span className="product-detail-condition">{product.condition}</span>
            <span className="product-detail-category">{product.category}</span>
            {product.subcategory && (
              <span className="product-detail-category">{product.subcategory}</span>
            )}
          </div>
          
          <p className="product-detail-description">{product.description}</p>
          
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="product-detail-specifications">
              <h3>Specifications</h3>
              <ul>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="product-detail-actions">
            <button className="btn btn-primary">Add to Cart</button>
            <button className="btn btn-secondary">Add to Wishlist</button>
            <button className="btn btn-success">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Buyer Orders Component
const BuyerOrders = () => (
  <div>
    <h2>My Orders</h2>
    <p>Order history will be displayed here.</p>
  </div>
);

// Buyer Wishlist Component
const BuyerWishlist = () => (
  <div>
    <h2>My Wishlist</h2>
    <p>Wishlist items will be displayed here.</p>
  </div>
);

// Buyer Messages Component
const BuyerMessages = () => (
  <div>
    <h2>Messages</h2>
    <p>Messages will be displayed here.</p>
  </div>
);

// Buyer Profile Component
const BuyerProfile = ({ userData }) => (
  <div>
    <h2>My Profile</h2>
    {userData && (
      <div className="profile-info">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Member Since:</strong> {userData.memberSince}</p>
      </div>
    )}
  </div>
);

// Buyer Notifications Component
const BuyerNotifications = ({ notifications }) => (
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

// Buyer Settings Component
const BuyerSettings = () => (
  <div>
    <h2>Settings</h2>
    <p>Settings will be displayed here.</p>
  </div>
);

export default BuyerDashboard;