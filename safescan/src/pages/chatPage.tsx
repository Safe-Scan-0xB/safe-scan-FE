import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ChatBubble from "../components/chatbubble";
import arrow from "../assets/icon/icon_arrowLeft.svg";
import sendIcon from "../assets/icon/send_icon.svg";
import sendIconActive from "../assets/icon/send_iconActive.svg";
import { getToken } from "../utils/token"; 

type Message = {
  role: "user" | "ai";
  text: string;
  time: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const date = new Date();
  const today = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate()
  ).padStart(2, "0")}`;

  // 페이지 로드 시 기존 대화 가져오기
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const token = getToken();
        if (!token) {
          alert("로그인이 필요합니다.");
          return;
        }

        const res = await fetch("/api/chat", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });


        if (res.status === 404) {
          // 대화 내역 없음
          setMessages([]);
          return;
        }

        if (!res.ok) {
          console.error("채팅 불러오기 실패:", res.status);
          return;
        }

        const data = await res.json();
        const formatted = data.responses.map((item: any) => ({
          role: item.role === "assistant" ? "ai" : "user",
          text: item.content,
          time: item.timestamp,
        }));

        setMessages(formatted);
      } catch (err) {
        console.error(err);
        alert("서버 연결에 실패했습니다.");
      }
    };

    fetchChatHistory();
  }, []);

  // 메시지 변경될 때마다 맨 아래로 스크롤
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      role: "user",
      text: inputText,
      time: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, userMessage]);
    setInputText("");

    try {
      const token = getToken();
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ content: userMessage.text }),
      });

      if (!res.ok) {
        console.error("메시지 전송 실패:", res.status);
        return;
      }

      const data = await res.json();

      const aiMessage: Message = {
        role: "ai",
        text: data.content,
        time: data.timestamp,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      alert("서버 연결에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 상단 헤더 */}
      <header className="relative w-full flex items-center px-4 pt-6 pb-2 bg-white">
        <Link to="/" className="flex items-center">
          <img
            src={arrow}
            alt="arrow"
            className="h-8 sm:h-9 md:h-9 lg:h-9 w-auto transition-all duration-200"
          />
        </Link>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-medium text-[23px]">AI 채팅</h1>
      </header>

      <span className="text-[13px] font-arialRounded text-[#A2A2A2] w-full text-center">{today}</span>

      {/* 채팅 메시지 영역 */}
      <div ref={chatBoxRef} className="flex-grow overflow-y-auto px-4 py-7 space-y-4">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} role={msg.role} text={msg.text} timeText={msg.time} />
        ))}
      </div>

      {/* 하단 입력창 */}
      <div className="w-full px-4 py-3 bg-white flex justify-center py-6">
        <div className="flex items-center w-[97%] bg-[#F2F2F2] rounded-3xl px-4 py-3">
          <input
            type="text"
            className="flex-grow bg-transparent px-2 outline-none text-[15px]"
            placeholder="메시지 보내기"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="flex items-center">
            <img src={inputText.length > 0 ? sendIconActive : sendIcon} alt="send" className="w-6 h-6 active:opacity-60" />
          </button>
        </div>
      </div>
    </div>
  );
}
