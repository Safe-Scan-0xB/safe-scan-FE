// src/pages/detailPostPage.tsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import sendIcon from "../assets/icon/send_icon.svg";
import sendIconActive from "../assets/icon/send_iconActive.svg";
import menuIcon from "../assets/icon/icon_menu.svg";
import exampleImage from "../assets/icon/Image.png";
import commentIcon from "../assets/icon/icon_comment.svg";
import Comment from "../components/comment";

type Comment = {
  id: number;
  name: string;
  text: string;
  date: string;
};

function DetailPostPage() {
  const { id } = useParams();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, name: "익명1", text: "조심해야겠네요", date: "2025.11.15" },
    { id: 2, name: "익명2", text: "비슷한 경험 있어요", date: "2025.11.15" },
    { id: 3, name: "익명3", text: "저도 당할 뻔했어요", date: "2025.11.15" },
  ]);

  const post = {
    title: `게시글 제목 #${id}`,
    content:
      "SNS로 높은 급여를 제시하며 접근해온 사기 사례입니다. 여러 피해자가 비슷한 패턴으로 접근받았습니다...",
    createdAt: "2025.11.15",
    images: [
      exampleImage,
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
    ],
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;

    const newId = comments.length + 1;
    const newComment: Comment = {
      id: newId,
      name: `익명${newId}`,
      text: commentInput,
      date: "2025.11.17",
    };

    // ✅ Prev 방식으로 수정 — 중복되는 문제 해결
    setComments((prev) => [...prev, newComment]);
    setCommentInput("");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white px-4 pb-[90px]">
      {/* 상단 헤더 */}
      <header className="relative w-full flex items-center justify-between pt-6 pb-2 bg-white">
        <BackButton className="h-8 w-auto transition-all duration-200" />

        <h2 className="absolute left-1/2 -translate-x-1/2 text-lg font-medium text-[22px]">
          커뮤니티
        </h2>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-8 h-8 transition-all"
          >
            <img
              src={menuIcon}
              alt="menu"
              className="h-5 sm:h-5 md:h-6 lg:h-6 w-auto transition-all duration-200"
            />
          </button>

          {isMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg p-3 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="space-y-2 text-base">
                <li
                  className="hover:text-[#2C3E54] cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate(`/community/edit/${id}`);
                  }}
                >
                  수정하기
                </li>

                <li
                  className="hover:text-[#2C3E54] cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    alert("삭제 실행");
                  }}
                >
                  삭제하기
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* 본문 */}
      <div className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] mx-auto mt-[20px]">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
          {post.title}
        </h1>

        <p className="text-xs sm:text-sm text-gray-500 mb-4">{post.createdAt}</p>

        <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line mb-4">
          {post.content}
        </p>

        {/* 이미지 슬라이드 */}
        <div className="flex overflow-x-auto flex-nowrap gap-2 no-scrollbar py-1">
          {post.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-[160px] h-[160px] flex-shrink-0 object-cover rounded-md"
              onClick={() => setSelectedImage(src)}
            />
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              className="max-w-[90%] max-h-[90%] rounded-lg object-contain"
              alt="full"
            />
          </div>
        )}

        {/* 댓글 리스트 */}
        <div className="mt-3 mb-4 space-y-3">
          <div className="mt-auto flex justify-between items-center text-[13px] sm:text-xs md:text-[14px] text-gray-400">
            <div className="flex items-center gap-1">
              <img src={commentIcon} alt="comment" className="w-5 h-5" />
              <span>댓글 {comments.length}</span>
            </div>
          </div>

          {comments.map((c) => (
            <Comment key={c.id} nickname={c.name} date={c.date} text={c.text} />
          ))}
        </div>
      </div>

      {/* 하단 입력창 */}
      <div className="w-full fixed bottom-0 left-0 bg-white px-4 py-3 flex justify-center border-t border-gray-200">
        <div className="flex items-center w-[95%] bg-[#F2F2F7] rounded-xl px-4 py-3">
          <input
            type="text"
            className="flex-grow bg-transparent px-2 outline-none text-[15px]"
            placeholder="댓글을 남겨보세요"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
          />

          <button onClick={handleAddComment} className="flex items-center">
            <img
              src={commentInput.length > 0 ? sendIconActive : sendIcon}
              alt="send"
              className="w-6 h-6 active:opacity-60"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPostPage;
