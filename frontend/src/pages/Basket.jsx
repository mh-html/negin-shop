import { useContext } from "react";
import { Link } from "react-router-dom";
import { BascketCartContextProvider } from "../contexts/BasketContext";
import { CartBascket } from "../components";
import { calculatorTotal } from "../utils/calcProduct";
import { notifErr, notifSuc } from "../utils/notif";

function Basket({ user }) {
  const { state } = useContext(BascketCartContextProvider);
  calculatorTotal(state);
  function saveProducts() {
    const productsInCart = JSON.parse(localStorage.getItem("basketCart"));
    productsInCart.unshift(user.id);

    fetch("http://localhost:8081/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsInCart),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        localStorage.removeItem("basketCart");
        notifSuc("با موفقیت خریداری شد.");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        notifErr(error.message);
      });
  }
  return (
    <div className="container mx-auto min-h-screen flex flex-col-reverse md:flex-row justify-between mt-4 py-2 gap-4 px-4 lg:px-48">
      <div className="border-2 border-tl dark:border-td rounded-md h-fit w-full md:w-1/3 p-4">
        <p className="font-semibold text-tl dark:text-td mb-4">
          هزینه کل : {new Intl.NumberFormat('fa-IR').format(state.totalAll)} تومان
        </p>
        <p className="text-xl text-tl dark:text-td">
          تعداد : {state.quantityAll}
        </p>
        <p className="text-xl dark:text-td">وضعیت :‌ درحال خرید...</p>
        {user && !!state.basketCart.length && (
          <button
            className="mt-8 p-4 bg-green-700 text-white rounded w-full"
            onClick={saveProducts}
          >
            خرید محصولات
          </button>
        )}
        {user && !state.basketCart.length && (
          <button className="mt-8 p-4 bg-red-700 text-white rounded w-full">
            <Link to="/products">انتخاب محصول</Link>
          </button>
        )}
        {!user && (
          <button className="mt-8 p-4 bg-emerald-700 text-white rounded w-full">
            <Link to="/login">ابتدا وارد شوید</Link>
          </button>
        )}
      </div>
      <div className="w-full md:w-2/3">
        {state.basketCart.map((product) => (
          <CartBascket key={product.id} product={product} />
        ))}
        {!state.basketCart.length && (
          <p className="text-xl font-semibold text-bd dark:text-bl">
            سبد خرید خالی است
          </p>
        )}
      </div>
    </div>
  );
}

export default Basket;
