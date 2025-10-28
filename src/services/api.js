const API_URL = "http://localhost:4000/api/products";

/*  OBTENER PRODUCTOS */

// Todos los productos (modo admin)
export async function getProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}


/* CRUD BÁSICO */

// Crear producto
export async function createProduct(product) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
}

// Actualizar producto
export async function updateProduct(id, product) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
}

// Eliminar producto
export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar producto");
  return res.json();
}

/*  CAMBIAR VISIBILIDAD */

// Obtener solo productos públicos
export async function getPublicProducts() {
  const res = await fetch(`${API_URL}?public=1`);
  return res.json();
}
// Cambiar visibilidad de un producto
export async function setProductVisibility(id, is_public) {
  const res = await fetch(`${API_URL}/${id}/visibility`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_public }),
  });
  return res.json();
}
