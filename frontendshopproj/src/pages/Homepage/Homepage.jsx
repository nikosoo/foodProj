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
      const response = await fetch(
        "https://food-proj-nine.vercel.app/api/collections"
      );
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
        className="mx-auto w-[90%] sm:w-[80%] rounded-lg py-20 sm:py-40 mt-40 bg-cover bg-center"
      >
        <div className="flex flex-col justify-center items-start w-full md:w-[40%] sm:w-[80%] px-4 sm:px-8 opacity-0 animate-fade-in font-poppins">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-200 mt-8">
            Savoring Every Flavor, Every Bite
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-200 mt-6 mb-4 max-sm:w-2/4">
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
        <h3 className="text-2xl md:text-3xl font-semibold text-dark text-center mb-4">
          Explore Our Menu
        </h3>
        <p className="text-base md:text-lg text-center mb-8">
          Discover our menu of pizzas, burgers, and fried chicken, all made with
          the finest ingredients. Satisfy your cravings with cheesy pizzas,
          juicy burgers, and crispy fried chicken. Enjoy every bite!
        </p>

        <div className="mt-10 flex flex-col md:flex-row justify-center items-center mb-8 gap-8 font-poppins">
          {["burgers", "pizzas", "fried chicken"].map((category, index) => (
            <div className="text-center flex flex-col items-center" key={index}>
              {data
                .filter((item) => item.category === category)
                .slice(0, 1)
                .map((item, index) => (
                  <div key={index}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className={`rounded-full w-24 h-24 md:w-32 md:h-32 object-cover mb-4 hover:scale-105 transition-transform duration-300 ${
                        activeCategory === category
                          ? "border-4 border-orange-500"
                          : ""
                      }`}
                      onClick={() => handleImageClick(category)}
                    />
                  </div>
                ))}
              <p className="text-lg md:text-xl font-medium">{category}</p>
            </div>
          ))}
        </div>
        <hr className="border-t-2 border-gray-300 mt-8 mx-auto w-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 font-poppins">
        <h3 className="text-2xl md:text-3xl font-semibold text-orange-700 text-center mb-4">
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
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 border border-orange-200 transform transition-transform duration-500 hover:scale-105"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="rounded-lg w-full h-32 md:h-40 object-cover mb-4"
                />
                <h4 className="text-lg font-semibold text-orange-800">
                  {item.title}
                </h4>
                <p className="text-orange-600">{item.description}</p>
                <p className="mt-2 text-orange-900 font-bold">${item.price}</p>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => removeFromCart(item)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-3 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2 text-orange-700">
                    {products.find((prod) => prod.id === item.id)?.quantity ||
                      0}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-3 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mt-20 mb-20 gap-16 font-poppins px-4">
        <div className="max-w-md mx-auto md:mr-8">
          <h3 className="text-2xl font-bold text-red-500 mb-6">About Us</h3>
          <p className="text-gray-800 leading-relaxed">
            Welcome to <span className="font-semibold">Taste Haven</span> - your
            ultimate destination for fast, flavorful, and fresh meals. Our
            diverse menu, inspired by global culinary traditions, features
            everything from juicy burgers and crispy fried chicken to refreshing
            salads, all crafted with locally-sourced ingredients.
          </p>
          <p className="text-gray-800 leading-relaxed mt-4">
            Whether you're craving a hearty meal or a light bite, we have
            something for everyone, including vegetarian and vegan options. Our
            friendly staff and inviting atmosphere make every visit a delightful
            experience. At Taste Haven, we are dedicated to quality,
            convenience, and community.
          </p>
          <p className="text-gray-800 leading-relaxed mt-4">
            Join us and discover why Taste Haven is where flavor meets
            convenience, and every bite is an adventure.
          </p>
        </div>
        <img
          className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto border-2 border-orange-500 rounded-3xl transition-transform duration-500 transform hover:scale-110"
          alt="About Us"
          src={aboutus}
        />
      </div>
    </>
  );
};

export default HomePage;
