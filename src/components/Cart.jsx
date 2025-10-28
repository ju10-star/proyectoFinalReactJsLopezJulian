import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart, addToCart, deleteFromCart, getTotal, clearCart } =
    useContext(CartContext);

  const handlePay = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Tu carrito está vacío",
        text: "Agrega productos antes de pagar.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const total = getTotal().toFixed(2);

    Swal.fire({
      title: "Confirmar compra",
      html: `
        <p>¿Deseas completar tu compra?</p>
        <h3>Total a pagar: <b>$${total}</b></h3>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, pagar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Pago realizado!",
          text: "Gracias por tu compra.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        clearCart();
      }
    });
  };

  return (
    <div className="cart-container">
      <h2>Productos en tu carrito</h2>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong> — ${item.price} × {item.quantity} ={" "}
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div className="cart-buttons">
                  <button onClick={() => removeFromCart(item.id)}>-</button>
                  <button onClick={() => addToCart(item)}>+</button>
                  <button
                    onClick={() => deleteFromCart(item.id)}
                    className="delete"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h3>Total: ${getTotal().toFixed(2)}</h3>

          <button onClick={handlePay} className="pay-btn">
            Pagar
          </button>
        </>
      )}
    </div>
  );
}
