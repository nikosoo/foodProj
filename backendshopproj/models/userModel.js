// models/userModel.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email:    { type:String, required:true, unique:true },
  password: { type:String, required:true },
  isAdmin:  { type:Boolean, default:false },    // ← new field
});

const User = mongoose.model("User", UserSchema);
export default User;
