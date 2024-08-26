import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { TbShoppingBagMinus, TbShoppingBagPlus } from "react-icons/tb";
import { BascketCartContextProvider } from "../contexts/BasketContext";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const { state, dispatch } = useContext(BascketCartContextProvider);
  const inBascket = state.basketCart.find((p) => p.id == id);

  useEffect(() => {
    fetch(`http://localhost:8081/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto m-4 p-8 flex justify-between items-center gap-8 rounded shadow">
      <div className="flex-1">
        <h1 className="text-5xl font-bold">{product.title}</h1>
        <p className="text-3xl font-semibold mt-8">{product.description}</p>
        <div className="flex justify-between items-center mt-12">
          <p className="text-2xl text-emerald-600">{new Intl.NumberFormat('fa-IR').format(product.price)} تومان</p>
          <p className="text-xl"> امتیاز: {product.raiting}</p>
        </div>
        <p className="text-xl font-semibold">دسته بندی:‌ {product.category}</p>
        <div className="mt-8 text-center">
          {!!inBascket && (
            <>
              {inBascket.quantity === 1 ? (
                <button
                  className="p-2 text-lg text-white rounded bg-emerald-600"
                  onClick={() => {
                    dispatch({ type: "REMOVE_ITEM", payload: product });
                  }}
                >
                  <MdOutlineRemoveShoppingCart />
                </button>
              ) : (
                <button
                  className="p-2 text-lg text-white rounded bg-emerald-600"
                  onClick={() =>
                    dispatch({ type: "DECREASE", payload: product })
                  }
                >
                  <TbShoppingBagMinus />
                </button>
              )}

              <span className="mx-8 font-bold text-2xl">
                {inBascket.quantity}
              </span>
            </>
          )}
          {!inBascket ? (
            <button
              className="p-2 text-lg text-white rounded bg-emerald-600"
              onClick={() => {
                dispatch({ type: "ADD_ITEM", payload: product });
              }}
            >
              <MdAddShoppingCart />
            </button>
          ) : (
            <button
              className="p-2 text-lg text-white rounded bg-emerald-600"
              onClick={() => dispatch({ type: "INCREASE", payload: product })}
            >
              <TbShoppingBagPlus />
            </button>
          )}
        </div>
      </div>
      <div className="overflow-hidden rounded">
        <img src={product.image} alt={product.title} className="size-full object-cover" />
      </div>
    </div>
  );
}

export default Product;
