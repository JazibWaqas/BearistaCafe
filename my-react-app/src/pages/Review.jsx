import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Review() {
  const [formData, setState] = useState({
    orderNumber: '',
    fullName: '',
    email: '',
    rating: '',
    review: '',
    suggestions: '',
    recommend: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="review-page">
      <Header />
      <h2>Customer Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Order Number:</label>
        <input 
          type="text" 
          name="orderNumber"
          value={formData.orderNumber}
          onChange={handleChange}
          required 
        />
        
        <label>Full Name:</label>
        <input 
          type="text" 
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required 
        />
        
        <label>Email Address:</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          required 
        />
        
        <label>Overall Rating:</label>
        <div className="stars">
          {[5, 4, 3, 2, 1].map((num) => (
            <div key={num}>
              <input 
                type="radio" 
                id={`star${num}`} 
                name="rating" 
                value={num}
                onChange={handleChange}
                required 
              />
              <label htmlFor={`star${num}`}>★</label>
            </div>
          ))}
        </div>
        
        <label>Leave a Review:</label>
        <textarea 
          name="review"
          value={formData.review}
          onChange={handleChange}
          required 
        />
        
        <label>Suggestions for Improvement:</label>
        <textarea 
          name="suggestions"
          value={formData.suggestions}
          onChange={handleChange}
        />
        
        <label>Would you recommend us to others?</label>
        <div className="radio-group">
          <label>
            <input 
              type="radio" 
              name="recommend" 
              value="yes"
              onChange={handleChange}
              required 
            /> Yes
          </label>
          <label>
            <input 
              type="radio" 
              name="recommend" 
              value="no"
              onChange={handleChange}
              required 
            /> No
          </label>
        </div>
        
        <button type="submit">Submit</button>
      </form>
      <Footer />
    </div>
  );
}