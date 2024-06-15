import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fastFoodImage from "../../assets/images/fast-food.jpg";
import deliveryImage from "../../assets/images/delivery.webp";
import aboutus from "../../assets/images/aboutus.jpg";
import bgImage from "../../assets/images/fastfood.jpg";
import "./Homepage.css";

const HomePage = ({ products, addToCart, removeFromCart }) => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

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

  const handleImageClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setActiveCategory(null);
    } else {
      setSelectedCategory(category);
      setActiveCategory(category);
    }
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="mx-auto w-[90%] rounded-lg py-40 mt-10"
      >
        <div className="flex flex-col justify-center w-[40%] ml-8 opacity-0 animate-fade-in font-poppins">
          <h1 className="text-3xl font-bold text-gray-200 mt-8">
            Savoring Every Flavor, Every Bite
          </h1>
          <p className="text-lg text-gray-200 max-w-md mt-6 mb-4">
            Welcome to Taste Haven! Explore an array of delicious flavors and
            culinary delights with us. Join our journey as we discover and savor
            every bite, igniting your taste buds along the way.
          </p>

          <Link
            to="/products"
            className="w-20 mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded"
          >
            Order
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 font-poppins">
        <h3 className="text-3xl font-semibold text-dark text-center mb-4">
          Explore Our Menu
        </h3>
        <p className="text-lg text-center mb-8">
          Discover our menu of pizzas, burgers, and fried chicken, all made with
          the finest ingredients. Satisfy your cravings with cheesy pizzas,
          juicy burgers, and crispy fried chicken. Enjoy every bite!
        </p>

        <div className="mt-10 flex flex-col md:flex-row justify-center items-center mb-8 gap-8">
          {["burgers", "pizzas", "fried chicken"].map((category, index) => (
            <div className="text-center" key={index}>
              {data
                .filter((item) => item.category === category)
                .slice(0, 1)
                .map((item, index) => (
                  <div key={index}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className={`rounded-full w-32 h-32 object-cover mb-4 hover:scale-105 transition-transform duration-300 ${
                        activeCategory === category
                          ? "border-4 border-orange-500"
                          : ""
                      }`}
                      onClick={() => handleImageClick(category)}
                    />
                  </div>
                ))}
              <p className="text-xl font-medium">{category}</p>
            </div>
          ))}
        </div>
        <hr className="border-t-2 border-gray-300 mt-8 mx-auto w-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 font-poppins">
        <h3 className="text-3xl font-semibold text-dark text-center mb-4">
          {selectedCategory
            ? `${
                selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)
              }`
            : "All Products"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data
            .filter(
              (item) => !selectedCategory || item.category === selectedCategory
            )
            .map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="rounded-lg w-full h-40 object-cover mb-4"
                />
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
                <p className="mt-2 text-gray-900 font-bold">${item.price}</p>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => removeFromCart(item)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">
                    {products.find((prod) => prod.id === item.id)?.quantity ||
                      0}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

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
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto border-2 border-red-500 rounded-full"
          alt="about-us"
          src={aboutus}
        />
      </div>
    </>
  );
};

export default HomePage;
