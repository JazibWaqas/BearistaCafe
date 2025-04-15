import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container-fluid navbar-container">
        {/* Left-Aligned Name */}
        <div className="navbar-brand">
          <h1 className="header-text">Bearista Café</h1>
        </div>

        {/* Navigation Links (Centered) */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link custom-nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link custom-nav-link" href="/menu">Menu</a>
          </li>
          <li className="nav-item">
            <a className="nav-link custom-nav-link" href="/diy">DIY</a>
          </li>
          <li className="nav-item">
            <a className="nav-link custom-nav-link" href="/account">Account</a>
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
