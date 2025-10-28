// server/routes/productRoutes.js
import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const router = express.Router();

// Abrimos/creamos la DB
const dbPromise = open({
  filename: "./database/products.db",
  driver: sqlite3.Database,
});

// Inicialización/migración ligera de la tabla
async function ensureSchema() {
  const db = await dbPromise;

  // Crea tabla si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      image TEXT,
      stock INTEGER DEFAULT 0
    );
  `);

  // Agrega columnas nuevas si no existen (ignora errores de "duplicate column")
  const addColumn = async (sql) => {
    try { await db.exec(sql); } catch (_) {}
  };

  await addColumn(`ALTER TABLE products ADD COLUMN is_public INTEGER DEFAULT 1;`);
  await addColumn(`ALTER TABLE products ADD COLUMN is_active INTEGER DEFAULT 1;`);

  // Pon default 1 en nulos viejos por si quedaron en NULL
  await db.exec(`UPDATE products SET is_public = 1 WHERE is_public IS NULL;`);
  await db.exec(`UPDATE products SET is_active = 1 WHERE is_active IS NULL;`);
}
ensureSchema();

/* ========== RUTAS ========== */

// LISTAR productos
// - normal: devuelve todos (compatibilidad con tu frontend actual)
// - si pasás ?public=1 -> solo publicados y activos
router.get("/", async (req, res) => {
  try {
    const db = await dbPromise;
    const onlyPublic = req.query.public === "1";

    const rows = onlyPublic
      ? await db.all(
          "SELECT * FROM products WHERE is_public = 1 AND is_active = 1 ORDER BY id DESC"
        )
      : await db.all("SELECT * FROM products ORDER BY id DESC");

    res.json(rows);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

// OBTENER por id
router.get("/:id", async (req, res) => {
  try {
    const db = await dbPromise;
    const row = await db.get("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);
    if (!row) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(row);
  } catch (err) {
    console.error("Error al obtener producto:", err);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
});

// CREAR
router.post("/", async (req, res) => {
  try {
    const { name, description, price, image, stock, is_public, is_active } =
      req.body;

    if (!name || price == null)
      return res.status(400).json({ message: "name y price son obligatorios" });

    const db = await dbPromise;
    const result = await db.run(
      `INSERT INTO products (name, description, price, image, stock, is_public, is_active)
       VALUES (?, ?, ?, ?, ?, COALESCE(?,1), COALESCE(?,1))`,
      [name, description || "", Number(price), image || "", Number(stock) || 0, is_public, is_active]
    );

    const created = await db.get("SELECT * FROM products WHERE id = ?", [
      result.lastID,
    ]);
    res.status(201).json(created);
  } catch (err) {
    console.error("Error al crear producto:", err);
    res.status(400).json({ message: "Error al crear producto" });
  }
});

// ACTUALIZAR (PUT)
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, image, stock, is_public, is_active } =
      req.body;

    const db = await dbPromise;

    const result = await db.run(
      `UPDATE products
       SET name = ?, description = ?, price = ?, image = ?, stock = ?,
           is_public = COALESCE(?, is_public),
           is_active = COALESCE(?, is_active)
       WHERE id = ?`,
      [
        name,
        description || "",
        Number(price),
        image || "",
        Number(stock) || 0,
        typeof is_public === "number" ? is_public : null,
        typeof is_active === "number" ? is_active : null,
        req.params.id,
      ]
    );

    if (result.changes === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    const updated = await db.get("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);
    res.json(updated);
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
});

// ELIMINAR
router.delete("/:id", async (req, res) => {
  try {
    const db = await dbPromise;
    const result = await db.run("DELETE FROM products WHERE id = ?", [
      req.params.id,
    ]);
    if (result.changes === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
});

// Publicar / despublicar rápidamente (opcional)
router.patch("/:id/publish", async (req, res) => {
  try {
    const db = await dbPromise;
    const { is_public } = req.body; // 0 ó 1
    const result = await db.run(
      "UPDATE products SET is_public = ? WHERE id = ?",
      [Number(is_public) ? 1 : 0, req.params.id]
    );
    if (result.changes === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    const updated = await db.get("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);
    res.json(updated);
  } catch (err) {
    console.error("Error al cambiar publish:", err);
    res.status(500).json({ message: "Error al cambiar publish" });
  }
});

// Activar / desactivar (opcional)
router.patch("/:id/active", async (req, res) => {
  try {
    const db = await dbPromise;
    const { is_active } = req.body; // 0 ó 1
    const result = await db.run(
      "UPDATE products SET is_active = ? WHERE id = ?",
      [Number(is_active) ? 1 : 0, req.params.id]
    );
    if (result.changes === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    const updated = await db.get("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);
    res.json(updated);
  } catch (err) {
    console.error("Error al cambiar active:", err);
    res.status(500).json({ message: "Error al cambiar active" });
  }
});

export default router;
