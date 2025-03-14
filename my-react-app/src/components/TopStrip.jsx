import { Link } from 'react-router-dom';

export default function TopStrip() {
  return (
    <div className="top-strip">
      <Link to="/login" className="href">Login/Register</Link>
      <Link to="/cart">
        <i className="fas fa-shopping-cart"></i>
      </Link>
    </div>
  );
}