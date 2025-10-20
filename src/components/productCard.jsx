export default function productCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.name}
        className="product-img"
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p><strong>${product.price}</strong></p>
        <p>Stock: {product.stock}</p>
        <div className="card-buttons">
          <button onClick={() => onEdit(product)}>✏️ Editar</button>
          <button onClick={() => onDelete(product.id)}>🗑️ Eliminar</button>
        </div>
      </div>
    </div>
  )
}
