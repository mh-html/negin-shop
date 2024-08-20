import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Header from "./components/Header";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Basket from "./pages/Basket";
import BasketContextProvider from "./contexts/BasketContext";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Account from "./pages/Account";
import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8081/getuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);
  return (
    <>
      <BasketContextProvider>
        <Header user={user} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/products" element={<Products />} />
          <Route path="/basket" element={<Basket user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account user={user} />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BasketContextProvider>
    </>
  );
}

export default App;
