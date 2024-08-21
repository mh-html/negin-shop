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

  const validateInputs = () => {
    const { name, username, email, password } = dataUser;
    if (!name || !username || !email || !password) {
      notifErr("لطفاً تمام فیلدها را پر کنید.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      notifErr("لطفاً یک ایمیل معتبر وارد کنید.");
      return false;
    }
    if (password.length < 6) {
      notifErr("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return false;
    }
    return true;
  };

  const registerHandler = (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    fetch("http://localhost:8081/register", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(dataUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          notifSuc(data.message);
          navigate("/login");
          window.location.reload();
        } else {
          notifErr(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        notifErr("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
      });
  };

  return (
    <div className="container mx-auto">
      <div className="w-[600px] mx-auto p-4 border-2 border-emerald-600 rounded my-16 text-center">
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
            value={dataUser.name}
            onChange={(e) => setDataUser({ ...dataUser, name: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-2 border-2 rounded mt-4"
            id="username"
            name="username"
            placeholder="نام کاربری"
            value={dataUser.username}
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
            value={dataUser.email}
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
            value={dataUser.password}
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
