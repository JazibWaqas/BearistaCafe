import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* We'll add other routes as we create more pages */}
      </Routes>
    </Router>
  );
}

export default App;