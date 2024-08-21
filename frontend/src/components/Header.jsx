import { Link } from "react-router-dom";

function Header({ user }) {
  return (
    <header className="w-full bg-emerald-600 text-white sticky top-0">
      <div className="container mx-auto">
        <nav className="px-8 py-4 flex justify-between items-center">
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
              <li className="px-4 py-1 bg-white rounded text-emerald-600">
                <Link to="/account">حساب کاربری</Link>
              </li>
            ) : (
              <li className="px-4 py-1 bg-white rounded text-emerald-600">
                <Link to="/login">ورود</Link>
              </li>
            )}
          </ul>
          <h1 className="text-3xl font-bold">NEGIN SHOP</h1>
        </nav>
      </div>
    </header>
  );
}

export default Header;
