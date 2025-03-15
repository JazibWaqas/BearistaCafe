import React from "react";
import { useNavigate } from "react-router-dom"; 
import Navigation from "../components/Navigation";  
import Header from '../components/Header';
import Footer from "../components/Footer"; 
import TopStrip from "../components/TopStrip";       
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Header />

      <TopStrip />  
      <section className="hero">
        <h1>Freshly Brewed Just For You!</h1>
        <p>Where coffee meets cuddles in a cozy teddy bear themed experience</p>
        <div className="image-placeholder">
        <img src="/assets/teddyhome (1).png" alt="Bearista Cafe" />
        </div>
        <button className="menu-btn" onClick={() => navigate("/menu")}>
          View Our Menu
        </button>
      </section>

      <section className="features">
        <div className="feature">
          <i className="fas fa-coffee"></i>
          <h2>Bearista Brews</h2>
          <p>Every cup comes with a sprinkle of joy and a dash of warmth</p>
        </div>
        <div className="feature">
          <i className="fas fa-clock"></i>
          <h2>Always Bear-y Open</h2>
          <p>7AM - 8PM, here to take care of your caffeine fix!</p>
        </div>
        <div className="feature">
          <i className="fas fa-map-marker-alt"></i>
          <h2>Cozy Location</h2>
          <p>A warm and cozy haven where every sip comes with a side of comfort!</p>
        </div>
      </section>

      <Footer /> 
    </div>
  );
};

export default Home;

