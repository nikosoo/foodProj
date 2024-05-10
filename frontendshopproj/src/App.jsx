import React, { useState } from "react";
import "./App.css";
import Header from "./header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemList from "./ItemList/ItemList";
import Cart from "./Cart/Cart";
import Homepage from "./Homepage/Homepage";
import Footer from "./footer/Footer";
import Contact from "./contact/Contact";
import Product from "./product/Product";
import Register from "./Register/Register";
import Login from "./Login/Login";

function App() {
  const [products, setProducts] = useState([]);
  const [showItem, setShowItems] = useState([]);
  const [userEmail, setUserEmail] = useState(""); // State to store user's email

  const submitProduct = (selectedItem) => {
    setProducts([...products, selectedItem]);
  };

  const handleDelete = (index) => {
    const updatedCart = [...products];
    updatedCart.splice(index, 1);
    setProducts(updatedCart);
  };

  const sendItems = (item) => {
    setShowItems(item);
    console.log(item);
  };

  // Function to update user's email upon successful login
  const handleLoginSuccess = (email) => {
    setUserEmail(email);
  };

  // Function to handle logout
  const handleLogout = () => {
    setUserEmail(""); // Clear user email
    // Add additional logout actions here if needed
  };

  return (
    <>
      <Router>
        {/* Pass userEmail and handleLogout as props to Header */}
        <Header userEmail={userEmail} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/cart"
            element={
              <Cart deleteItems={handleDelete} showProducts={products} />
            }
          />
          <Route
            path="/products"
            element={
              <ItemList sendTheItems={sendItems} submitProd={submitProduct} />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/item"
            element={
              <Product submitProd={submitProduct} showTheItems={showItem} />
            }
          />
          {/* Pass handleLoginSuccess function to Login */}
          <Route
            path="/register"
            element={<Register handleLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/login"
            element={<Login handleLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
