import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  category: String,
  img: String,
});

const Collection = mongoose.model("Collection", CollectionSchema);

export default Collection;
