import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/account.css';

export default function Account() {
  const [accountInfo, setAccountInfo] = useState({
    fullname: '',
    email: '',
    phone: '',
    location: '',
    orderCount: 0
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [frequentItems, setFrequentItems] = useState([]);
  const [showFrequent, setShowFrequent] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const [userResponse, ordersResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/me', {
            headers: {
              'x-auth-token': token
            }
          }),
          axios.get('http://localhost:5000/api/orders/my-orders', {
            headers: {
              'x-auth-token': token
            }
          })
        ]);

        // Calculate frequent orders
        const itemCounts = {};
        ordersResponse.data.forEach(order => {
          order.items.forEach(item => {
            const itemKey = `${item.name}-${item.size}-${item.milk}`;
            if (itemCounts[itemKey]) {
              itemCounts[itemKey].count += item.quantity;
            } else {
              itemCounts[itemKey] = {
                name: item.name,
                size: item.size || '',
                milk: item.milk || '',
                count: item.quantity,
                instructions: item.instructions || '',
                image: item.image // Include the image from the order item
              };
            }
          });
        });

        const topItems = Object.values(itemCounts)
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setAccountInfo(userResponse.data);
        setFrequentItems(topItems);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);
// 2. Replace your handleSubmit function with this simpler version
const handleSubmit = async (e) => {
  e.preventDefault();

  if (accountInfo.phone === '' || accountInfo.location === '') {
    setStatusMessage({
      type: 'error',
      message: 'Please make changes to your account.'
    });
    return;
  }
  
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      setStatusMessage({
        type: 'error',
        message: 'Please login again'
      });
      return;
    }

    const response = await axios.put(
      'http://localhost:5000/api/auth/update',
      {
        phone: accountInfo.phone,
        location: accountInfo.location,
        fullname: accountInfo.fullname,
        email: accountInfo.email
      },
      {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      }
    );

    // Fetch fresh data including orders
    const [updatedUserResponse, ordersResponse] = await Promise.all([
      axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          'x-auth-token': token
        }
      }),
      axios.get('http://localhost:5000/api/orders/my-orders', {
        headers: {
          'x-auth-token': token
        }
      })
    ]);

    // Process orders data
    const itemCounts = {};
    ordersResponse.data.forEach(order => {
      order.items.forEach(item => {
        const itemKey = `${item.name}-${item.size}-${item.milk}`;
        if (itemCounts[itemKey]) {
          itemCounts[itemKey].count += item.quantity;
        } else {
          itemCounts[itemKey] = {
            name: item.name,
            size: item.size || '',
            milk: item.milk || '',
            count: item.quantity,
            instructions: item.instructions || '',
            image: item.image
          };
        }
      });
    });

    const topItems = Object.values(itemCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setAccountInfo(updatedUserResponse.data);
    setOriginalInfo(updatedUserResponse.data);
    setFrequentItems(topItems);
    setIsEditing(false);
    setStatusMessage({
      type: 'success',
      message: 'Account updated successfully!'
    });

    setTimeout(() => {
      setStatusMessage({ type: '', message: '' });
    }, 3000);
    
  } catch (err) {
    console.error('Update error:', err);

  }
};
// edit toggle
  const handleEditToggle = () => {
    setIsEditing(true);

  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setStatusMessage({ type: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="account-page">
        <Navigation />
        <div className="account-container">
          <h2>Loading...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="account-page">
      <Navigation />
      <div className="account-container">
        <h2>Your Account</h2>
        
        {statusMessage.message && (
          <div className={`status-message ${statusMessage.type}`}>
            {statusMessage.message}
          </div>
        )}
        
        <div className="account-section">
          <h3>Account Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullname"
                value={accountInfo.fullname}
                onChange={handleChange}
                className="input-field"
                readOnly={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={accountInfo.email}
                onChange={handleChange}
                className="input-field"
                readOnly={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={accountInfo.phone}
                onChange={handleChange}
                className="input-field"
                readOnly={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={accountInfo.location}
                onChange={handleChange}
                className="input-field"
                readOnly={!isEditing}
              />
            </div>

            <div className="button-group">
              {!isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="edit-button"
                  >
                    Edit Information
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="logout-button"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button type="submit" className="save-button">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

        {/* Frequently Ordered Section */}
        <div className="account-section">
          <div className="section-header" onClick={() => setShowFrequent(!showFrequent)}>
            <h3 style={{ margin: 0 }}>Order History</h3>
            <span style={{ cursor: 'pointer', transform: showFrequent ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</span>
          </div>
          
          <div style={{ 
            maxHeight: showFrequent ? '300px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease-out',
            marginTop: showFrequent ? '20px' : '0'
          }}>
            {frequentItems.length > 0 ? (
              <div className="frequent-items-container">
                {frequentItems.map((item, index) => (
                  <div key={index} className="frequent-item-card">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/fallback.jpg';
                      }}
                    />
                    <div className="frequent-item-info">
                      <h4>{item.name}</h4>
                      {(item.size || item.milk) && (
                        <p className="customization">
                          {[item.size, item.milk].filter(Boolean).join(' • ')}
                        </p>
                      )}
                      {item.instructions && (
                        <p className="instructions">"{item.instructions}"</p>
                      )}
                      <span className="order-count">
                        Ordered {item.count} time{item.count !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#666' }}>No orders yet</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}