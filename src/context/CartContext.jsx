import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // Eliminar producto del carrito
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Calcular total del carrito
  const getTotal = () => {
    return cart.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
}
