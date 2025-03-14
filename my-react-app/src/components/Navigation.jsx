export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container">
        <ul className="navbar-nav ms-auto">
        <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
        <li className="nav-item"><a className="nav-link" href="/menu">Menu</a></li>
        <li className="nav-item"><a className="nav-link" href="/diy">DIY</a></li>
        <li className="nav-item"><a className="nav-link" href="/account">Account</a></li>
        </ul>
      </div>
    </nav>
  );
}
