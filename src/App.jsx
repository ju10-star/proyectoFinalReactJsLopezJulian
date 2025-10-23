import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Cart from "./components/Cart";
import ProductDetail from "./pages/ProductDetail";
import "./App.css";

export default function App() {
  return (
    <Router>
      <NavBar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/detalle/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}






