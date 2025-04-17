import React from 'react';
import '../styles/OrderConfirmationModal.css';

const OrderConfirmationModal = ({ order, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Order Confirmed! 🎉</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="order-details">
          <div className="order-info">
            <p className="order-number">Order #{order._id?.slice(-6).toUpperCase()}</p>
            <p className="estimated-time">Estimated Delivery Time: 20-25 minutes</p>
          </div>

          <div className="delivery-details">
            <h3>Delivery Details</h3>
            <p><strong>Name:</strong> {order.deliveryDetails.customerName}</p>
            <p><strong>Contact:</strong> {order.deliveryDetails.contactInfo}</p>
            <p><strong>Address:</strong> {order.deliveryDetails.detailedAddress}</p>
            <p><strong>Area:</strong> {order.deliveryDetails.area}</p>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <span>{item.name} ({item.size}) x {item.quantity}</span>
                <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            
            <div className="order-totals">
              <div className="total-line">
                <span>Subtotal:</span>
                <span>Rs. {order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="total-line">
                <span>Tax (15%):</span>
                <span>Rs. {order.tax.toFixed(2)}</span>
              </div>
              <div className="total-line grand-total">
                <span>Grand Total:</span>
                <span>Rs. {order.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="payment-info">
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          </div>
        </div>

        <button className="track-order-btn" onClick={onClose}>
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;