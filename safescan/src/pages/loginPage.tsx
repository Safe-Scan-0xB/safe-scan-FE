// src/loginPage.tsx
import BtnLong from "../components/btn";
import logo from "../assets/icon/Logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import eyeIcon from "../assets/icon/icon_eye.svg";
import eyeOffIcon from "../assets/icon/icon_eyeoff.svg";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      <main className="flex-grow flex flex-col items-center justify-start mt-[110px] gap-3">

        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="SafeScan Logo"
            className="h-[95px] sm:h-21 md:h-[105px] lg:h-[135px] w-auto transition-all duration-200 mb-8"
          />
        </Link>

        {/* 아이디 입력창 */}
        <div className="w-full max-w-[450px] sm:max-w-md md:max-w-lg lg:max-w-3xl">
          <input
            type="text"
            placeholder="아이디 입력"
            className="w-full px-4 py-3 rounded-[4.18px] border border-[#D6D6D6] 
                       focus:border-[#2C3E54] focus:outline-none"
          />
        </div>

        {/* 비밀번호 입력창 + 아이콘 */}
        <div className="relative w-full max-w-[450px] sm:max-w-md md:max-w-lg lg:max-w-3xl">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호 입력"
            className="w-full px-4 py-3 rounded-[4.18px] border border-[#D6D6D6]
                       focus:border-[#2C3E54] focus:outline-none"
          />

          <img
            src={showPassword ? eyeOffIcon : eyeIcon}
            alt="toggle password"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 
                       cursor-pointer opacity-70 hover:opacity-100"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        {/* 로그인 버튼 */}
        <div className="w-full max-w-[450px] sm:max-w-md md:max-w-lg lg:max-w-3xl mt-3">
          <BtnLong label="로그인" />
        </div>

        <p className="font-gantari font-medium">회원가입</p>

      </main>

    </div>
  );
}

export default LoginPage;
