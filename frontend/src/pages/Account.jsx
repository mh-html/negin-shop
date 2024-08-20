import { useNavigate } from "react-router-dom";

function Account({user}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload()
  };
  return (
    <div className="h-screen container mx-auto px-20">
      <div>{user.name} : حساب کاربری شما</div>
      <button onClick={handleLogout}>خارج شدن</button>
    </div>
  );
}

export default Account;
