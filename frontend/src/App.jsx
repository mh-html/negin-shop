import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home, Products, Login, Product, Register, Basket, Account } from './pages';
import BasketContextProvider from "./contexts/BasketContext";
import {Header , Footer} from "./components";
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
          <Route path="/login" element={<Login setUser={setUser} />} />
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
