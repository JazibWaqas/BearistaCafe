export default function TopStrip() {
    return (
      <div className="top-strip">
        <a href="/login" className="href">Login/Register</a>
        <a href="/cart">
          <i className="fa fa-shopping-cart"></i>
        </a>
      </div>
    );
  }