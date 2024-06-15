import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import ItemList from "./pages/ItemList/ItemList";
import Cart from "./pages/Cart/Cart";
import Homepage from "./pages/Homepage/Homepage";
import Footer from "./components/footer/Footer";
import Contact from "./pages/contact/Contact";
import Product from "./pages/product/Product";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import "./App.css";

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
          <Route path="/" element={<Homepage addToCart={submitProduct} />} />
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
