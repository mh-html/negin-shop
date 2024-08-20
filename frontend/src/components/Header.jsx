import { Link } from "react-router-dom";

function Header({ user }) {
  return (
    <header className="w-full bg-blue-600 text-white">
      <div className="container mx-auto">
        <nav className="px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">NEGIN SHOP</h1>
          <ul className="flex justify-between items-center gap-4 text-lg">
            <li>
              <Link to="/">خانه</Link>
            </li>
            <li>
              <Link to="/products">محصولات</Link>
            </li>
            <li>
              <Link to="/basket">سبد خرید</Link>
            </li>
            {user ? (
              <li className="px-4 py-1 bg-white rounded text-black">
                <Link to="/account">حساب کاربری</Link>
              </li>
            ) : (
              <li className="px-4 py-1 bg-white rounded text-black">
                <Link to="/login">ورود</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
