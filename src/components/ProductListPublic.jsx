import "./ProductList.css";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "./ProductCard";

export default function ProductListPublic() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  return (
    <div className="product-list-container">
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
}
