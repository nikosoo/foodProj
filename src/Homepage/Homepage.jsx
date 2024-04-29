import React, { useState, useEffect } from "react";
import fastFoodImage from "../assets/images/fast-food.jpg";
import deliveryImage from "../assets/images/delivery.webp";
import aboutus from "../assets/images/aboutus.jpg";
import burger from "../assets/images/burger1.svg";
import pizza from "../assets/images/pizza1.svg";
import chicken from "../assets/images/chicken1.svg";
import "./Homepage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [menu1, setMenu1] = useState(true);
  const [menu2, setMenu2] = useState(false);
  const [menu3, setMenu3] = useState(false);
  const [data, setData] = useState([]);

  const fetchDataFromDatabase = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/collections");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const onMenu1 = () => {
    setMenu1(true);
    setMenu2(false);
    setMenu3(false);
  };

  const onMenu2 = () => {
    setMenu1(false);
    setMenu2(true);
    setMenu3(false);
  };

  const onMenu3 = () => {
    setMenu1(false);
    setMenu2(false);
    setMenu3(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-16 sm:flex-row">
        <div className="mx-auto text-center sm:w-1/2 sm:mr-8 bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg p-8 pr-16">
          <h1 className="text-3xl font-bold text-gray-400 mt-8">
            Taste Haven:
            <span className="text-red-700">
              {" "}
              Savoring Every Flavor, Every Bite
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-md mx-auto mt-6 mb-4">
            Welcome to Taste Haven! Explore an array of delicious flavors and
            culinary delights with us. Join our journey as we discover and savor
            every bite, igniting your taste buds along the way.
          </p>
          <Link
            to="/products"
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Order
          </Link>
        </div>
        <img
          alt="fast-food"
          src={fastFoodImage}
          className="w-full sm:w-1/3 mx-auto border border-gray-300 shadow-md rounded-xl mt-4"
        />
      </div>

      <div className="mt-20 ">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-4xl text-black">
            How we can serve you and deliver your favorite food
          </h2>
          <p className="text-lg text-red-600 mt-4 max-w-md text-center">
            We always provide the best service for you and deliver your favorite
            food to your destination.
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-20">
        <img className="w-full max-w-lg" alt="delivery" src={deliveryImage} />
      </div>
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800 to-gray-600  ">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-semibold text-white mb-8">Menu</h3>
          <div className="flex flex-wrap justify-center">
            <button
              onClick={onMenu1}
              className="menu-button bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow mx-4 my-2"
            >
              Burgers
            </button>
            <button
              onClick={onMenu2}
              className="menu-button bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow mx-4 my-2"
            >
              Pizzas
            </button>
            <button
              onClick={onMenu3}
              className="menu-button bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow mx-4 my-2"
            >
              Fried chickens
            </button>
          </div>
          <div className="menu-images flex justify-center mt-6">
            {menu1 && (
              <img
                src={burger}
                width="70px"
                alt="menu-food"
                className="menu-image"
              />
            )}
            {menu2 && (
              <img
                src={pizza}
                width="70px"
                alt="menu-food"
                className="menu-image"
              />
            )}
            {menu3 && (
              <img
                src={chicken}
                width="70px"
                alt="menu-food"
                className="menu-image"
              />
            )}
          </div>
          <div className="mt-10 flex justify-center mb-8">
            {menu1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="menu-item bg-gray-200 border border-gray-500 shadow-md rounded-md p-6 flex flex-col justify-between hover:bg-yellow-300"
                  >
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <span className="text-gray-900 font-semibold">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {menu2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.slice(3, 6).map((item, index) => (
                  <div
                    key={index}
                    className="menu-item bg-gray-200 border border-gray-500 shadow-md rounded-md p-6 flex flex-col justify-between hover:bg-yellow-300"
                  >
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <span className="text-gray-900 font-semibold">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {menu3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.slice(8, 11).map((item, index) => (
                  <div
                    key={index}
                    className="menu-item bg-gray-200 border border-gray-500 shadow-md rounded-md p-6 flex flex-col justify-between hover:bg-yellow-300"
                  >
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <span className="text-gray-900 font-semibold">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/products"
            className="order-now bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            Order Now
          </Link>
        </div>
      </section>

      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mt-20 mb-20 gap-60">
        <div className="max-w-md mx-auto md:mr-4">
          <h3 className="text-xl font-semibold mb-4">About us</h3>
          <p className="text-gray-700">
            Taste Haven is your go-to fast-food destination for mouthwatering
            meals that are quick, convenient, and bursting with flavor. We pride
            ourselves on using fresh, locally-sourced ingredients to create a
            diverse menu inspired by global culinary traditions. Whether you're
            in the mood for a juicy burger, crispy fried chicken, or a
            refreshing salad, Taste Haven has something for everyone, including
            vegetarian and vegan options. Our welcoming atmosphere and friendly
            staff ensure that every visit is a delightful experience for you and
            your loved ones. At Taste Haven, we're committed to quality,
            convenience, and community. Join us for a meal and discover why
            Taste Haven is where flavor meets convenience, and every bite is an
            adventure.
          </p>
        </div>
        <img
          className="mt-8 md:mt-0 max-w-md mx-auto md:ml-4 border-2 border-red-500 rounded-full"
          alt="about-us"
          src={aboutus}
        />
      </div>
    </>
  );
};

export default HomePage;
