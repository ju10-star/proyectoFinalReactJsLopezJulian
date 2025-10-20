import { useEffect, useState } from "react"
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../services/api"
import ProductForm from "./productForm"
import ProductCard from "./productCard"

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    const data = await getProducts()
    setProducts(data)
  }

  async function handleSubmit(product) {
    if (editingProduct) {
      await updateProduct(editingProduct.id, product)
      setEditingProduct(null)
    } else {
      await createProduct(product)
    }
    loadProducts()
  }

  async function handleDelete(id) {
    await deleteProduct(id)
    loadProducts()
  }

  function handleEdit(product) {
    setEditingProduct(product)
  }

  return (
    <div>
      <ProductForm onSubmit={handleSubmit} editingProduct={editingProduct} />
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}
