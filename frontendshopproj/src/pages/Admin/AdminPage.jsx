import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [items, setItems] = useState([]);
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("burgers");
  const [itemImg, setItemImg] = useState("");
  const [updateItemId, setUpdateItemId] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
  if (!token) {
    navigate("/login");
    return;
  }

  fetchData();
}, [token, navigate]);


 

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://food-proj-nine.vercel.app/api/collections"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddItem = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://food-proj-nine.vercel.app/api/collections/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            title: itemTitle,
            description: itemDescription,
            price: parseFloat(itemPrice),
            category: itemCategory,
            img: itemImg,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      setItemTitle("");
      setItemDescription("");
      setItemPrice("");
      setItemCategory("burgers");
      setItemImg("");
      fetchData();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(
        `https://food-proj-nine.vercel.app/api/collections/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "auth-token": token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdateItem = async () => {
      e.preventDefault();              // ◀︎ stop the form from auto-submitting

    if (!updateItemId) return;

    try {
      const response = await fetch(
        `https://food-proj-nine.vercel.app/api/collections/${updateItemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            title: itemTitle,
            description: itemDescription,
            price: parseFloat(itemPrice),
            category: itemCategory,
            img: itemImg,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update item");
      }
      setItemTitle("");
      setItemDescription("");
      setItemPrice("");
      setItemCategory("burgers");
      setItemImg("");
      setUpdateItemId(null);
      fetchData();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleEditItem = (item) => {
    setUpdateItemId(item._id);
    setItemTitle(item.title);
    setItemDescription(item.description);
    setItemPrice(item.price.toString());
    setItemCategory(item.category);
    setItemImg(item.img);
  };

  return (
    <div className="container mt-40 mx-auto p-4 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-orange-500">Admin Page</h2>
       
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-orange-500">
          Add New Item
        </h3>
        <form onSubmit={handleAddItem} className="max-w-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
            >
              <option value="burgers">Burgers</option>
              <option value="pizzas">Pizzas</option>
              <option value="fried chicken">Fried Chicken</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={itemImg}
              onChange={(e) => setItemImg(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600"
          >
            Add Item
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-orange-500">
          Items List
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-md shadow-sm bg-white"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-700">{item.description}</p>
              <p className="text-sm text-gray-900 font-bold">${item.price}</p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md text-sm mr-2 hover:bg-red-600"
                  onClick={() => handleDeleteItem(item._id)}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                  onClick={() => handleEditItem(item)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {updateItemId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4 text-orange-500">
              Edit Item
            </h3>
            <form onSubmit={handleUpdateItem}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
                >
                  <option value="burgers">Burgers</option>
                  <option value="pizzas">Pizzas</option>
                  <option value="fried chicken">Fried Chicken</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={itemImg}
                  onChange={(e) => setItemImg(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600"
                >
                  Update Item
                </button>
                <button
                  type="button"
                  onClick={() => setUpdateItemId(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md text-sm ml-4"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
