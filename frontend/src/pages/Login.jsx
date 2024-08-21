import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notifErr, notifSuc } from "../utils/notif.js";

function Login() {
  const [dataUserLogin, setDataUserLogin] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!dataUserLogin.username) {
      tempErrors["username"] = "نام کاربری لازم است";
      isValid = false;
    }

    if (!dataUserLogin.password) {
      tempErrors["password"] = "رمز عبور لازم است";
      isValid = false;
    } else if (dataUserLogin.password.length < 6) {
      tempErrors["password"] = "رمز عبور باید حداقل 6 کاراکتر باشد";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (validate()) {
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
            notifSuc(data.message);
            navigate("/");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="w-[600px] mx-auto p-4 border-2 border-emerald-600 rounded my-16 text-center">
        <h1 className="my-8 text-3xl font-semibold text-emerald-600">
          پنل ورود
        </h1>
        <form onSubmit={loginHandler} className="text-xl">
          <div className="mb-4">
            <input
              type="text"
              className={`w-full p-2 border-2 rounded ${
                errors.username ? "border-red-500" : ""
              }`}
              id="text"
              name="text"
              placeholder="نام کاربری"
              value={dataUserLogin.username}
              onChange={(e) =>
                setDataUserLogin({ ...dataUserLogin, username: e.target.value })
              }
            />
            {errors.username && (
              <span className="text-red-500 text-sm">{errors.username}</span>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              className={`w-full p-2 border-2 rounded ${
                errors.password ? "border-red-500" : ""
              }`}
              id="password"
              name="password"
              placeholder="رمز عبور"
              value={dataUserLogin.password}
              onChange={(e) =>
                setDataUserLogin({ ...dataUserLogin, password: e.target.value })
              }
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

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
