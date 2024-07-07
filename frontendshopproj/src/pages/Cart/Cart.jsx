import { useState } from "react";
import { Link } from "react-router-dom";

function Cart({ showProducts, addToCart, removeFromCart }) {
  const calculateTotalPrice = () => {
    let total = 0;
    showProducts.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <div className="container mx-auto max-w-7xl mt-40">
      <div className="overflow-x-auto sm:rounded-lg">
        <div className="sm:max-w-7xl md:max-w-7xl lg:max-w-7xl xl:max-w-7xl">
          <table className="w-full text-xs sm:text-xxs lg:text-xl text-left rtl:text-right text-gray-500 lg:rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-2 py-2 sm:px-2 sm:py-2 lg:px-5 lg:py-4">
                  Product
                </th>
                <th className="px-2 py-2 sm:px-2 sm:py-2 lg:px-5 lg:py-4">
                  Price
                </th>
                <th className="px-2 py-2 sm:px-2 sm:py-2 lg:px-5 lg:py-4">
                  Qty
                </th>
                <th className="px-2 py-2 sm:px-2 sm:py-2 lg:px-5 lg:py-4">
                  Total
                </th>
                <th className="px-2 py-2 sm:px-2 sm:py-2 lg:px-5 lg:py-4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {showProducts.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-2 py-2 sm:px-2 sm:py-2 lg:px-5 lg:py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6 sm:h-5 sm:w-5 lg:h-10 lg:w-10">
                        <img
                          className="h-8 w-8 sm:h-5 sm:w-5 rounded-full lg:h-12 lg:w-12"
                          src={item.img}
                          alt={item.title}
                        />
                      </div>
                      <div className="ml-1 sm:ml-0.5 lg:ml-3">
                        <div className="text-xs sm:text-xxs font-medium text-gray-900 lg:text-xl">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-2 py-2 sm:px-2 sm:py-2 lg:px-5 lg:py-4">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-2 py-2 sm:px-2 sm:py-2 lg:px-5 lg:py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold w-6 h-6 sm:w-5 sm:h-5 lg:w-8 lg:h-8 rounded text-xs sm:text-xxxs lg:text-base flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="mx-1 sm:mx-0.5 lg:mx-1.5 lg:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold w-6 h-6 sm:w-5 sm:h-5 lg:w-8 lg:h-8 rounded text-xs sm:text-xxxs lg:text-base flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-2 py-2 sm:px-2 sm:py-2 lg:px-5 lg:py-4">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showProducts.length === 0 && (
        <p className="mt-4 text-center text-xs sm:text-xxs lg:text-xl">
          No items
        </p>
      )}
      {showProducts.length > 0 && (
        <div className="flex justify-between items-center mb-8 mt-4 flex-col sm:flex-row">
          <p className="text-sm font-semibold text-gray-800 sm:text-xxs lg:text-xl">
            Total:{" "}
            <span className="text-orange-600">
              ${calculateTotalPrice().toFixed(2)}
            </span>
          </p>
          <Link
            to="/checkout"
            className="mt-4 lg:mt-0 sm:text-xxs lg:text-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1.5 px-3 sm:py-1 sm:px-2 lg:py-1.5 lg:px-4 rounded inline-block text-xs sm:text-xxxs"
          >
            Proceed to checkout
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
