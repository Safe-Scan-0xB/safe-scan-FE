// src/pages/communityPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "../components/TabBar";
import Header from "../components/Header";
import PostCard from "../components/PostCard"; 
import plusIcon from "../assets/icon/plus.svg";
import bubble from "../assets/icon/bubble.svg"; 
import bubbleTail from "../assets/icon/bubble_tail.svg"; 
import x from "../assets/icon/x_icon.svg"; 

type Category = "전체" | "사례 공유" | "피해자 찾기" | "기타";

type Post = {
  id: number;
  title: string;
  excerpt: string;
  categoryName: Category;
  createdAt: string;
  commentCount: number;
  imageUrls?: string[];
};

const CATEGORIES: Category[] = ["전체", "사례 공유", "피해자 찾기", "기타"];

function CommunityPage() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [showTip, setShowTip] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const hidden = sessionStorage.getItem("communityCreateTooltipHidden");
    if (hidden === "true") setShowTip(false);
  }, []);

  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/posts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.error("게시글 불러오기 실패");
        return;
      }

      const data = await res.json();

      //Enum → 한글 매핑
      const categoryNameMap: Record<string, Category> = {
        "CASE_SHARE": "사례 공유",
        "FIND_VICTIM": "피해자 찾기",
        "ETC": "기타",
      };

      const formattedPosts = data.content.map((post: any) => ({
        ...post,
        categoryName: categoryNameMap[post.categoryName] || "기타",
      }));

      setPosts(formattedPosts);
    } catch (err) {
      console.error("서버 연결 실패:", err);
    }
  };

  fetchPosts();
}, []);


  const handleCloseTip = () => {
    setShowTip(false);
    sessionStorage.setItem("communityCreateTooltipHidden", "true");
  };

  const filteredPosts = posts.filter((post) => {
    const matchCategory =
      selectedCategory === "전체" || post.categoryName === selectedCategory;
    const keyword = searchTerm.trim().toLowerCase();
    const matchSearch =
      keyword === "" ||
      post.title.toLowerCase().includes(keyword) ||
      post.excerpt.toLowerCase().includes(keyword);
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow flex flex-col items-center pt-20 pb-24 px-4">
        {/* 검색창 */}
        <div className="w-full max-w-[450px] sm:max-w-md md:max-w-2xl lg:max-w-3xl mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="다른 피해 사례를 확인해 보세요."
            className="w-full border border-gray-200 rounded-[15px] px-4 py-3 text-xs sm:text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#012148]"
          />
        </div>

        {/* 카테고리 */}
        <div className="w-full max-w-[450px] sm:max-w-md md:max-w-2xl lg:max-w-3xl flex justify-between gap-1 border-b border-gray-200 pb-2 mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-1 text-xs sm:text-sm py-2 rounded-[10px] transition-all ${
                selectedCategory === cat
                  ? "bg-[#012148] text-white"
                  : "text-gray-500 bg-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 게시글 리스트 */}
        <section className="w-full max-w-[450px] sm:max-w-md md:max-w-2xl lg:max-w-3xl space-y-3">
          {filteredPosts.length === 0 ? (
            <p className="text-center text-xs sm:text-sm text-gray-400">
              조건에 맞는 글이 없습니다.
            </p>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="cursor-pointer hover:bg-gray-50 transition-all rounded-lg"
                onClick={() => navigate(`/community/${post.id}`)}
              >
                <PostCard
                  title={post.title}
                  content={post.excerpt}
                  date={post.createdAt}
                  commentCount={post.commentCount}
                  imageUrls={post.imageUrls?.[0]}
                />
              </div>
            ))
          )}
        </section>
      </main>

      {/* 질문 생성 버튼 + 말풍선 */}
      <div className="fixed bottom-[80px] right-5 z-40 flex flex-col items-end">
        {/* 말풍선 */}
        {showTip && (
          <div className="relative mb-4 w-[210px] h-[40px]">
            <img
              src={bubble}
              alt="말풍선 배경"
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center pl-4 pr-0">
              <span className="text-white text-xs sm:text-sm">
                피해 사례를 등록해보세요.
              </span>
              <button
                onClick={handleCloseTip}
                className="text-white p-3 "
              >
                <img src={x} alt="닫기" className="w-4 h-4" />
              </button>
            </div>
            <img
              src={bubbleTail}
              alt="말풍선 꼬리"
              className="absolute -bottom-[7px] right-6 w-4 h-2"
            />
          </div>
        )}

        {/* 동그라미 버튼 */}
        <button
          onClick={() => navigate("/community/create")}
          className="w-16 h-16 rounded-full bg-[#283A4E] shadow-lg 
                     flex items-center justify-center 
                     hover:bg-[#001730] transition-all"
        >
          <img
            src={plusIcon}
            alt="add"
            className="w-7 h-7 object-contain"
          />
        </button>
      </div>

      <TabBar />
    </div>
  );
}

export default CommunityPage;
