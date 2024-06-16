import React, { useEffect } from "react";

function Product({ showTheItems, submitProd }) {
  // Scroll to the top of the page when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if showTheItems exists and has a valid price
  if (!showTheItems || !showTheItems.price || isNaN(showTheItems.price)) {
    return null; // or handle gracefully, e.g., display an error message
  }

  return (
    <div className="flex justify-center items-center mt-8">
      {/* Left side: Image */}
      <div className="flex flex-col justify-center md:flex-row md:space-x-8 shadow-md rounded-lg overflow-hidden bg-white w-full py-20 px-20">
        <div className="w-full md:w-1/4">
          <img
            className="w-full h-auto object-cover object-center rounded-lg"
            src={showTheItems.img}
            alt="food"
          />
        </div>

        {/* Right side: Description, Price, and Order button */}
        <div className="w-1/4 flex flex-col justify-center md:w-1/4">
          <h2 className="text-3xl font-bold text-orange-900 mb-2">
            {showTheItems.title}
          </h2>
          <p className="text-lg text-gray-700">{showTheItems.description}</p>
          <p className="text-orange-900 font-bold text-xl mt-4">
            ${showTheItems.price.toFixed(2)}
          </p>
          <button
            onClick={() => submitProd(showTheItems)}
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
