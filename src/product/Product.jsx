function Product({ showTheItems, submitProd }) {
  console.log("Received items in Product component:", showTheItems);
  return (
    <div className="max-w-md mx-auto bg-yellow-100 rounded-xl overflow-hidden shadow-xl mb-20 mt-20">
      <img
        className="w-full border border-gray-200"
        src={showTheItems.img}
        alt="food"
      />
      <div className="p-4">
        <div className="font-bold text-xl mb-2">{showTheItems.title}</div>
        <p className="text-gray-700 text-base">{showTheItems.description}</p>
        <p className="text-gray-900 font-bold text-lg mt-2">
          ${showTheItems.price}
        </p>
        <button
          onClick={() => submitProd(showTheItems)}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}

export default Product;
