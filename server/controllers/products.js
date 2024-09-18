import Product from "../models/Product.js";

/* REGISTER USER */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

