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
    console.log("Account Info being submitted:", accountInfo);

    if (accountInfo.phone === '' || accountInfo.location === '') {
      alert('Please make changes to your account.');
      return;
    }
    
    
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

      setAccountInfo(response.data);
      alert('Account updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Update error:', err);
      alert('Update failed: ' + (err.response?.data?.msg || 'Unknown error'));
    }
  };
  const handleEditToggle = () => {
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
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
                <button
                  type="button"
                  onClick={handleEditToggle}  // Toggle the state to start editing
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
                    onClick={handleCancelEdit}  // Toggle off the editing mode
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );}