// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";
import CommunityPage from "./pages/communityPage";
import ChatPage from "./pages/chatPage";
import LoginPage from "./pages/loginPage";
import SafePage from "./pages/resultSafePage";
import DagerPage from "./pages/resultDangerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}/>
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/chatbot" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/result/safe" element={<SafePage />} />
      <Route path="/result/danger" element={<DagerPage />} />
    </Routes>

  );
}

export default App;
