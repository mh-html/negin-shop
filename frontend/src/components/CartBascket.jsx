import { useContext } from "react";
import { TbShoppingBagMinus, TbShoppingBagPlus } from "react-icons/tb";
import { BascketCartContextProvider } from "../contexts/BasketContext";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

function CartBascket({ product }) {
  const { image, quantity, title, price } = product;
  const { state, dispatch } = useContext(BascketCartContextProvider);

  return (
    <div className="flex justify-between items-center border-2 border-tl dark:border-td rounded-md p-4 mb-4">
      <div className="size-12 overflow-hidden rounded-md">
        <img src={image} alt={title} className="size-full object-contain" />
      </div>
      <div className="text-tl dark:text-td text-base lg:text-xl">
        <h2 className="font-bold">{title}</h2>
        <p className="font-semibold">{new Intl.NumberFormat('fa-IR').format(price)} تومان</p>
      </div>
      <div className="text-tl dark:text-td flex">
        {quantity === 1 ? (
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

        <span className="mx-2 font-bold text-bd dark:text-bl">{quantity}</span>
        <button
          className="p-2 text-lg text-white rounded bg-emerald-600"
          onClick={() => dispatch({ type: "INCREASE", payload: product })}
        >
          <TbShoppingBagPlus />
        </button>
      </div>
    </div>
  );
}

export default CartBascket;
