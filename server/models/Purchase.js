import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    id:{
      type:String,
      required:true
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 100,
    },
    phone: {
      type: String,
      required: true,
      min: 5,
    },
    purchaseDate: {
      type: String,
      default: "",
    },
    deliveryDate: {
      type: String,
      default: "",
    },
    trackingNumber: {
      type: String,
      default: "",
    },
    totalPrice: {
      type: Number,
      default: "",
    },
    contents: {
      type: Array,
      default: [],
    },
    comments: {
      type: String,
      default: "",
    },
    picturePath: String,
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", PurchaseSchema);
export default Purchase;
