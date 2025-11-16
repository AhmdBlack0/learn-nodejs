import Product from "../models/products.model.js";

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, productImage } = req.body;
    const newProduct = new Product({ title, description, price, productImage });
    await newProduct.save();
    return res.status(201).json({ data: newProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().select("-__v");
    return res.status(200).json({ data: products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("-__v");
    if (!product) {
      return res.status(400).json({ data: "product not exists" });
    }
    return res.status(200).json({ data: product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ data: "delete" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// patch => one
// put => all
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const { title, description, price, productImage } = req.body;

    const updates = {};
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (price) updates.price = price;
    if (productImage) updates.productImage = productImage;

    await Product.findByIdAndUpdate(id, updates);
    res.status(200).json({ data: "updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
