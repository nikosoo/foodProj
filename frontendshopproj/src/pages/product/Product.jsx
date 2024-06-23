import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Product({ showTheItems, submitProd }) {
  const { productName } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Function to fetch items in case showTheItems is not provided
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://food-proj-nine.vercel.app/api/collections"
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

    // Check if showTheItems is provided and is an array
    if (Array.isArray(showTheItems) && showTheItems.length > 0) {
      const item = showTheItems.find(
        (item) => item.title.toLowerCase().replace(/\s+/g, "-") === productName
      );
      setSelectedItem(item);
    } else {
      fetchItems();
    }

    window.scrollTo(0, 0);
  }, [productName, showTheItems]);

  if (!selectedItem) {
    return <div>Loading...</div>; // or handle gracefully, e.g., display a loading spinner
  }

  return (
    <div className="flex justify-center items-center mt-40 font-poppins">
      <div className="flex flex-col justify-center md:flex-row md:space-x-8 shadow-md rounded-lg overflow-hidden bg-white w-full py-20 px-20">
        <div className="w-full md:w-1/4">
          <img
            className="w-full h-auto object-cover object-center rounded-lg"
            src={selectedItem.img}
            alt="food"
          />
        </div>

        <div className="w-1/4 flex flex-col justify-center md:w-1/4">
          <h2 className="text-3xl font-bold text-orange-900 mb-2">
            {selectedItem.title}
          </h2>
          <p className="text-lg text-gray-700">{selectedItem.description}</p>
          <p className="text-orange-900 font-bold text-xl mt-4">
            ${selectedItem.price.toFixed(2)}
          </p>
          <button
            onClick={() => submitProd(selectedItem)}
            className="mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg text-lg shadow-md self-start md:self-center "
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
