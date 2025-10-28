import { useEffect, useState } from "react";
import { getPublicProducts } from "../services/api";
import ProductCard from "./ProductCard";
import "./ProductList.css";

export default function ProductListPublic() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getPublicProducts(); //  solo visibles
    setProducts(data);
  }

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      <div className="product-grid">
        {products.map((p, index) => (
          <ProductCard key={p.id || index} product={p} />
        ))}
      </div>
    </div>
  );
}
