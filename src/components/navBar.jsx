import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./NavBar.css";

export default function NavBar() {
  const { getTotal } = useContext(CartContext);

  return (
    <nav className="navbar">
      <h1 className="logo">Store</h1>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/cart">Carrito | ${getTotal().toFixed(2)}</Link></li>
      </ul>
    </nav>
  );
}
