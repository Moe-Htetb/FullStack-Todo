import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { useLogoutMutation } from "../slices/userApi";
import { clearUserInfo } from "../slices/auth";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Logout, { isLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    await Logout({});
    dispatch(clearUserInfo());
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="border-b border-b-gray-300 px-4 py-3 flex items-center justify-between md:px-10 relative">
      <Link to="/" className="text-2xl md:text-3xl font-bold">
        Note
      </Link>

      {/* Hamburger Icon */}
      <button
        className="md:hidden text-black"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } absolute top-full px-1 left-0 w-full flex-col items-center gap-4 bg-white py-4 border-t border-gray-300 z-10 md:static md:flex md:flex-row md:gap-4 md:border-0 md:bg-transparent md:w-auto`}
      >
        {userInfo ? (
          <>
            <Link
              to="/profile"
              className="text-white bg-black py-2 px-4 w-full text-center md:w-auto cursor-pointer"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-white bg-black py-2 px-4 w-full text-center md:w-auto cursor-pointer"
              disabled={isLoading}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white bg-black py-2 px-4 w-full text-center md:w-auto cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border py-2 px-4 w-full text-center md:w-auto cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
