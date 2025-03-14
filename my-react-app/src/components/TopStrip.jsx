import { Link } from 'react-router-dom';

export default function TopStrip() {
  return (
    <div className="top-strip d-flex justify-content-end align-items-center p-2">
      <Link to="/login" className="href me-3">Login/Register</Link>
      <Link to="/cart">
        <i className="fas fa-shopping-cart"></i>
      </Link>
    </div>
  );
}
