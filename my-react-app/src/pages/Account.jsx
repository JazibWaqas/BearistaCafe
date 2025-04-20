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
    orderCount: 0,
    voucherCodes: []
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [frequentItems, setFrequentItems] = useState([]);
  const [showFrequent, setShowFrequent] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login again');
        return;
      }

      const response = await axios.put(
        'http://localhost:5000/api/auth/update',
        {
          phone: accountInfo.phone,
          location: accountInfo.location
        },
        {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        }
      );

      setAccountInfo(response.data);
      setIsEditing(false);
      alert('Account updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      alert('Update failed: ' + (err.response?.data?.msg || 'Unknown error'));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo(prev => ({
      ...prev,
      [name]: value
    }));
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
        
        {/* Account Information Section */}
        <div className="account-section">
          <h3>Account Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={accountInfo.fullname}
                readOnly
                className="input-field readonly"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={accountInfo.email}
                readOnly
                className="input-field readonly"
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
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="edit-button"
                >
                  Edit Information
                </button>
              ) : (
                <>
                  <button type="submit" className="save-button">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
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
    <h3 style={{ margin: 0 }}>Frequently Ordered</h3>
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

        {/* Voucher Section */}
        <div className="account-section voucher-section">
          <h3>Voucher Progress</h3>
          <div className="coffee-progress">
            <div className="coffee-icons">
              {[...Array(10)].map((_, i) => (
                <span 
                  key={i} 
                  className={`coffee-icon ${i < (accountInfo.orderCount % 10) ? 'filled' : 'empty'}`}
                >
                  ☕
                </span>
              ))}
            </div>
            <p className="progress-text">
              {accountInfo.orderCount > 0 
                ? `You've placed ${accountInfo.orderCount} order${accountInfo.orderCount !== 1 ? 's' : ''}!`
                : 'Start ordering to earn vouchers!'}
            </p>
            <p className="remaining-text">
              {10 - (accountInfo.orderCount % 10)} more orders until your next free coffee!
            </p>
          </div>

          {/* Available Vouchers */}
          {accountInfo.voucherCodes && accountInfo.voucherCodes.length > 0 && (
            <div className="vouchers-list">
              <h4>Your Available Vouchers</h4>
              {accountInfo.voucherCodes
                .filter(voucher => !voucher.isUsed)
                .map((voucher, index) => (
                  <div key={index} className="voucher-item">
                    <span className="voucher-code">{voucher.code}</span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(voucher.code);
                        alert('Voucher code copied!');
                      }}
                      className="copy-button"
                    >
                      Copy Code
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}