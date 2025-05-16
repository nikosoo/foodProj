import React from "react";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
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
import { addToCart, removeFromCart } from "./slices/cartSlice";
import { setProducts } from "./slices/productsSlice";
import { logout } from "./slices/authSlice";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51PP02SKeFipDxMHQFCuRGs2vgcGgI9ABL4nCF5rrjJ4mxDVeEM9MnqwYsEI5n0LbMyAyFNzJD911rSuJGjtoC9RA00xUeq3wPN"
);

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart);
  const userEmail = useSelector((state) => state.userEmail);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const cartItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

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
        dispatch(setProducts(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleLoginSuccess = (email) => {
    dispatch({ type: "user/setEmail", payload: email });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
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
                  addToCart={(item) => dispatch(addToCart(item))}
                  removeFromCart={(item) => dispatch(removeFromCart(item))}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  addToCart={(item) => dispatch(addToCart(item))}
                  removeFromCart={(item) => dispatch(removeFromCart(item))}
                />
              }
            />
            <Route path="/products" element={<ItemList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/item/:productName" element={<Product />} />
            <Route
  path="/admin"
  element={
    localStorage.getItem("isAdmin") === "true" ? (
      <AdminPage />
    ) : (
      <Navigate to="/" replace />
    )
  }
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
                <PrivateRoute
                  element={
                    <Elements stripe={stripePromise}>
                      <CheckoutPage products={cartItems} />
                    </Elements>
                  }
                />
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
