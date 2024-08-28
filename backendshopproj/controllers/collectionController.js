import Collection from "../models/collectionModel.js";
import stripe from "../config/stripe.js";

export const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({ error: "Failed to create PaymentIntent" });
  }
};

export const createCollection = async (req, res) => {
  const { id, title, description, price, category, img } = req.body;

  try {
    const newCollection = new Collection({
      id,
      title,
      description,
      price,
      category,
      img,
    });
    await newCollection.save();
    res.status(201).json(newCollection);
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({ error: "Failed to create collection" });
  }
};

export const updateCollection = async (req, res) => {
  const collectionId = req.params.id;
  const { title, description, price, category, img } = req.body;

  try {
    // Attempt to update the collection by ID
    const updatedCollection = await Collection.findByIdAndUpdate(
      collectionId,
      { title, description, price, category, img },
      { new: true } // Return the updated document
    );

    // If no document is found with the given ID
    if (!updatedCollection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    // Respond with the updated collection
    res.json(updatedCollection);
  } catch (error) {
    // Log and respond with error status
    console.error("Error updating collection:", error);
    res.status(500).json({ error: "Failed to update collection" });
  }
};

export const deleteCollection = async (req, res) => {
  const collectionId = req.params.id;

  try {
    const deletedCollection = await Collection.findByIdAndDelete(collectionId);

    if (!deletedCollection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    res.json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error("Error deleting collection:", error);
    res.status(500).json({ error: "Failed to delete collection" });
  }
};

export const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find({});
    res.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Failed to fetch collections" });
  }
};
