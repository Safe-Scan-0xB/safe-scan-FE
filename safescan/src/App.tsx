// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";
import CommunityPage from "./pages/communityPage";
import ChatPage from "./pages/chatPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <MainPage />
        }
      />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/chatbot" element={<ChatPage />} />
    </Routes>

  );
}

export default App;
