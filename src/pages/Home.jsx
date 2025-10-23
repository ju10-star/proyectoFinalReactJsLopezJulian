import ProductListPublic from "../components/ProductListPublic";

export default function Home() {
  return (
    <div className="home">
      <h1>Bienvenido a mi primer e-commerce React</h1>
      <p>Stock de productos disponibles</p>
      <ProductListPublic />
    </div>
  );
}


