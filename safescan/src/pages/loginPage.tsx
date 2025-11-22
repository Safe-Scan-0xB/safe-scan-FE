import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BtnLong from "../components/btn";
import logo from "../assets/icon/Logo.png";
import eyeIcon from "../assets/icon/icon_eye.svg";
import eyeOffIcon from "../assets/icon/icon_eyeoff.svg";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
  if (!userId || !password) {
    setError("아이디와 비밀번호를 입력해주세요.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
      credentials: "include",
    });

    // Body를 text로 안전하게 읽기
    let bodyText = await res.text();
    let bodyData: any = {};
    try {
      bodyData = JSON.parse(bodyText);
    } catch {
      bodyData = { return: bodyText };
    }

    if (res.status === 404) {
      setError(bodyData.ERROR || "존재하지 않는 회원입니다.");
      return;
    }
    if (res.status === 401) {
      setError(bodyData.ERROR || "비밀번호 불일치");
      return;
    }

    // 성공일 때
    if (res.ok) {
      const token = bodyData.token; 

      if (token) {
        login(token); 
        alert(bodyData.return || "로그인 성공");
        navigate("/");
      } else {
        setError("서버가 토큰을 전달하지 않았습니다.");
      }
      return;
    }

    setError(bodyData.ERROR || "로그인 중 오류 발생");
  } catch (err) {
    console.error(err);
    setError("서버 연결 실패");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow flex flex-col items-center justify-start mt-[110px] gap-3">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="SafeScan Logo" 
          className="h-[95px] sm:h-21 md:h-[105px] lg:h-[115px] w-auto transition-all duration-200 mb-8" />
        </Link>

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
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 
                       cursor-pointer opacity-70 hover:opacity-100"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="w-full max-w-[450px] sm:max-w-md md:max-w-lg lg:max-w-3xl mt-3">
          <BtnLong
            label={loading ? "로딩중..." : "로그인"}
            onClick={handleLogin}
            disabled={loading}
          />
        </div>

        <p className="mt-1">
          <Link to="/signup">회원가입</Link>
        </p>
      </main>
    </div>
  );
}

export default LoginPage;
