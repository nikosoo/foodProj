import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./header/Header";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ItemList from "./ItemList/ItemList";
import Cart from "./Cart/Cart";
import data from "./Data";
import Homepage from "./Homepage/Homepage";
import Footer from "./footer/Footer";
import Contact from "./contact/Contact";
import Product from "./product/Product";

function App() {
  const [products, setProducts] = useState([]);
  const [showItem, setShowItems] = useState([]);

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

  return (
    <>
      <Router>
        <Header />
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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
