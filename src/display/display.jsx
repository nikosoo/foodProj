import React, { useState, useEffect } from "react";
import axios from "axios";

const CollectionsComponent = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/collections"
        );
        console.log("Response data:", response.data); // Log the response data
        if (!Array.isArray(response.data)) {
          // If the response data is not an array, set collections to an empty array
          setCollections([]);
          console.error("Invalid collections data format");
          return;
        }
        setCollections(response.data);
      } catch (error) {
        console.error(error);
        // Handle error appropriately, e.g., show an error message to the user
      }
    };

    fetchCollections();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <div>
      <h1>Collections</h1>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <h2>{collection.title}</h2>
            <p>Description: {collection.description}</p>
            <p>Price: ${collection.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionsComponent;
