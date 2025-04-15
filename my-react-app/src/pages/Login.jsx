import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/login.css';

export default function Login() {
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });


  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
      localStorage.setItem('token', response.data.token);
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      setLoginData({ email: '', password: '' });
      navigate('/account');
    } catch (error) {
      setLoginError(error.response?.data?.msg || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-page">
      <Header />

      <div className="form-container">
        {/* Login Form */}
        <div className="form-login">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            {loginError && <div className="error-message">{loginError}</div>}
            
            <label htmlFor="login-email">Email Address:</label>
            <input
              type="email"
              id="login-email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
              disabled={isLoading}
            />

            <label htmlFor="login-password">Password:</label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              disabled={isLoading}
            />

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}