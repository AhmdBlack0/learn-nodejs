// express web server
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ahmdblack0_db_user:vTPz3g8DlKuDSU4D@cluster0.bdqztbp.mongodb.net/?appName=Cluster0"
    );
    console.log("connect DB");
  } catch (error) {
    console.log(error);
  }
};

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    default: "",
  },
});
const Product = mongoose.model("Product", productSchema);

connectDB();

app.post("/api/products/", async (req, res) => {
  try {
    const { title, description, price, productImage } = req.body;
    const newProduct = new Product({ title, description, price, productImage });
    await newProduct.save();
    return res.status(201).json({ data: newProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/api/products/", async (req, res) => {
  try {
    const products = await Product.find().select("-__v");
    return res.status(200).json({ data: products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("-__v");
    if (!product) {
      return res.status(400).json({ data: "product not exists" });
    }
    return res.status(200).json({ data: product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("running 3000");
}); // development
