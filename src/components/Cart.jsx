import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const { items, total, removeFromCart, clearCart } = useContext(CartContext);

  if (!items.length) {
    return (
      <div className="cart">
        <h2>Carrito</h2>
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Carrito</h2>
      <ul className="cart-list">
        {items.map(it => (
          <li key={it.id} className="cart-row">
            <div className="cart-info">
              <strong>{it.name}</strong>
              <span>x{it.qty}</span>
            </div>
            <div className="cart-price">${(it.price * it.qty).toFixed(2)}</div>
            <button onClick={() => removeFromCart(it.id)} className="danger">
              Quitar
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-footer">
        <strong>Total: ${total.toFixed(2)}</strong>
        <div className="cart-actions">
          <button onClick={clearCart}>Vaciar</button>
        </div>
      </div>
    </div>
  );
}
