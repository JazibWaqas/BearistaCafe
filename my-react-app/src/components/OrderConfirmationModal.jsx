import React from 'react';
import '../styles/OrderConfirmationModal.css';

const OrderConfirmationModal = ({ order, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Order Confirmation</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="order-details">
          <div className="order-info">
            <h3>Bearista Café</h3>
            <p className="cafe-address">13-C, Main Khayban-e-Bukhari, Defence Phase 6, Karachi</p>
            <div className="receipt-divider"></div>
            <p className="order-number">Order #{order._id?.slice(-6).toUpperCase()}</p>
            <p className="order-date">{new Date().toLocaleString()}</p>
            <p className="estimated-time">Estimated Delivery: 20-25 minutes</p>
          </div>

          <div className="receipt-divider"></div>

          <div className="delivery-details">
            <h4>Delivery Information</h4>
            <table className="details-table">
              <tbody>
                <tr><td>Name:</td><td>{order.deliveryDetails.customerName}</td></tr>
                <tr><td>Contact:</td><td>{order.deliveryDetails.contactInfo}</td></tr>
                <tr><td>Address:</td><td>{order.deliveryDetails.detailedAddress}</td></tr>
                <tr><td>Area:</td><td>{order.deliveryDetails.area}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="receipt-divider"></div>

          <div className="order-summary">
            <h4>Order Details</h4>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name} ({item.size})</td>
                    <td>{item.quantity}</td>
                    <td>Rs. {(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="receipt-divider"></div>
            
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

          <div className="receipt-divider"></div>

          <div className="payment-info">
            <p>Payment Method: {order.paymentMethod}</p>
          </div>

          <div className="receipt-footer">
            <p>Thank you for choosing Bearista Café</p>
            <p>For support: +92 302 3626078</p>
          </div>
        </div>

        <button className="back-to-menu-btn" onClick={onClose}>
          Return to Menu
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;