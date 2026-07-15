import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import About from './pages/About';
import RateUs from './pages/RateUs';
import AdminReviews from './pages/AdminReviews';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path='/rate-us' element={<RateUs />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
      </Route>
    </Routes>
  );
}