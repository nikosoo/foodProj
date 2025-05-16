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
      return navigate("/login");
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    console.log("🔍 Fetching items…");
    try {
      const res = await fetch("https://food-proj-nine.vercel.app/api/collections");
      if (!res.ok) throw new Error("Fetch failed " + res.status);
      const data = await res.json();
      console.log("📦 Fetched items:", data);
      setItems(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleAddItem = async e => {
    e.preventDefault();
    console.log("➕ Adding item:", { itemTitle, itemDescription, itemPrice, itemCategory, itemImg });
    try {
      const res = await fetch("https://food-proj-nine.vercel.app/api/collections/update", {
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
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Add failed ${res.status}: ${text}`);
      }
      setItemTitle("");
      setItemDescription("");
      setItemPrice("");
      setItemCategory("burgers");
      setItemImg("");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditItem = item => {
    setUpdateItemId(item._id);
    setItemTitle(item.title);
    setItemDescription(item.description);
    setItemPrice(item.price.toString());
    setItemCategory(item.category);
    setItemImg(item.img);
  };

  const handleUpdateItem = async e => {
    e.preventDefault();
    if (!updateItemId) return console.warn("⚠️ No item selected to update");

    // Try both possible endpoints: replace as needed
    const url1 = `https://food-proj-nine.vercel.app/api/collections/${updateItemId}`;
    const url2 = `https://food-proj-nine.vercel.app/api/collections/update/${updateItemId}`;

    console.log("✏️ Updating item", updateItemId, "→", url1);
    try {
      const res = await fetch(url1, {
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
      });
      if (!res.ok) {
        // try the alternative URL if first fails
        console.warn(`First URL failed ${res.status}, trying alternative…`);
        const res2 = await fetch(url2, {
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
        });
        if (!res2.ok) {
          const text = await res2.text();
          throw new Error(`Both update endpoints failed: ${res2.status}: ${text}`);
        }
      }
      console.log("✅ Update succeeded");
      // clear state
      setItemTitle("");
      setItemDescription("");
      setItemPrice("");
      setItemCategory("burgers");
      setItemImg("");
      setUpdateItemId(null);
      fetchData();
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  const handleDeleteItem = async itemId => {
    console.log("🗑 Deleting item", itemId);
    try {
      const res = await fetch(
        `https://food-proj-nine.vercel.app/api/collections/${itemId}`,
        {
          method: "DELETE",
          headers: { "auth-token": token },
        }
      );
      if (!res.ok) throw new Error("Delete failed " + res.status);
      setItems(items.filter(i => i._id !== itemId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-40 mx-auto p-4 font-poppins">
      {/* Add / Edit form */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-orange-500">
          {updateItemId ? "Edit Item" : "Add New Item"}
        </h3>
        <form onSubmit={updateItemId ? handleUpdateItem : handleAddItem} className="max-w-md">
          {/* … all your fields here … */}
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={itemTitle}
              onChange={e => setItemTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-sm text-gray-800"
            />
          </div>
          {/* Description, Price, Category, Img */}
          {/* … copy your other inputs … */}

          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600"
            >
              {updateItemId ? "Update Item" : "Add Item"}
            </button>
            {updateItemId && (
              <button
                type="button"
                onClick={() => setUpdateItemId(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Items list */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-orange-500">
          Items List
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item._id} className="border p-4 rounded-md shadow-sm bg-white">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-700">{item.description}</p>
              <p className="text-sm font-bold">${item.price}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditItem(item)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
