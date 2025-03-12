import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Account() {
  const [accountInfo, setAccountInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: ''
  });

  // Example frequent orders - in a real app, this would come from an API/database
  const frequentOrders = [
    // Add your frequent orders here if needed
  ];

  // Example voucher progress - in a real app, this would come from an API/database
  const voucherProgress = 3; // Example: 3 out of 10 orders completed

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAccountInfo(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Account info updated:', accountInfo);
    // Add your form submission logic here
  };

  return (
    <div className="account-page">
      <Header />

      <div className="account-container">
        <h2>Your Account</h2>

        {/* Account Information Section */}
        <div className="section">
          <h3>Account Information</h3>
          <form id="account-form" onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              value={accountInfo.fullName}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={accountInfo.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              value={accountInfo.phone}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              placeholder="Enter your location"
              value={accountInfo.location}
              onChange={handleInputChange}
              required
            />

            <button type="submit">Save Changes</button>
          </form>
        </div>

        {/* Frequently Ordered Section */}
        <div className="section">
          <h3>Frequently Ordered</h3>
          <ul id="frequent-orders">
            {frequentOrders.map((order, index) => (
              <li key={index}>{order}</li>
            ))}
          </ul>
        </div>

        {/* Voucher Section */}
        <div className="section voucher-section">
          <h3>Voucher Progress</h3>
          <div className="voucher-progress">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className={`circle ${index < voucherProgress ? 'active' : ''}`}
                id={`circle-${index + 1}`}
              />
            ))}
          </div>
          <p id="voucher-message">
            You need to place {10 - voucherProgress} more orders to receive a free coffee voucher!
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}