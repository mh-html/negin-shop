import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/getUser";

function Account() {
  const [buyProducts, setBuyProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userHandler = async () => {
      const userData = await getUser();
      setUser(userData);

      if (userData?.id) {
        fetch("http://localhost:8081/getPurchasedProducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userData.id }),
        })
          .then((response) => response.json())
          .then((data) => {
            setBuyProducts(data.products);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    };

    userHandler();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };
  return (
    <div className="min-h-screen container mx-auto px-20 shadow">
      <div className="mt-8 p-8 rounded shadow-md">
        <h6 className="text-center text-3xl font-bold mb-8">
          جزئیات حساب کاربری
        </h6>
        <p className="text-xl">
          نام :‌ <span>{user?.name}</span>
        </p>
        <p className="text-xl my-4">
          نام کاربری :‌ <span>{user?.username}</span>
        </p>
        <p className="text-xl">
          ایمیل :‌ <span>{user?.email}</span>
        </p>
        <div className="mt-8">
          <p className="text-center font-semibold text-xl my-4">
            لیست محصولات خریداری شده
          </p>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr className="border-b-2 *:text-right *:py-3 *:px-4 *:font-semibold *:text-sm *:text-gray-600">
                <th>شناسه</th>
                <th>نام</th>
                <th>توضیحات</th>
                <th>قیمت</th>
                <th>دسته بندی</th>
                <th>عکس</th>
                <th>رتبه</th>
                <th>تعداد</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {buyProducts.map((product) => (
                <tr key={product?.id} className="border-b *:py-3 *:px-4">
                  <td>{product?.id}</td>
                  <td>{product?.title}</td>
                  <td>{product?.description}</td>
                  <td>{product?.price}</td>
                  <td>{product?.category}</td>
                  <td>
                    <img
                      src={product?.image}
                      alt={product?.title}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">
                    {product?.raiting !== null ? product?.raiting : "N/A"}
                  </td>
                  <td className="py-3 px-4">{product?.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="mt-8 w-full p-2 rounded bg-red-500 text-white text-xl font-semibold"
          onClick={handleLogout}
        >
          خارج شدن
        </button>
      </div>
    </div>
  );
}

export default Account;
