import { useState, useEffect } from "react";

function Cart({ showProducts, addToCart, removeFromCart }) {
  const placeOrder = () => {
    alert("Your order has been placed");
    window.location.reload();
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < showProducts.length; i++) {
      total += showProducts[i].price * showProducts[i].quantity;
    }
    return total;
  };

  return (
    <div
      className={`container mx-auto max-w-4xl mt-8 px-4 ${
        showProducts.length > 0 ? "mb-[25%]" : "mb-[30%]"
      }`}
    >
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {showProducts.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.title}
                </th>
                <td className="px-6 py-4">
                  <img src={item.img} alt={item.title} className="h-10 w-10" />
                </td>
                <td className="px-6 py-4">{item.price}$</td>
                <td className="px-6 py-4 flex items-center">
                  <button
                    onClick={() => removeFromCart(item)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded"
                  >
                    +
                  </button>
                </td>
                <td className="px-6 py-4">
                  {(item.price * item.quantity).toFixed(2)}$
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="font-medium text-red-600 hover:text-red-700 dark:text-blue-500 dark:hover:text-blue-600"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showProducts.length < 1 && <p className="mt-4">No items</p>}
      {showProducts.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-semibold text-gray-800">
            Total:{" "}
            <span className="text-red-600">
              {calculateTotalPrice().toFixed(2)}$
            </span>
          </p>
          <button
            onClick={placeOrder}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Place order
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
