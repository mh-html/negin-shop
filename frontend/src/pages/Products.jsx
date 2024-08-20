import { useEffect, useState } from "react";
import Cart from "../components/Cart";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8081/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="p-2 grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Cart key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
