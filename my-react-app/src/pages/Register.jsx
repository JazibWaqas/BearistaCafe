import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../styles/register.css';
export default function Register() {
    const navigate = useNavigate();


    const [registerData, setRegisterData] = useState({
        fullname: '',
        email: '',
        phone: '',
        password: ''
      });
      const [registerError, setRegisterError] = useState('');
        const [isLoading, setIsLoading] = useState(false);
    
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setIsLoading(true);

    if (registerData.password.length < 6) {
      setRegisterError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', registerData);
      
      setRegisterData({
        fullname: '',
        email: '',
        phone: '',
        password: ''
      });
      
      navigate('/login');

    } catch (error) {
      setRegisterError(error.response?.data?.msg || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return (
    <div className="register-page">
      <Navigation/>
      <div className="form-container">
             <div className="form-register">
                <h2>Register</h2>
                <form onSubmit={handleRegisterSubmit}>
                  {registerError && <div className="error-message">{registerError}</div>}
                  
                  <div className="form-field">
                    <label htmlFor="register-fullname">Full Name:</label>
                    <input
                      type="text"
                      id="register-fullname"
                      name="fullname"
                      value={registerData.fullname}
                      onChange={handleRegisterChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
      
                  <div className="form-field">
                    <label htmlFor="register-email">Email Address:</label>
                    <input
                      type="email"
                      id="register-email"
                      name="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
      
                  <div className="form-field">
                    <label htmlFor="register-phone">Phone Number:</label>
                    <input
                      type="tel"
                      id="register-phone"
                      name="phone"
                      value={registerData.phone}
                      onChange={handleRegisterChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
      
                  <div className="form-field">
                    <label htmlFor="register-password">Password:</label>
                    <input
                      type="password"
                      id="register-password"
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                      disabled={isLoading}
                      minLength="6"
                    />
                  </div>
      
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Registering...' : 'Register'}
                  </button>
                  
                  <div className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                  </div>
                </form>
              </div>
            </div>
      
            <Footer />
          </div>
        );
}

    