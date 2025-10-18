import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes.js"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/products", productRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas")
    app.listen(4000, () => console.log("🚀 Backend corriendo en http://localhost:4000"))
  })
  .catch(err => console.error("❌ Error al conectar MongoDB:", err))
