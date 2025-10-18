import express from "express"
import Product from "../models/product.js"

const router = express.Router()

// GET /api/products → lista de productos
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" })
  }
})

// POST /api/products → crear producto nuevo
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body)
    const saved = await product.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ message: "Error al crear producto" })
  }
})

export default router
