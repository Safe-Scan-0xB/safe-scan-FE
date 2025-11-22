import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon/Logo.png";
import profileIcon from "../assets/icon/profile.svg";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { token, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const navigate = useNavigate();

  const modalRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    setIsModalOpen(false);
    alert("로그아웃 되었습니다.");
  };

  const handleLogin = () => {
    setIsModalOpen(false);
    navigate("/login");
  };


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <header className="w-full flex justify-between items-center pl-4 pr-7 py-3 bg-white fixed top-0 left-0 z-50">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="SafeScan Logo" className="h-12 w-auto" />
      </Link>

      <div className="relative">
        <button
          ref={buttonRef}
          onClick={toggleModal}
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200"
        >
          <img src={profileIcon} alt="Profile" className="w-8 h-8" />
        </button>

        {isModalOpen && (
          <div
            ref={modalRef}
            className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg p-3 z-50"
          >
            <ul className="space-y-2">
              {isLoggedIn ? (
                <li
                  className="text-lg hover:text-[#2C3E54] cursor-pointer"
                  onClick={handleLogout}
                >
                  로그아웃
                </li>
              ) : (
                <li
                  className="text-lg hover:text-[#2C3E54] cursor-pointer"
                  onClick={handleLogin}
                >
                  로그인
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
