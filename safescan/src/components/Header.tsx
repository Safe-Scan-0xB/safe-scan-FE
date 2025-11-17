// src/components/Header.tsx
import { useState } from "react";
import logo from "../assets/icon/Logo.png";
import profileIcon from "../assets/icon/profile.svg";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsModalOpen(false);
    // 실제 로그아웃 로직 추가 가능
  };

  const handleLogin = () => {
    setIsModalOpen(false);
    navigate("/login");  
  };

  return (
    <header className="w-full flex justify-between items-center pl-4 pr-7 py-3 bg-white  fixed top-0 left-0 z-50">
      {/* 왼쪽 로고 */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="SafeScan Logo"
          className="h-12 sm:h-12 md:h-12 lg:h-14 w-auto transition-all duration-200"
        />
        </Link>


      {/* 오른쪽 아이콘 + 모달 */}
      <div className="relative">
        {/* 아이콘 버튼 */}
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200 transition-all"
        >
          <img src={profileIcon} alt="Profile" className="w-8 h-8 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-9 lg:h-9 transition-all duration-200" />
        </button>

        {/* 아이콘 밑으로 뜨는 모달 */}
        {isModalOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg p-3 z-50"
            onClick={(e) => e.stopPropagation()}
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
