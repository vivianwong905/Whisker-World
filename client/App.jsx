
import { Routes, Route } from 'react-router-dom';

import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Admin from './components/Admin/Admin';
import NavBar from './components/Navbar';
import SingleProduct from './components/Products/SingleProduct';
// import { useSelector } from 'react-redux'

import React from "react";
import UpdateProductForm from './components/Admin/UpdateProductForm';
import AuthForm from './components/Auth/AuthForm';

function App() {
  // const token = useSelector(state => state.auth.token);
  // console.log("The Token is :", token)
  return (
     <>
        <NavBar />
        <div id="container">
          <div id="main-section">
            <Routes>
              <Route path="/register" element={<AuthForm />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/" element={<Products />} />
              <Route path="/:id" element={<SingleProduct />}/>
              <Route path="/admin" element={<Admin />} />
              <Route path="/UpdateProductForm" element={<UpdateProductForm />} />
              <Route path="/Navbar" element={<NavBar />} />
            </Routes>
          </div>
        </div>
      </>
    );
  }
  
  export default App;