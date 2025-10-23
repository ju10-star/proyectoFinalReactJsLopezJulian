import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./ProductList.css";

export default function ProductCard({ product, onEdit, onDelete }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <Link to={`/detalle/${product.id}`}>
        <img
          src={
            product.image.startsWith("/src")
              ? product.image
              : `/src/media/${product.image}`
          }
          alt={product.name}
          className="product-image"
        />
      </Link>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="desc">{product.description}</p>
        <p className="price">${product.price}</p>
      </div>

      <div className="product-actions">
        <button onClick={() => addToCart(product)}>Añadir</button>
        {onEdit && <button onClick={() => onEdit(product)}>Editar</button>}
        {onDelete && (
          <button onClick={() => onDelete(product.id)} className="delete">
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}



