import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>React CRUD</h2>
      <div>
        <Link to="/">Inicio</Link>
        <Link to="/admin">Administrar</Link>
      </div>
    </nav>
  )
}
