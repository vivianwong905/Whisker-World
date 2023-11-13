
import { Routes, Route, Link } from 'react-router-dom';
import Login_register from './components/login_register';
import Cart from './components/cart';
import Products from './components/products';
import Admin from './components/admin';
import Checkout from './components/checkout';
import NavBar from './components/Navbar';
import SingleProduct from './components/singleProduct';
import { useSelector } from 'react-redux'



function App() {
  const token = useSelector(state => state.auth.token);
  console.log("The Token is :", token)
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
            <Route path="/:id" element={<SingleProduct />}/>
            <Route path="/auth" element={<Admin />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;