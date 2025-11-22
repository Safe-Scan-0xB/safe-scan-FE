import BtnLong from "../components/btn";
import logo from "../assets/icon/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import eyeIcon from "../assets/icon/icon_eye.svg";
import eyeOffIcon from "../assets/icon/icon_eyeoff.svg";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!userId || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      });

      // Body를 한 번만 읽기
      const text = await res.text();
      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = { return: text }; // JSON 파싱 실패 시 text 처리
      }

      if (res.status === 400) {
        setError(data.return || "이미 존재하는 아이디입니다.");
        return;
      }

      if (!res.ok) {
        setError(data.return || "회원가입 중 오류가 발생했습니다.");
        return;
      }

      // Body에서 token 가져오기 (백에서 내려준다고 가정)
      if (data.token) {
        localStorage.setItem("access_token", data.token);
      }

      alert(data.return || "회원가입 완료");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("서버 연결에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow flex flex-col items-center justify-start mt-[110px] gap-3">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="SafeScan Logo"
            className="h-[95px] sm:h-21 md:h-[105px] lg:h-[115px] w-auto transition-all duration-200 mb-8"
          />
        </Link>

        {/* 아이디 입력 */}
        <div className="w-full max-w-[450px] sm:max-w-md md:max-w-lg lg:max-w-3xl">
          <input
            type="text"
            placeholder="아이디 입력"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-3 rounded-[4.18px] border border-[#D6D6D6]
                       focus:border-[#2C3E54] focus:outline-none"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="relative w-full max-w-[450px] sm:max-w-md md:max-w-lg lg:max-w-3xl">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-[4.18px] border border-[#D6D6D6]
                       focus:border-[#2C3E54] focus:outline-none"
          />
          <img
            src={showPassword ? eyeOffIcon : eyeIcon}
            alt="toggle password"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer opacity-70 hover:opacity-100"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        {/* 에러 메시지 */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* 회원가입 버튼 */}
        <div className="w-full max-w-[450px] sm:max-w-md md:max-w-lg lg:max-w-3xl mt-3">
          <BtnLong
            label={loading ? "등록 중..." : "회원가입"}
            onClick={handleSignup}
            disabled={loading}
          />
        </div>
      </main>
    </div>
  );
}

export default SignupPage;
