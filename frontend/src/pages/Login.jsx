import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notifErr, notifSuc } from "../utils/notif.js";

function Login() {
  const [dataUserLogin, setDataUserLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const loginHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:8081/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(dataUserLogin),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          notifErr(data.message);
        } else {
          localStorage.setItem("token", data.token);
          navigate("/");
          notifSuc(data.message);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="container mx-auto">
      <div className="w-[600px] mx-auto p-4 border-2 border-emerald-600 rounded mt-24 text-center">
        <h1 className="my-8 text-3xl font-semibold text-emerald-600">پنل ورود</h1>
        <form onSubmit={loginHandler} className="text-xl">
          <input
            type="text"
            className="w-full p-2 border-2 rounded"
            id="text"
            name="text"
            placeholder="نام کاربری"
            onChange={(e) =>
              setDataUserLogin({ ...dataUserLogin, username: e.target.value })
            }
          />

          <input
            type="password"
            className="w-full p-2 border-2 rounded mt-4"
            id="password"
            name="password"
            placeholder="رمز عبور"
            onChange={(e) =>
              setDataUserLogin({ ...dataUserLogin, password: e.target.value })
            }
          />

          <div className="mt-8 flex justify-between items-center gap-4">
            <button
              type="submit"
              className="w-full p-2 rounded bg-emerald-600 text-white mt-4"
            >
              ورود
            </button>
            <Link
              to="/register"
              className="w-full p-2 rounded bg-emerald-600 text-white mt-4"
            >
              حساب کاربری ندارید؟
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
