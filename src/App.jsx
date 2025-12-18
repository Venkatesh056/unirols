import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ChatbotWidget from './components/ChatbotWidget';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

// Import global styles
import './styles/variables.css';
import './styles/animations.css';
import './styles/Header.css';
import './styles/Hero.css';
import './styles/Products.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Product specification pages */}
        <Route path="/products/:productId" element={<ProductPage />} />
      </Routes>
      <Footer />
      <ScrollToTop />
      <ChatbotWidget />
    </Router>
  );
}

export default App;
