import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full p-8 bg-blue-600 text-white flex justify-around items-center gap-4">
      <div>
        <h3 className="text-xl font-bold mb-4 border-b-2">فروشگاه</h3>
        <ul>
          <li>
            <Link to="/products">مردانه</Link>
          </li>
          <li>
            <Link to="/products">زنانه</Link>
          </li>
          <li>
            <Link to="/products">بچگانه</Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4 border-b-2">ارتباط با ما</h3>
        <ul>
          <li>
            <Link to="https://eata.com">ایتا</Link>
          </li>
          <li>
            <Link to="https://aparat.com">اپارات</Link>
          </li>
          <li>
            <Link to="/https://sorush.com">سروش</Link>
          </li>
        </ul>
      </div>
      <p>کلیه حقوق این سایت متعلق به فروشگاه انلاین نگین می باشد</p>
    </footer>
  );
}

export default Footer;
