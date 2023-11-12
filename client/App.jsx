
import { Routes, Route, Link } from 'react-router-dom';
import Login_register from './components/login_register';
import Cart from './components/cart';
import Products from './components/products';
import Admin from './components/admin';
import Checkout from './components/checkout';
import NavBar from './components/Navbar';


function App() {
  return (
    <>
      <NavBar />
      <div id="container">
        <div id="navbar">
          <Link to="/auth">Admin</Link>
          <br />
          <Link to="/checkout">Checkout</Link>
        </div>
        <div id="main-section">
          <Routes>
            <Route path="/auth/register" element={<Login_register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Products />} />
            <Route path="/auth" element={<Admin />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;