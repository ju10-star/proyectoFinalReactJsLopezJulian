import { useState, useEffect } from "react"

export default function ProductForm({ onSubmit, editingProduct }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: ""
  })

  // Si se edita un producto, se cargan los datos al formulario
  useEffect(() => {
    if (editingProduct) setForm(editingProduct)
  }, [editingProduct])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(form)
    setForm({ name: "", description: "", price: "", image: "", stock: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
      <input name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
      <input name="price" type="number" step="0.01" placeholder="Precio" value={form.price} onChange={handleChange} required />
      <input name="image" placeholder="URL Imagen" value={form.image} onChange={handleChange} />
      <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />
      <button type="submit">{editingProduct ? "Actualizar" : "Agregar"}</button>
    </form>
  )
}
