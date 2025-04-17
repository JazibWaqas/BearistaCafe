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

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            'x-auth-token': token
          }
        });

        console.log('Fetched data:', response.data); // Debug log
        setAccountInfo(response.data);
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