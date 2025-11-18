import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ChatBubble from "../components/chatbubble";
import arrow from "../assets/icon/icon_arrowLeft.svg";
import sendIcon from "../assets/icon/send_icon.svg";
import sendIconActive from "../assets/icon/send_iconActive.svg";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "안녕하세요! 무엇을 도와드릴까요?", time: "오전 10:23" },
    { role: "user", text: "내가 지금 사기를 당한 것 같은데 어떻게 해야할지 알려줘", time: "오전 10:24" },
  ]);

  const [inputText, setInputText] = useState("");

  const date = new Date();
  const today = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
  date.getDate()
).padStart(2, "0")}`;

const chatBoxRef = useRef<HTMLDivElement>(null);

  // 메시지 변경될 때마다 맨 아래로 스크롤
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      role: "user",
      text: inputText,
      time: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      
      {/* 상단 헤더 */}
      <header className="relative w-full flex items-center px-4 pt-6 pb-2 bg-white">
        {/* 뒤로가기 버튼 */}
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
          <ChatBubble
            key={idx}
            role={msg.role as "ai" | "user"}
            text={msg.text}
            timeText={msg.time}
          />
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
          
          {/* 전송 아이콘 버튼 */}
          <button onClick={sendMessage} className="flex items-center">
            <img
            src={inputText.length > 0 ? sendIconActive : sendIcon}
            alt="send"
            className="w-6 h-6 active:opacity-60"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
