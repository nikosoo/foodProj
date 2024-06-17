import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ItemList.css"; // Assuming you have a styles.css file for animations

function ItemList({ submitProd, sendTheItems }) {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your database endpoint
        const response = await fetch("http://localhost:5000/api/collections");
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

  const handleBadgeClick = (category) => {
    setSelectedCategory(category);
  };

  const filterItemsByCategory = (categoryId) => {
    return items.filter((item) => {
      // Adjust filtering logic based on your database structure
      return item.category === categoryId;
    });
  };

  const categoryOrder = ["burgers", "pizzas", "fried chicken"];

  const sortedItems = categoryOrder.flatMap((category) =>
    filterItemsByCategory(category)
  );

  const filteredItems = selectedCategory
    ? filterItemsByCategory(selectedCategory)
    : sortedItems;

  const allItems = () => {
    setSelectedCategory(null);
  };

  return (
    <>
      {/* Badge categories */}
      <div className="flex justify-center mt-12 mb-10 font-poppins">
        <div className="flex space-x-2">
          <span
            onClick={allItems}
            className={`inline-flex items-center gap-x-2 py-2 px-4 rounded-full text-sm font-medium ${
              selectedCategory === null
                ? "bg-yellow-700 text-white hover:bg-yellow-800"
                : "bg-yellow-500 text-gray-800 cursor-pointer hover:bg-yellow-600"
            }`}
          >
            All
          </span>
          <span
            onClick={() => handleBadgeClick("burgers")}
            className={`inline-flex items-center gap-x-2 py-2 px-4 rounded-full text-sm font-medium ${
              selectedCategory === "burgers"
                ? "bg-yellow-700 text-white hover:bg-yellow-800"
                : "bg-yellow-500 text-gray-800 cursor-pointer hover:bg-yellow-600"
            }`}
          >
            Burger
          </span>
          <span
            onClick={() => handleBadgeClick("pizzas")}
            className={`inline-flex items-center gap-x-2 py-2 px-4 rounded-full text-sm font-medium ${
              selectedCategory === "pizzas"
                ? "bg-yellow-700 text-white hover:bg-yellow-800"
                : "bg-yellow-500 text-gray-800 cursor-pointer hover:bg-yellow-600"
            }`}
          >
            Pizza
          </span>
          <span
            onClick={() => handleBadgeClick("fried chicken")}
            className={`inline-flex items-center gap-x-2 py-2 px-4 rounded-full text-sm font-medium ${
              selectedCategory === "fried chicken"
                ? "bg-yellow-700 text-white hover:bg-yellow-800"
                : "bg-yellow-500 text-gray-800 cursor-pointer hover:bg-yellow-600"
            }`}
          >
            Fried Chicken
          </span>
        </div>
      </div>

      {/* Render items */}
      <div className="flex flex-wrap justify-center mb-20 font-poppins">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col mx-4 my-6 w-96 rounded-xl bg-white shadow-md overflow-hidden product-card transform transition-transform hover:scale-105"
          >
            <Link
              onClick={() => sendTheItems(item)}
              to="/item"
              className="relative block h-72 overflow-hidden rounded-t-xl"
            >
              <img
                src={item.img}
                className="h-full w-full object-cover"
                alt={item.title}
              />
            </Link>
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="block text-base font-medium text-blue-gray-900">
                  {item.title}
                </p>
                <p className="block text-base font-medium text-blue-gray-900">
                  ${item.price}
                </p>
              </div>
              <p className="block text-sm text-gray-700">{item.description}</p>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => submitProd(item)}
                className="block w-full rounded-lg bg-orange-600 text-white py-3 px-6 text-xs font-bold uppercase transition-transform hover:scale-105 focus:scale-105 focus:opacity-85 active:scale-100 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ItemList;
