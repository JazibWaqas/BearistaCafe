import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TopStrip from '../components/TopStrip';
import Footer from '../components/Footer';
import '../styles/checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    contactInfo: '',
    area: '',
    detailedAddress: ''
  });

  useEffect(() => {
    loadOrderSummary();
  }, []);

  const loadOrderSummary = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  };

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

  const placeOrder = () => {
    const { customerName, contactInfo, area, detailedAddress } = formData;

    if (!customerName || !contactInfo || !area || !detailedAddress) {
      alert('Please fill in all required fields.');
      return;
    }

    alert(`Order placed successfully!\nName: ${customerName}\nContact: ${contactInfo}\nArea: ${area}\nAddress: ${detailedAddress}\nPayment: Cash on Delivery`);
    localStorage.removeItem('cart');
    navigate('/menu');
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

      <Footer />
    </div>
  );
};

export default Checkout;