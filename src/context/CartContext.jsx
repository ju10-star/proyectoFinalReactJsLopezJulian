import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Agregar un producto (si existe, aumenta cantidad)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Si no existe, agregarlo con cantidad 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Quitar un producto (si tiene más de 1, resta cantidad)
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === id);

      if (!existingProduct) return prevCart;

      if (existingProduct.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      // Si solo había 1, eliminar del carrito
      return prevCart.filter((item) => item.id !== id);
    });
  };

  // Eliminar completamente un producto del carrito
  const deleteFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calcular el total del carrito
  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
