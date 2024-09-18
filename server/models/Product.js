import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    size: {
      type: String,
      required: true,
      max: 100,
      unique: true,
    },
    weight: {
      type: String,
      required: true,
      min: 5,
    },
    boxing: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: "",
    },
    picturePath: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
