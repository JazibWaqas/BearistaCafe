import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid navbar-container">
        {/* Left-Aligned Name */}
        <Link to="/" className="navbar-brand">
          <h1 className="header-text">Bearista Café</h1>
        </Link>

        {/* Navigation Links (Centered) */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link custom-nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link" to="/menu">Menu</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link" to="/diy">DIY</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link" to="/account">Account</Link>
          </li>
        </ul>

        {/* Right-Aligned Icons (Login & Cart) */}
        <div className="top-icons">
          <Link to="/register" className="custom-link me-3" title="Login/Register">
            <i className="fas fa-user"></i>
          </Link>
          <Link to="/cart" className="cart-link" title="Shopping Cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
}