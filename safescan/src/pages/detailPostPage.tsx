// src/pages/detailPostPage.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import sendIcon from "../assets/icon/send_icon.svg";
import sendIconActive from "../assets/icon/send_iconActive.svg";
import menuIcon from "../assets/icon/icon_menu.svg";
import commentIcon from "../assets/icon/icon_comment.svg";
import Comment from "../components/comment";
import { AuthContext } from "../context/AuthContext";

type CommentType = {
  id: number;
  nickname: string;
  text: string;
  date: string;
  userId: string; 
};

type ImageType = {
  id: number;
  url: string;
};

type PostType = {
  id: number;
  title: string;
  content: string;
  categoryName: string;
  createdAt: string;
  viewCount: number;
  commentCount: number;
  userId: string; 
  images: ImageType[];
};

function getUserIdFromToken(token: string | null): string | null {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.sub || null; 
  } catch (err) {
    console.error("토큰 파싱 실패:", err);
    return null;
  }
}

function DetailPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext); 
  const currentUserId = getUserIdFromToken(token) || "";

  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL; // VITE_API_URL로 변경



  // 게시글 불러오기
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          console.error("게시글 불러오기 실패");
          return;
        }
        const data = await res.json();
        setPost({ ...data, userId: String(data.userId) }); 
      } catch (err) {
        console.error("서버 연결 실패:", err);
      }
    };
    fetchPost();
  }, [id]);

  // 댓글 불러오기
  useEffect(() => {
    if (!id) return;

    const fetchComments = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/posts/${id}/comments`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          console.error("댓글 불러오기 실패");
          return;
        }
        const data = await res.json();
        const formattedComments: CommentType[] = data.content.map((c: any) => ({
          id: c.id,
          nickname: c.userId || "익명",
          text: c.content,
          date: c.createdAt,
          userId: String(c.userId), 
        }));
        setComments(formattedComments);
      } catch (err) {
        console.error("댓글 서버 연결 실패:", err);
      }
    };
    fetchComments();
  }, [id]);

  useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      !menuButtonRef.current?.contains(e.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  if (isMenuOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isMenuOpen]);


  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        alert("삭제에 실패했습니다.");
        return;
      }
      let result;
      try {
        result = await res.json();
      } catch {
        result = 1;
      }
      if (result === 1) {
        alert("게시글이 삭제되었습니다.");
        navigate("/community");
      }
    } catch (err) {
      console.error("삭제 오류:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleAddComment = async () => {
    if (!commentInput.trim()) return;
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/posts/${id}/comments`,  {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: commentInput }),
      });
      if (!res.ok) {
        alert("댓글 등록 실패");
        return;
      }
      const newCommentId = await res.json();
      const newComment: CommentType = {
        id: newCommentId,
        nickname: currentUserId,
        text: commentInput,
        date: new Date().toISOString().slice(0, 10),
        userId: currentUserId,
      };
      setComments((prev) => [...prev, newComment]);
      setCommentInput("");
    } catch (err) {
      console.error("댓글 작성 오류:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/posts/${id}/comments/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        alert("댓글 삭제 실패");
        return;
      }

      try {
        const result = await res.json();
        if (result === 1 || result.success) {
          setComments((prev) => prev.filter((c) => c.id !== commentId));
        }
      } catch {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }

    } catch (err) {
      console.error("댓글 삭제 오류:", err);
      alert("서버 오류");
    }
  };

  if (!post) return <p className="p-4">게시글을 불러오는 중입니다...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-white px-4 pb-[90px] ">
      {/* 상단 헤더 */}
      <header className="relative w-full flex items-center justify-between pt-6 pb-2 bg-white">
        <BackButton className="h-8 w-auto transition-all duration-200" />
        <h2 className="absolute left-1/2 -translate-x-1/2 text-lg font-medium text-[21px]">
          커뮤니티
        </h2>

        {String(currentUserId) === String(post.userId) && (
          <div className="relative">
            <button ref={menuButtonRef} onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center justify-center w-8 h-8 transition-all">
              <img src={menuIcon} alt="menu" className="h-5 sm:h-5 md:h-6 lg:h-6 w-auto transition-all duration-200" />
            </button>
            {isMenuOpen && (
              <div ref={menuRef} className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg p-3 z-50" onClick={(e) => e.stopPropagation()}>
                <ul className="space-y-2 text-base">
                  <li className="hover:text-[#2C3E54] cursor-pointer" onClick={() => { setIsMenuOpen(false); navigate(`/community/edit/${id}`); }}>수정하기</li>
                  <li className="hover:text-[#2C3E54] cursor-pointer mt-[10px]" onClick={() => { setIsMenuOpen(false); handleDelete(); }}>삭제하기</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </header>

      {/* 본문 */}
      <div className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] mx-auto mt-[20px] px-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{post.title}</h1>
        
        <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line mb-4">{post.content}</p>

        {/* 이미지 리스트 */}
        <div className="flex overflow-x-auto flex-nowrap gap-2 no-scrollbar py-1">
          {post.images.map((img) => {
            const imageUrl = img.url.startsWith("http") 
            ? img.url 
            : `${API_BASE_URL}${img.url}`;
            return (
            <img
            key={img.id}
            src={imageUrl}
            alt=""
            className="w-[160px] h-[160px] flex-shrink-0 object-cover rounded-md"
            onClick={() => setSelectedImage(imageUrl)}
            />
          );
          })}

        </div>

        {/* 이미지 모달 */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
            <img src={selectedImage} className="max-w-[90%] max-h-[90%] rounded-lg object-contain" alt="full" />
          </div>
        )}

        {/* 댓글 리스트 */}
        
          <div className="mt-auto flex justify-between items-center text-[13px] sm:text-xs md:text-[14px] text-gray-500 mt-[12px]">
            <span>{post.createdAt}</span>
            <div className="flex items-center gap-1">
              <img src={commentIcon} alt="comment" className="w-5 h-5" />
              <span>댓글 {comments.length}</span>
            </div>
          </div>

          <div className="mt-5 mb-4 space-y-3">
          {comments.map((c) => (
            <Comment
              key={c.id}
              id={c.id}
              nickname={c.nickname}
              date={c.date}
              text={c.text}
              userId={Number(c.userId)} 
              isMine={String(currentUserId) === String(c.userId)}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      </div>

      {/* 하단 입력창 */}
      <div className="w-full fixed bottom-0 left-0 bg-white px-2 py-3 flex justify-center border-t border-gray-200">
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
            <img src={commentInput.length > 0 ? sendIconActive : sendIcon} alt="send" className="w-6 h-6 active:opacity-60" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPostPage;
