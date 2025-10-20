const API_URL = "http://localhost:4000/api/products"

// Obtener todos los productos
export async function getProducts() {
  const res = await fetch(API_URL)
  return res.json()
}

// Obtener un producto por ID
export async function getProduct(id) {
  const res = await fetch(`${API_URL}/${id}`)
  return res.json()
}

// Crear producto
export async function createProduct(product) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  })
  return res.json()
}

// Actualizar producto
export async function updateProduct(id, product) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  })
  return res.json()
}

// Eliminar producto
export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
  return res.json()
}
