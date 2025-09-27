const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");


const router = express.Router();

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder tujuan
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nama unik
  }
});
const upload = multer({ storage });

// Tambah produk + upload gambar
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
