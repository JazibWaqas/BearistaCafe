import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import TopStrip from '../components/TopStrip';
import Footer from '../components/Footer';

export default function DIY() {
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
      setOrderDetails(prev => ({
        ...prev,
        [name]: value
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

  return (
    <div className="diy-page">
      <TopStrip />
      <Header />

      <div className="container">
        <h1>Build Your Own Coffee ☕</h1>

        {/* Start Screen */}
        {currentStep === 'start' && (
          <div id="start-screen">
            <p>Customize your coffee just the way you like it!</p>
            <button className="start" onClick={() => setCurrentStep('step1')}>
              Start ➝
            </button>
          </div>
        )}

        {/* Step 1: Base */}
        {currentStep === 'step1' && (
          <div className="step">
            <h2>Step 1: Choose Your Type of Coffee</h2>
            <label>
              <input 
                type="radio" 
                name="base" 
                value="Hot Espresso Shot" 
                checked={orderDetails.base === "Hot Espresso Shot"}
                onChange={(e) => handleInputChange(e, 'radio')} 
                required 
              /> Like It HOT
            </label>
            <label>
              <input 
                type="radio" 
                name="base" 
                value="Make it a Frappe" 
                checked={orderDetails.base === "Make it a Frappe"}
                onChange={(e) => handleInputChange(e, 'radio')} 
                required 
              /> Make it a Frappe
            </label>
            <label>
              <input 
                type="radio" 
                name="base" 
                value="On The Rocks" 
                checked={orderDetails.base === "On The Rocks"}
                onChange={(e) => handleInputChange(e, 'radio')} 
                required 
              /> On The Rocks
            </label>
            <div className="navigation">
              <button className="back" onClick={() => setCurrentStep('start')}>← Back</button>
              <button className="next" onClick={() => setCurrentStep('step2')}>Next ➝</button>
            </div>
          </div>
        )}

        {/* Step 2: Milk */}
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
              <button className="next" onClick={() => setCurrentStep('step3')}>Next ➝</button>
            </div>
          </div>
        )}

        {/* Step 3: Sweetener */}
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

        {/* Step 4: Extras */}
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
              <button className="next" onClick={() => setCurrentStep('summary')}>Finish ➝</button>
            </div>
          </div>
        )}

        {/* Summary */}
        {currentStep === 'summary' && (
          <div className="step">
            <h2>Order Summary</h2>
            <p>Thank you for customizing your coffee! Your order has been placed!!</p>
            <Link to="/cart" className="back">View Cart</Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}