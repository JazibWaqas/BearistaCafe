import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import "../styles/diy.css";

export default function DIY() {
  const { addToCart } = useCart();
  const [currentStep, setCurrentStep] = useState('start');
  const [orderDetails, setOrderDetails] = useState({
    base: '',
    milk: '',
    syrups: [],
    extras: []
  });

  const handleInputChange = (e, type) => {
    const { name, value, checked } = e.target;
    
    if (type === 'radio') {
      const updates = { [name]: value} ;
      
      if (name === 'base') {
        if (value === "Like it HOT") {
          updates.price = 300;
          updates.image = "/assets/like_it_hot.jpeg";
        } else if (value === "Make it a Frappe") {
          updates.price = 500;
          updates.image = "/assets/make_it_a_frappe.jpg";
        } else if (value === "On The Rocks") {
          updates.price = 450;
          updates.image = "/assets/on_the_rocks.webp";
        }
      }

      setOrderDetails(prev => ({
        ...prev,
        ...updates
      }));
    } else if (type === 'checkbox') {
      setOrderDetails(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    }
  };

  const handleAddToCart = async () => {
    const diyId = `diy-${Date.now()}`;
    
    const newDrink = {
      id: diyId,
      name: `DIY - ${orderDetails.base}`,
      price: orderDetails.price,
      quantity: 1,
      image: orderDetails.image,
      isDIY: true,
      diyDetails: {
        base: orderDetails.base,
        milk: orderDetails.milk,
        syrups: orderDetails.syrups,
        extras: orderDetails.extras
      }
    };
  
    await addToCart(newDrink);
    
    setOrderDetails({
      base: '',
      milk: '',
      syrups: [],
      extras: []
    });
  };

  return (
    <div className="diy-page">
      <Navigation />
      <div className="diy_container">
        <h1>Build Your Own Coffee ☕</h1>

        {currentStep === 'start' && (
          <div id="start-screen">
            <p>Customize your coffee just the way you like it!</p>
            <button className="start" onClick={() => setCurrentStep('step1')}>
              Start ➝
            </button>
          </div>
        )}

        {currentStep === 'step1' && (
          <div className="step">
            <h2>Step 1: Choose Your Type of Coffee</h2>
            <label>
              <input 
                type="radio" 
                name="base" 
                value="Like it HOT" 
                checked={orderDetails.base === "Like it HOT"}
                onChange={(e) => handleInputChange(e, 'radio')} 
                required 
              /> Like it HOT    (Rs.300)
            </label>
            <label>
              <input 
                type="radio" 
                name="base" 
                value="Make it a Frappe" 
                checked={orderDetails.base === "Make it a Frappe"}
                onChange={(e) => handleInputChange(e, 'radio')} 
                required 
              /> Make it a Frappe     (Rs.500)
            </label>
            <label>
              <input 
                type="radio" 
                name="base" 
                value="On The Rocks" 
                checked={orderDetails.base === "On The Rocks"}
                onChange={(e) => handleInputChange(e, 'radio')} 
                required 
              /> On The Rocks     (Rs.450)
            </label>
            <div className="navigation">
              <button className="back" onClick={() => setCurrentStep('start')}>← Back</button>
              <button 
                className="next" 
                onClick={() => setCurrentStep('step2')}
                disabled={!orderDetails.base}
              >
                Next ➝
              </button>
            </div>
          </div>
        )}

        {currentStep === 'step2' && (
          <div className="step">
            <h2>Step 2: Choose Your Milk</h2>
            <label>
              <input 
                type="radio" 
                name="milk" 
                value="Whole Milk" 
                checked={orderDetails.milk === "Whole Milk"}
                onChange={(e) => handleInputChange(e, 'radio')} 
                required 
              /> Whole Milk
            </label>
            <label>
              <input 
                type="radio" 
                name="milk" 
                value="Skim Milk" 
                checked={orderDetails.milk === "Skim Milk"}
                onChange={(e) => handleInputChange(e, 'radio')} 
                required 
              /> Skim Milk
            </label>
            <label>
              <input 
                type="radio" 
                name="milk" 
                value="Lactose-Free Milk" 
                checked={orderDetails.milk === "Lactose-Free Milk"}
                onChange={(e) => handleInputChange(e, 'radio')} 
                required 
              /> Lactose-Free Milk
            </label>
            <div className="navigation">
              <button className="back" onClick={() => setCurrentStep('step1')}>← Back</button>
              <button 
                className="next" 
                onClick={() => setCurrentStep('step3')}
                disabled={!orderDetails.milk}
              >
                Next ➝
              </button>
            </div>
          </div>
        )}

        {currentStep === 'step3' && (
          <div className="step">
            <h2>Step 3: Choose Your Sweetener</h2>
            {['Vanilla', 'Hazelnut', 'Caramel', 'Mocha'].map(syrup => (
              <label key={syrup}>
                <input 
                  type="checkbox" 
                  name="syrups" 
                  value={syrup}
                  checked={orderDetails.syrups.includes(syrup)}
                  onChange={(e) => handleInputChange(e, 'checkbox')} 
                /> {syrup}
              </label>
            ))}
            <div className="navigation">
              <button className="back" onClick={() => setCurrentStep('step2')}>← Back</button>
              <button className="next" onClick={() => setCurrentStep('step4')}>Next ➝</button>
            </div>
          </div>
        )}

        {currentStep === 'step4' && (
          <div className="step">
            <h2>Step 4: Any Extra's????</h2>
            {['Extra Shot', 'Whipped Cream', 'Caramel Drizzle'].map(extra => (
              <label key={extra}>
                <input 
                  type="checkbox" 
                  name="extras" 
                  value={extra}
                  checked={orderDetails.extras.includes(extra)}
                  onChange={(e) => handleInputChange(e, 'checkbox')} 
                /> {extra}
              </label>
            ))}
            <div className="navigation">
              <button className="back" onClick={() => setCurrentStep('step3')}>← Back</button>
              <button className="next" onClick={() => setCurrentStep('summary')}>Next ➝</button>
            </div>
          </div>
        )}


{currentStep === 'summary' && (
  <div className="step">
    <h2>Order Summary</h2>
    {!orderDetails.base ? (
      // Show only buttons if order details are empty (after adding to cart)
      <div className="summary-buttons">
        <button className="start" onClick={() => setCurrentStep('step1')}>
          Create Another ☕
        </button>
        <Link to="/cart" className="view-cart-button">
          View Cart
        </Link>
      </div>
    ) : (
      // Show full summary before adding to cart
      <>
        <div className="summary-details">
          <p><strong>Base:</strong> {orderDetails.base}</p>
          <p><strong>Milk:</strong> {orderDetails.milk}</p>
          {orderDetails.syrups.length > 0 && (
            <p><strong>Syrups:</strong> {orderDetails.syrups.join(', ')}</p>
          )}
          {orderDetails.extras.length > 0 && (
            <p><strong>Extras:</strong> {orderDetails.extras.join(', ')}</p>
          )}
          <p><strong>Price:</strong> Rs. {orderDetails.price}</p>
        </div>
        <div className="summary-buttons">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <Link to="/cart" className="view-cart-button">
            View Cart
          </Link>
        </div>
      </>
    )}
  </div>
)}
      </div>
      <Footer />
    </div>
  );
}