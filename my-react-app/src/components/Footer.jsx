export default function Footer() {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <ul>
              <li><a href="/review">Review</a></li>
              <li><a href="/faq">FAQs</a></li>
            </ul>
          </div>
          <div className="footer-info">
            <div className="about-us">
              <h3>About Us</h3>
              <p>We are a passionate team dedicated to bringing you the finest coffee experience. Our commitment to quality and sustainability sets us apart.</p>
            </div>
            <div className="contact-us">
              <h3>Contact Us</h3>
              <p>Email: support@coffeeco.com</p>
              <p>Phone: +92 302 3626078</p>
              <p>Location: 13-C, Main Khayaban-e-Bukhari, Defence Phase 6, Karachi</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
