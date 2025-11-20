// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";
import CommunityPage from "./pages/communityPage";
import ChatPage from "./pages/chatPage";
import LoginPage from "./pages/loginPage";
import SafePage from "./pages/resultSafePage";
import DagerPage from "./pages/resultDangerPage";
import DetailPostPage from "./pages/detailPostPage";
import CreatePostPage from "./pages/createPostPage";
import EditPostPage from "./pages/editPostPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}/>
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/chatbot" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/result/safe" element={<SafePage />} />
      <Route path="/result/danger" element={<DagerPage />} />
      <Route path="/community/create" element={<CreatePostPage />} />
      <Route path="/community/:id" element={<DetailPostPage />} />
      <Route path="/community/edit/:id" element={<EditPostPage />} />
    </Routes>

  );
}

export default App;
