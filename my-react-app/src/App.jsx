import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Review from './pages/Review';
import FAQ from './pages/FAQ';
import DIY from './pages/DIY';
import Account from './pages/Account';
import Login from './pages/Login';
import Menu from './pages/menu'; // Import the Menu component
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/diy" element={<DIY />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} /> {/* Added Menu Route */}
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}

export default App;
