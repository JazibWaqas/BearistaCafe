import React from 'react';
import '../styles/OrderConfirmationModal.css';

const PickupReceiptModal = ({ order, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Pickup Receipt</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="order-details">
          <div className="order-info">
            <h3>Bearista Café</h3>
            <p className="cafe-address">13-C, Main Khayban-e-Bukhari, Defence Phase 6, Karachi</p>
            <div className="receipt-divider"></div>
            <p className="order-number">Order #{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
            <p className="order-date">{new Date().toLocaleString()}</p>
            <p className="estimated-time">Estimated Pickup Time: 15-20 minutes</p>
          </div>

          <div className="receipt-divider"></div>

          <div className="pickup-info">
            <h4>Pickup Information</h4>
            <p><strong>Location:</strong> Bearista Café Defence Phase 6</p>
            <p><strong>Address:</strong> 13-C, Main Khayban-e-Bukhari</p>
            <p><strong>Contact:</strong> +92 302 3626078</p>
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
                <span>Rs. {order.total.toFixed(2)}</span>
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
            <p>Payment Method: Cash on Pickup</p>
          </div>

          <div className="receipt-footer">
            <p>Thank you for choosing Bearista Café</p>
            <p>Please show this receipt when collecting your order</p>
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

export default PickupReceiptModal;