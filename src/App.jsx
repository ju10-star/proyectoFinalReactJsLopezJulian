import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";            // si Home muestra ProductListPublic dentro
import Admin from "./pages/Admin";
import Cart from "./components/Cart";
import ProductDetail from "./pages/ProductDetail";
import ProductListPublic from "./components/ProductListPublic"; // o /pages

import "./App.css";

export default function App() {
  return (
    <Router>
      <NavBar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* o directamente: <Route path="/" element={<ProductListPublic />} /> */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/detalle/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}
