import { useEffect, useState } from "react";
import {
  getProducts,
  setProductVisibility,
  updateProduct,
  createProduct,
} from "../services/api";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getProducts(); // TODOS (visibles y no)
    setProducts(data);
  }

  async function handlePublish(p) {
    await setProductVisibility(p.id, 1);
    load();
  }

  async function handleUnpublish(p) {
    await setProductVisibility(p.id, 0);
    load();
  }

  async function handleSubmit(product) {
    if (editingProduct) {
      await updateProduct(editingProduct.id, product);
      setEditingProduct(null);
    } else {
      await createProduct(product); // crea como visible=0
    }
    load();
  }

  return (
    <div className="container">
      <h1>Panel de Administración</h1>

      <ProductForm onSubmit={handleSubmit} editingProduct={editingProduct} />

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            context="admin"
            onEdit={setEditingProduct}
            onPublish={handlePublish}
            onUnpublish={handleUnpublish}
          />
        ))}
      </div>
    </div>
  );
}
