import { Link } from 'react-router-dom';

export default function TopStrip() {
  return (
    <div className="top-strip d-flex justify-content-end align-items-center p-2">
      <Link to="/login" className="custom-link me-3" title="Login/Register">
        <i className="fas fa-user"></i>
      </Link>
      <Link to="/cart" className="cart-link" title="Shopping Cart">
        <i className="fas fa-shopping-cart"></i>
      </Link>
    </div>
  );
}