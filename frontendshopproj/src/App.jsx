import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Header from "./components/header/Header";
import ItemList from "./pages/ItemList/ItemList";
import Cart from "./pages/Cart/Cart";
import Homepage from "./pages/Homepage/Homepage";
import Footer from "./components/footer/Footer";
import Contact from "./pages/contact/Contact";
import Product from "./pages/product/Product";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import CheckoutPage from "./pages/Checkout/Checkout";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51PP02SKeFipDxMHQFCuRGs2vgcGgI9ABL4nCF5rrjJ4mxDVeEM9MnqwYsEI5n0LbMyAyFNzJD911rSuJGjtoC9RA00xUeq3wPN"
);

function App() {
  const [products, setProducts] = useState([]);
  const [showItem, setShowItems] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const addToCart = (selectedItem) => {
    const existingProduct = products.find(
      (product) => product.id === selectedItem.id
    );
    if (existingProduct) {
      setProducts(
        products.map((product) =>
          product.id === selectedItem.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    } else {
      setProducts([...products, { ...selectedItem, quantity: 1 }]);
    }
    setCartItemsCount(cartItemsCount + 1);
  };

  const removeFromCart = (selectedItem) => {
    const existingProduct = products.find(
      (product) => product.id === selectedItem.id
    );
    if (existingProduct.quantity > 1) {
      setProducts(
        products.map((product) =>
          product.id === selectedItem.id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    } else {
      setProducts(products.filter((product) => product.id !== selectedItem.id));
    }
    setCartItemsCount(cartItemsCount - 1);
  };

  const sendItems = (item) => {
    setShowItems(item);
    console.log(item);
  };

  const handleLoginSuccess = (email) => {
    setUserEmail(email);
  };

  const handleLogout = () => {
    setUserEmail("");
  };

  return (
    <Router>
      <Header
        userEmail={userEmail}
        handleLogout={handleLogout}
        cartItemsCount={cartItemsCount}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              products={products}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              showProducts={products}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/products"
          element={<ItemList sendTheItems={sendItems} submitProd={addToCart} />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/item"
          element={<Product submitProd={addToCart} showTheItems={showItem} />}
        />
        <Route
          path="/register"
          element={<Register handleLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/login"
          element={<Login handleLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <CheckoutPage products={products} />
            </Elements>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
