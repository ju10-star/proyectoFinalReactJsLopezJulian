import express from "express"
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"
import { fileURLToPath } from "url"

const router = express.Router()

// 🔹 Resolver ruta absoluta de la base de datos
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.resolve(__dirname, "../database/products.db")
console.log("📂 Base de datos:", dbPath)

// 🔹 Conexión a SQLite y creación de tabla si no existe
const dbPromise = open({
  filename: dbPath,
  driver: sqlite3.Database
}).then(async (db) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      image TEXT,
      stock INTEGER DEFAULT 0
    )
  `)
  console.log("✅ Tabla 'products' verificada o creada correctamente")
  return db
})

// 🟢 GET - Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const db = await dbPromise
    const products = await db.all("SELECT * FROM products")
    res.json(products)
  } catch (error) {
    console.error("❌ Error al obtener productos:", error.message)
    res.status(500).json({ message: "Error al obtener productos" })
  }
})

// 🟡 GET - Obtener producto por ID
router.get("/:id", async (req, res) => {
  try {
    const db = await dbPromise
    const product = await db.get("SELECT * FROM products WHERE id = ?", [req.params.id])
    if (!product) return res.status(404).json({ message: "Producto no encontrado" })
    res.json(product)
  } catch (error) {
    console.error("❌ Error al obtener producto:", error.message)
    res.status(500).json({ message: "Error al obtener el producto" })
  }
})

// 🟢 POST - Crear producto nuevo
router.post("/", async (req, res) => {
  try {
    const { name, description, price, image, stock } = req.body
    const db = await dbPromise
    const result = await db.run(
      "INSERT INTO products (name, description, price, image, stock) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, image, stock]
    )
    res.status(201).json({ id: result.lastID, message: "Producto creado correctamente" })
  } catch (error) {
    console.error("❌ Error al crear producto:", error.message)
    res.status(400).json({ message: "Error al crear producto" })
  }
})

// 🟠 PUT - Actualizar producto por ID
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, image, stock } = req.body
    const db = await dbPromise
    const result = await db.run(
      "UPDATE products SET name = ?, description = ?, price = ?, image = ?, stock = ? WHERE id = ?",
      [name, description, price, image, stock, req.params.id]
    )

    if (result.changes === 0)
      return res.status(404).json({ message: "Producto no encontrado" })

    res.json({ message: "Producto actualizado correctamente" })
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error.message)
    res.status(500).json({ message: "Error al actualizar producto" })
  }
})

// 🔴 DELETE - Eliminar producto por ID
router.delete("/:id", async (req, res) => {
  try {
    const db = await dbPromise
    const result = await db.run("DELETE FROM products WHERE id = ?", [req.params.id])

    if (result.changes === 0)
      return res.status(404).json({ message: "Producto no encontrado" })

    res.json({ message: "Producto eliminado correctamente" })
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error.message)
    res.status(500).json({ message: "Error al eliminar producto" })
  }
})

export default router


