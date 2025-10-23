import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "../services/api";
import { CartContext } from "../context/CartContext";
import "../components/ProductList.css";

export default function ProductDetail() {
  const { id } = useParams(); // 👈 obtiene el ID desde la URL (/detalle/:id)
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    const products = await getProducts();
    const found = products.find((p) => p.id === parseInt(id));
    setProduct(found || null);
  }

  if (!product) {
    return (
      <div className="product-detail">
        <h2>Producto no encontrado</h2>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <Link to="/" className="back-link">← Volver al inicio</Link>

      <div className="detail-card">
        <img
          src={
            product.image
              ? new URL(`../assets/${product.image}`, import.meta.url).href
              : "https://via.placeholder.com/250"
          }
          alt={product.name}
          className="detail-image"
        />

        <div className="detail-info">
          <h2>{product.name}</h2>
          <p className="desc">{product.description}</p>
          <p className="price">${product.price}</p>
          <p className="stock">Stock disponible: {product.stock}</p>

          <button onClick={() => addToCart(product)} className="btn-add">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
