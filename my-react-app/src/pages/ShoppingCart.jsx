import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PickupReceiptModal from '../components/PickupReciptModal';
import axios from 'axios';

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { cart, loading, updateQuantity, removeFromCart, clearCart } = useCart();
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPickupReceipt, setShowPickupReceipt] = useState(false);
  const [pickupOrderDetails, setPickupOrderDetails] = useState(null);

  const calculateTotals = () => {
    const taxRate = 0.15;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = total * taxRate;
    const grandTotal = total + tax;
    return { total, tax, grandTotal };
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      setErrorMessage('');
    } catch (error) {
      console.error('Error removing item:', error);
      setErrorMessage('Failed to remove item from cart');
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      if (newQuantity < 1) return;
      await updateQuantity(itemId, parseInt(newQuantity));
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating quantity:', error);
      setErrorMessage('Failed to update quantity');
    }
  };

  const goToCheckout = async () => {  // Add async here
    if (cart.length === 0) {
      setErrorMessage('Your cart is empty. Add items before proceeding to checkout.');
      return;
    }
    setErrorMessage('');
    
    if (deliveryOption === 'pickup') {
      try {
        const { total, tax, grandTotal } = calculateTotals();
        const token = localStorage.getItem('token');
        if (!token) {
          setErrorMessage('Please login to place an order');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }
  
        // Save pickup order to database
        const orderData = {
          items: cart.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size || 'N/A',
            milk: item.milk || 'None',
            sweetness: item.sweetness || 'None',
            instructions: item.instructions || '',
            image: item.image || '',
            isDIY: item.isDIY || false,
            diyDetails: item.diyDetails || null
          })),
          totalAmount: total,
          tax,
          grandTotal,
          orderType: 'pickup',
          status: 'pending'
        };
  
        await axios.post('http://localhost:5000/api/orders', orderData, {
          headers: { 
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        });
  
        const orderDetails = {
          items: [...cart],
          total: total,
          tax: tax,
          grandTotal: grandTotal
        };
        setPickupOrderDetails(orderDetails);
        setShowPickupReceipt(true);
        clearCart();
      } catch (error) {
        console.error('Error creating pickup order:', error);
        setErrorMessage('Failed to create order. Please try again.');
      }
    } else {
      navigate('/checkout');
    }
  };

  const { total, tax, grandTotal } = calculateTotals();

  if (loading) {
    return (
      <div className="cart-page">
        <Navigation />
        <div className="cart-container">
          <h2>Loading cart...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Navigation />
      <div className="cart-container">
        <h2>Your Cart</h2>
        
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        
        <div id="cart-items">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item._id || item.id} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/fallback.jpg';
                  }}
                />
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">Rs. {item.price}</p>
                  {item.size && <p className="item-size">Size: {item.size}</p>}
                  {item.milk && <p className="item-milk">Milk: {item.milk}</p>}
                  {item.sweetness && <p className="item-sweetness">Sweetness: {item.sweetness}</p>}
                  {item.isDIY && item.diyDetails && (
                    <div className="diy-details">
                      <p>Base: {item.diyDetails.base}</p>
                      <p>Milk: {item.diyDetails.milk}</p>
                      {item.diyDetails.syrups?.length > 0 && (
                        <p>Syrups: {item.diyDetails.syrups.join(', ')}</p>
                      )}
                      {item.diyDetails.extras?.length > 0 && (
                        <p>Extras: {item.diyDetails.extras.join(', ')}</p>
                      )}
                    </div>
                  )}
                  {item.instructions && (
                    <p className="item-instructions">
                      Special Instructions: {item.instructions}
                    </p>
                  )}
                </div>
                <div className="item-controls">
                  <button 
                    className="delete"
                    onClick={() => handleRemoveItem(item._id || item.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleUpdateQuantity(item._id || item.id, e.target.value)}
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

        <button className="checkout-btn" onClick={goToCheckout}>
          Checkout <i className="fas fa-arrow-right"></i>
        </button>

        {deliveryOption === 'pickup' && (
          <div className="pickup-info">
            <p>You have to collect your order from:</p>
            <p><strong>Bearista Café Defence Phase 6</strong></p>
            <p><strong>Location:</strong> 13-C, Main Khayban-e-Bukhari, Defence Phase 6, Karachi</p>
            <p><strong>Phone:</strong> +92 302 3626078</p>
          </div>
        )}
      </div>

      {showPickupReceipt && pickupOrderDetails && (
        <PickupReceiptModal
          order={pickupOrderDetails}
          onClose={() => {
            setShowPickupReceipt(false);
            setPickupOrderDetails(null);
            navigate('/menu');
          }}
        />
      )}

      <Footer />
    </div>
  );
}