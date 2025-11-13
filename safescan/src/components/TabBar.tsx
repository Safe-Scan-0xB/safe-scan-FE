// TabBar.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { Home, MessageCircle, Users } from "lucide-react";

export default function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "/", label: "홈", icon: <Home size={22} /> },
    { id: "/community", label: "커뮤니티", icon: <Users size={22} /> },
    { id: "/chatbot", label: "챗봇", icon: <MessageCircle size={22} /> },
  ];

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md flex justify-around py-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all ${
            location.pathname === tab.id ? "text-[#012148]" : "text-[#999999]"
          }`}
        >
          {tab.icon}
          <span className="text-xs">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
