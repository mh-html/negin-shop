import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notifErr, notifSuc } from "../utils/notif";

function Register() {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const registerHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:8081/register", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(dataUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          navigate("/login");
          notifSuc(data.message);
          window.location.reload()
        }
      })
      .catch((err) => {
        console.error(err);
        notifErr(err.message)
      });
  };
  return (
    <div className="container mx-auto">
      <div className="w-[600px] mx-auto p-4 border-2 border-emerald-600 rounded mt-24 text-center">
        <h1 className="my-8 text-3xl font-semibold text-emerald-600">
          پنل ثبت نام
        </h1>
        <form onSubmit={registerHandler} className="text-xl">
          <input
            type="text"
            className="w-full p-2 border-2 rounded"
            id="name"
            name="name"
            placeholder="نام و نام خانوادگی"
            onChange={(e) => setDataUser({ ...dataUser, name: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-2 border-2 rounded mt-4"
            id="username"
            name="username"
            placeholder="نام کاربری"
            onChange={(e) =>
              setDataUser({ ...dataUser, username: e.target.value })
            }
          />
          <input
            type="email"
            className="w-full p-2 border-2 rounded mt-4"
            id="email"
            name="email"
            placeholder="ایمیل"
            onChange={(e) =>
              setDataUser({ ...dataUser, email: e.target.value })
            }
          />
          <input
            type="password"
            className="w-full p-2 border-2 rounded mt-4"
            id="password"
            name="password"
            placeholder="رمز عبور"
            onChange={(e) =>
              setDataUser({ ...dataUser, password: e.target.value })
            }
          />
          <div className="mt-8 flex justify-between items-center gap-4">
            <button
              type="submit"
              className="w-full p-2 rounded bg-emerald-600 text-white mt-4"
            >
              ثبت نام
            </button>
            <Link
              to="/login"
              className="w-full p-2 rounded bg-emerald-600 text-white mt-4"
            >
              حساب کاربری دارید؟
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
