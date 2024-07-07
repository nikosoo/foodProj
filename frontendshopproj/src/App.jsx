import React, { useState, useEffect } from "react";
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
import AdminPage from "./pages/Admin/AdminPage";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51PP02SKeFipDxMHQFCuRGs2vgcGgI9ABL4nCF5rrjJ4mxDVeEM9MnqwYsEI5n0LbMyAyFNzJD911rSuJGjtoC9RA00xUeq3wPN"
);

function App() {
  const initialProducts = JSON.parse(localStorage.getItem("cartItems")) || [];
  const [products, setProducts] = useState(initialProducts);
  const [items, setItems] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://food-proj-nine.vercel.app/api/collections"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(products));
    const totalCount = products.reduce((acc, curr) => acc + curr.quantity, 0);
    setCartItemsCount(totalCount);
  }, [products]);

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
  };

  const handleLoginSuccess = (email) => {
    setUserEmail(email);
  };

  const handleLogout = () => {
    setUserEmail("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header
          userEmail={userEmail}
          handleLogout={handleLogout}
          cartItemsCount={cartItemsCount}
        />
        <main className="flex-grow">
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
              element={
                <ItemList sendTheItems={setItems} submitProd={addToCart} />
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/item/:productName"
              element={<Product submitProd={addToCart} showTheItems={items} />}
            />
            <Route path="/admin" element={<AdminPage />} />
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
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
