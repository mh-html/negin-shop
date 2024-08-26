import { useContext } from "react";
import { Link } from "react-router-dom";
import { BascketCartContextProvider } from "../contexts/BasketContext";
import { TbShoppingBagMinus, TbShoppingBagPlus } from "react-icons/tb";
import { MdAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";

function Cart({ product }) {
  const { image, title, price, id } = product;
  const { state, dispatch } = useContext(BascketCartContextProvider);
  const inBascket = state.basketCart.find((p) => p.id == id);

  return (
    <div className="w-[350px] mx-auto shadow-md rounded-md overflow-hidden">
      <div className="w-full h-64">
        <img className="size-full object-fill" src={image} alt={title} />
      </div>
      <div className="m-2 p-2">
        <h4 className="text-xl font-bold">{title}</h4>
        <h5 className="text-lg mt-2">{new Intl.NumberFormat('fa-IR').format(price)} تومان</h5>
      </div>
      <div className="flex justify-between items-start p-4">
        <button className="px-8 py-1 text-lg text-white rounded bg-emerald-600">
          <Link to={`/products/${id}`}>جزئیات</Link>
        </button>

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
                onClick={() => dispatch({ type: "DECREASE", payload: product })}
              >
                <TbShoppingBagMinus />
              </button>
            )}

            <span className="font-bold text-xl text-emerald-600">
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
  );
}

export default Cart;
