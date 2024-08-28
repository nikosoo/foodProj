import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";

function Product({ showTheItems }) {
  const { productName } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://food-proj-nine.vercel.app/api/collections",
          {
            headers: {
              "auth-token": token, // Include the token here
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const item = data.find(
          (item) =>
            item.title.toLowerCase().replace(/\s+/g, "-") === productName
        );
        setSelectedItem(item);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (showTheItems && showTheItems.length > 0) {
      const item = showTheItems.find(
        (item) => item.title.toLowerCase().replace(/\s+/g, "-") === productName
      );
      setSelectedItem(item);
    } else {
      fetchItems();
    }

    window.scrollTo(0, 0);
  }, [productName, showTheItems, token]);

  if (!selectedItem) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(selectedItem));
  };

  return (
    <div className="flex justify-center items-center mt-20 font-poppins px-4 sm:px-6 lg:px-8 mt-40">
      <div className="flex flex-col md:flex-row md:space-x-8 rounded-lg overflow-hidden bg-white w-full max-w-screen-lg py-10 md:py-20">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <img
            className="w-full h-auto object-cover object-center rounded-lg"
            src={selectedItem.img}
            alt={selectedItem.title}
          />
        </div>
        <div className="flex flex-col justify-center w-full mt-4 md:mt-0 md:w-1/2 lg:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-900 mb-2">
            {selectedItem.title}
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            {selectedItem.description}
          </p>
          <p className="text-orange-900 font-bold text-xl mt-4">
            ${selectedItem.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg text-lg self-start"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
