import Navigation from './Navigation';

export default function Header() {
  return (
    <div className="header-nav-container">
      <div className="header-title">
        {/* <i className="fas fa-paw"></i>  */}
        <h1 className="header-text">Bearista Café</h1>
      </div>
      <Navigation />
    </div>
  );
}