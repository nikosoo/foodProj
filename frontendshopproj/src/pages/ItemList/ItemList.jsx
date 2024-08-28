import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../slices/productsSlice";
import { addToCart } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";

function ItemList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

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
  }, [dispatch, token]);

  const handleBadgeClick = (category) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (item) => {
    const productName = item.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/item/${productName}`);
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <div className="p-24">
      {/* Badge UI */}
      <div className="flex justify-center mt-12 mb-6 font-poppins">
        <div className="flex flex-wrap gap-2">
          {/* Badge Buttons */}
          <button
            onClick={() => handleBadgeClick(null)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300"
          >
            All
          </button>
          <button
            onClick={() => handleBadgeClick("burgers")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300"
          >
            Burgers
          </button>
          <button
            onClick={() => handleBadgeClick("pizzas")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300"
          >
            Pizzas
          </button>
          <button
            onClick={() => handleBadgeClick("fried chicken")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300"
          >
            Fried Chicken
          </button>
        </div>
      </div>

      {/* Item List */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 transform hover:scale-105"
                onClick={() => handleItemClick(item)}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemList;
