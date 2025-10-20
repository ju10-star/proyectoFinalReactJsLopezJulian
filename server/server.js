import express from "express"
import cors from "cors"
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import productRoutes from "./routes/productRoutes.js"

const app = express()
app.use(cors())
app.use(express.json())

// conexión a la base de datos
export const dbPromise = open({
  filename: "./database/products.db",
  driver: sqlite3.Database
})

// 🔹 Usar las rutas importadas
app.use("/api/products", productRoutes)

//levantar servidor
app.listen(4000, () => {
  console.log("servidor corriendo en http://localhost:4000")
})

