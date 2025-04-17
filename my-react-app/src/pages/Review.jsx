
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Review() {
  const [formData, setState] = useState({
    orderNumber: '',
    // name: '',
    // email: '',
    rating: '',
    comment: '',
    suggestions: '',
    recommend: ''
  });

  const [msg, setMsg] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMsg('You must be logged in to submit a review.');
      return;
    }

    try {
      const res = await axios.post('/api/reviews',formData,{
          headers: {
            'x-auth-token': token
          }
        }
      );
      setMsg(res.data.msg);
      setState({
        orderNumber: '',
        // fullName: '',
        // email: '',
        rating: '',
        comment: '',
        suggestions: '',
        recommend: ''
      });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setMsg('Session expired or unauthorized. Please log in again.');
      } else {
        setMsg('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="review-page">
      {/* <Header /> */}
      <Navigation />

      <h2>Customer Feedback Form</h2>
      {msg && <p style={{ color: 'crimson', fontWeight: 'bold' }}>{msg}</p>}
      
      {token ? (
        <form onSubmit={handleSubmit}>
          <label>Order Number:</label>
          <input 
            type="text" 
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            required 
          />
{/* 
          <label>Full Name:</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required 
          /> */}
{/* 
          <label>Email Address:</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
          /> */}

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
                  checked={formData.rating === String(num)}
                  required 
                />
                <label htmlFor={`star${num}`}>★</label>
              </div>
            ))}
          </div>

          <label>Leave a Review:</label>
          <textarea 
            name="comment"
            value={formData.comment}
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
                checked={formData.recommend === 'yes'}
                required 
              /> Yes
            </label>
            <label>
              <input 
                type="radio" 
                name="recommend" 
                value="no"
                onChange={handleChange}
                checked={formData.recommend === 'no'}
                required 
              /> No
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <p style={{ fontWeight: 'bold' }}>Please log in to leave a review.</p>
      )}
      <Footer />
    </div>
  );
}
