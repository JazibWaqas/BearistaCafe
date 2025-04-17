import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import Header from '../components/Header';
import TopStrip from '../components/TopStrip';
import Footer from '../components/Footer';
import OrderConfirmationModal from '../components/OrderConfirmationModal';
import '../styles/checkout.css';

// Set the base URL for all axios requests
axios.defaults.baseURL = 'http://localhost:5000';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    contactInfo: '',
    area: '',
    detailedAddress: ''
  });

  useEffect(() => {
    // Try to fetch user details when component mounts
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('/api/auth/me', {
          headers: { 'x-auth-token': token }
        });

        // Pre-fill form with user details
        setFormData({
          customerName: response.data.fullname || '',
          contactInfo: response.data.phone || '',
          area: response.data.location || '',
          detailedAddress: response.data.location || ''
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const calculateTotals = () => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = 0.15;
    const tax = total * taxRate;
    const grandTotal = total + tax;
    return { total, tax, grandTotal };
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const placeOrder = async () => {
    const { customerName, contactInfo, area, detailedAddress } = formData;

    if (!customerName || !contactInfo || !area || !detailedAddress) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const { total, tax, grandTotal } = calculateTotals();
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Please log in to place an order.');
        navigate('/login');
        return;
      }

      const response = await axios.post('/api/orders', {
        items: cart,
        deliveryDetails: {
          customerName,
          contactInfo,
          area,
          detailedAddress
        },
        totalAmount: total,
        tax,
        grandTotal,
        paymentMethod: 'Cash on Delivery'
      }, {
        headers: { 
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });

      // Set the confirmed order and show modal
      setConfirmedOrder(response.data);
      setShowConfirmation(true);
      
      // Clear the cart
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const { total, tax, grandTotal } = calculateTotals();

  return (
    <div className="checkout-page">
      <Header />
      <TopStrip />

      <div className="checkout-container">
        <h2>Checkout</h2>

        <div className="section">
          <h3>Delivery Address</h3>
          <form id="delivery-form">
            <label htmlFor="customerName">Name:</label>
            <input
              type="text"
              id="customerName"
              placeholder="Enter your name"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="contactInfo">Contact Information:</label>
            <input
              type="text"
              id="contactInfo"
              placeholder="Phone number and email"
              value={formData.contactInfo}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="area">Select Area:</label>
            <select
              id="area"
              value={formData.area}
              onChange={handleInputChange}
              required
            >
              <option value="">--Select Area--</option>
              <option value="Defence Phase 1">Defence Phase 1</option>
              <option value="Defence Phase 2">Defence Phase 2</option>
              <option value="Defence Phase 3">Defence Phase 3</option>
              <option value="Defence Phase 4">Defence Phase 4</option>
              <option value="Defence Phase 5">Defence Phase 5</option>
              <option value="Defence Phase 6">Defence Phase 6</option>
              <option value="Defence Phase 7">Defence Phase 7</option>
              <option value="Defence Phase 8">Defence Phase 8</option>
              <option value="Clifton Phase 1">Clifton Phase 1</option>
              <option value="Clifton Phase 2">Clifton Phase 2</option>
              <option value="Clifton Phase 3">Clifton Phase 3</option>
              <option value="Gulshan-e-Iqbal">Gulshan-e-Iqbal</option>
              <option value="Gulistan-e-Johar">Gulistan-e-Johar</option>
              <option value="Nazimabad">Nazimabad</option>
              <option value="North Nazimabad">North Nazimabad</option>
              <option value="Lyari">Lyari</option>
              <option value="Korangi">Korangi</option>
              <option value="Malir">Malir</option>
            </select>

            <label htmlFor="detailedAddress">Detailed Address:</label>
            <textarea
              id="detailedAddress"
              placeholder="House number, street name, etc."
              value={formData.detailedAddress}
              onChange={handleInputChange}
              required
            />
          </form>
        </div>

        <div className="section">
          <h3>Payment Option</h3>
          <p>Cash on Delivery</p>
        </div>

        <div className="section">
          <h3>Order Summary</h3>
          <div id="order-summary">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="order-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/fallback.jpg';
                    }}
                  />
                  <p>{item.name} ({item.size}) - Rs. {item.price} x {item.quantity}</p>
                </div>
              ))
            )}
          </div>
          <div className="cart-summary">
            <p>Total: <span>Rs. {total.toFixed(2)}</span></p>
            <p>Tax (15%): <span>Rs. {tax.toFixed(2)}</span></p>
            <p className="grand-total">Grand Total: <span>Rs. {grandTotal.toFixed(2)}</span></p>
          </div>
        </div>

        <button className="place-order-btn" onClick={placeOrder}>
          Place Order
        </button>
      </div>

      {showConfirmation && confirmedOrder && (
        <OrderConfirmationModal
          order={confirmedOrder}
          onClose={() => {
            setShowConfirmation(false);
            navigate('/menu');
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default Checkout;