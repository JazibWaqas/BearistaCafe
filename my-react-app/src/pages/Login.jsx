import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', loginData);
    // Add your login logic here
    navigate('/account'); // Navigate to account page after successful login
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Registration attempt:', registerData);
    // Add your registration logic here
    navigate('/account'); // Navigate to account page after successful registration
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
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
            <label htmlFor="login-email">Email Address:</label>
            <input
              type="email"
              id="login-email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />

            <label htmlFor="login-password">Password:</label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />

            <button type="submit" className="submit-btn">Login</button>
          </form>
        </div>

        {/* Register Form */}
        <div className="form-register">
          <h2>Register</h2>
          <form onSubmit={handleRegisterSubmit}>
            <label htmlFor="register-fullname">Full Name:</label>
            <input
              type="text"
              id="register-fullname"
              name="fullname"
              value={registerData.fullname}
              onChange={handleRegisterChange}
              required
            />

            <label htmlFor="register-email">Email Address:</label>
            <input
              type="email"
              id="register-email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />

            <label htmlFor="register-phone">Phone Number:</label>
            <input
              type="tel"
              id="register-phone"
              name="phone"
              value={registerData.phone}
              onChange={handleRegisterChange}
              required
            />

            <label htmlFor="register-password">Password:</label>
            <input
              type="password"
              id="register-password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />

            <button type="submit" className="submit-btn">Register</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}