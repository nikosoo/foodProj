import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  category: String,
  img: String,
});

export default mongoose.model("Collection", CollectionSchema);
