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
import { getUser } from "./utils/getUser";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userHandler = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    userHandler();
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
          <Route path="/account" element={<Account />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BasketContextProvider>
    </>
  );
}

export default App;
