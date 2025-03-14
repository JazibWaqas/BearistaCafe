import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TopStrip from '../components/TopStrip';
import Footer from '../components/Footer';

export default function ShoppingCart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  };

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (itemId) => {
    const newCart = cart.filter(item => item.id !== itemId);
    updateCart(newCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    const newCart = cart.map(item => 
      item.id === itemId ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    updateCart(newCart);
  };

  const calculateTotals = () => {
    const taxRate = 0.15;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = total * taxRate;
    const grandTotal = total + tax;
    return { total, tax, grandTotal };
  };

  const applyCoupon = () => {
    if (couponCode.trim() !== '') {
      alert('Coupon applied successfully!');
    } else {
      alert('Please enter a valid coupon code.');
    }
  };

  const goToCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items before proceeding to checkout.");
      return;
    }
    navigate('/checkout');
  };

  const { total, tax, grandTotal } = calculateTotals();

  return (
    <div className="cart-page">
      <Header />
      <TopStrip />
      <div className="cart-container">
        <h2>Your Cart</h2>
        
        <div id="cart-items">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img 
                  src={`/src/assets/${item.image}`} 
                  alt={item.name} 
                  style={{ width: '80px' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/src/assets/fallback.jpg';
                  }}
                />
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">Rs. {item.price}</p>
                </div>
                <div className="item-controls">
                  <button 
                    className="delete"
                    onClick={() => removeItem(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    style={{ width: '50px' }}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="add-more">
          <Link to="/menu">+ Add more items</Link>
        </div>

        <div className="cart-summary">
          <p>Total <span>Rs. {total.toFixed(2)}</span></p>
          <p>Tax 15% <span>Rs. {tax.toFixed(2)}</span></p>
          <p className="grand-total">Grand Total <span>Rs. {grandTotal.toFixed(2)}</span></p>
        </div>

        <div className="delivery-options">
          <button 
            className={`option ${deliveryOption === 'pickup' ? 'active' : ''}`}
            onClick={() => setDeliveryOption('pickup')}
          >
            Pickup
          </button>
          <button 
            className={`option ${deliveryOption === 'delivery' ? 'active' : ''}`}
            onClick={() => setDeliveryOption('delivery')}
          >
            Delivery
          </button>
        </div>

        <div className="coupon-section">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button className="apply-coupon" onClick={applyCoupon}>
            Apply
          </button>
        </div>

        <button className="checkout-btn" onClick={goToCheckout}>
          Checkout <i className="fas fa-arrow-right"></i>
        </button>

        {deliveryOption === 'pickup' && (
          <div className="pickup-info">
            <p>You have to collect your order from:</p>
            <p><strong>CoffeeCo Defence Phase 6</strong></p>
            <p><strong>Location:</strong> 13-C, Main Khayban-e-Bukhari, Defence Phase 6, Karachi</p>
            <p><strong>Phone:</strong> +92 302 3626078</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}