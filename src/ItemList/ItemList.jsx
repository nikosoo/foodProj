import React, { useState } from "react";
import data from "../Data";
import { Link } from "react-router-dom";

function ItemList({ submitProd, sendTheItems }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleBadgeClick = (category) => {
    setSelectedCategory(category);
  };

  const filterItemsByCategory = (categoryId) => {
    return data.filter((item) => {
      if (
        (categoryId === "burgers" && item.id >= 1 && item.id <= 3) ||
        (categoryId === "pizzas" && item.id >= 4 && item.id <= 7) ||
        (categoryId === "fried chicken" && item.id >= 8 && item.id <= 11)
      ) {
        return true;
      }
      return false;
    });
  };

  const filteredItems = selectedCategory
    ? filterItemsByCategory(selectedCategory)
    : data;

  const allItems = () => {
    setSelectedCategory(null);
  };

  return (
    <>
      <div class="flex justify-center mt-12 mb-10">
        <div class="flex space-x-2">
          <span
            onClick={allItems}
            class="inline-flex items-center gap-x-2 py-2 px-4 rounded-full text-sm font-medium bg-yellow-500 text-white cursor-pointer hover:bg-yellow-600"
          >
            All
          </span>
          <span
            onClick={() => handleBadgeClick("burgers")}
            class="inline-flex items-center gap-x-2 py-2 px-4 rounded-full text-sm font-medium bg-yellow-500 text-white cursor-pointer hover:bg-yellow-600"
          >
            Burger
          </span>
          <span
            onClick={() => handleBadgeClick("pizzas")}
            class="inline-flex items-center gap-x-2 py-2 px-4 rounded-full text-sm font-medium bg-yellow-500 text-white cursor-pointer hover:bg-yellow-600"
          >
            Pizza
          </span>
          <span
            onClick={() => handleBadgeClick("fried chicken")}
            class="inline-flex items-center gap-x-2 py-2 px-4 rounded-full text-sm font-medium bg-yellow-500 text-white cursor-pointer hover:bg-yellow-600"
          >
            Fried Chicken
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center mb-20">
        {filteredItems.map((item) => (
          <Link
            onClick={() => sendTheItems(item)}
            to="/item"
            key={item.id}
            className="relative flex flex-col mx-4 my-6 w-96 rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
          >
            <div className="relative h-96 overflow-hidden rounded-t-xl bg-white bg-clip-border">
              <img
                src={item.img}
                className="h-full w-full object-cover"
                alt={item.title}
              />
            </div>
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                  {item.title}
                </p>
                <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                  {item.price}$
                </p>
              </div>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                {item.description}
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => submitProd(item)}
                className="block w-full select-none rounded-lg bg-red-600 text-white py-3 px-6 text-center font-sans text-xs font-bold uppercase transition-transform hover:scale-105 focus:scale-105 focus:opacity-85 active:scale-100 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default ItemList;
