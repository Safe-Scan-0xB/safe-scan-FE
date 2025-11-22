// src/mainPage.tsx
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import PostCard from "../components/PostCard";
import searchIcon from "../assets/icon/icon_search.svg";
import chatIcon from "../assets/icon/icon_chat.svg"; 

import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { useState, useEffect } from "react";
import "swiper/css"; 
import 'swiper/css/pagination';
import { getToken } from "../utils/token";

function MainPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [hotPosts, setHotPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchHotPosts = async () => {
      try {
        const res = await fetch("/api/posts/hot", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.error("HOT 게시글 불러오기 실패");
          return;
        }

        const data = await res.json();
        setHotPosts(data); 
      } catch (err) {
        console.error("서버 연결 실패:", err);
      }
    };

    fetchHotPosts();
  }, []);

  const handleSearch = async () => {
    if (!searchValue) return;

    try {
      const token = getToken();

      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;


      const res = await fetch(`/api/scan?url=${encodeURIComponent(searchValue)}`, {
        method: "GET",
        headers,
      });

      const data = await res.json();

      if (res.status === 404) {
        alert("URL 형식이 잘못되었습니다.");
        return;
      }

      if (!res.ok) {
        alert(data.msg || "링크 검사 중 오류가 발생했습니다.");
        return;
      }

      if (data.state === "안전") {
        navigate(`/result/safe?url=${encodeURIComponent(searchValue)}&url_count=${data.url_count}`);
      } else if (data.state === "위험") {
        navigate(`/result/danger?url=${encodeURIComponent(searchValue)}&url_count=${data.url_count}`);
      } else {
        alert("예상치 못한 응답입니다.");
      }

    } catch (err) {
      console.error(err);
      alert("서버 연결에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* 큰 회색 박스 */}
      <section className="w-full flex justify-center px-4 mt-[90px]">
        <div
          className="w-[95%] md:max-w-3xl lg:max-w-4xl 
                     bg-[#88A4C6] rounded-[9px] px-8 py-8 flex flex-col gap-3"
        >
          <p className="font-gantari font-medium text-[15px] sm:text-[15px] md:text-[16px] lg:text-[17px] px-1">
            의심이 되는 링크를 확인해 보세요.
          </p>

          {/* 하얀색 입력 필드 */}
          <div className="flex items-center bg-white rounded-lg pl-4 pr-3 py-2 gap-2">
            <input
              type="text"
              placeholder="URL 검색"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-grow outline-none text-[13px] sm:text-[13px] md:text-[14px] lg:text-[15px] rounded-[5px] font-gantari placeholder:text-gray-400"
            />

            <div className="w-11 h-8 bg-[#2C3E54] rounded-[4px] flex items-center justify-center cursor-pointer">
              <button onClick={handleSearch}>
                <img
                  src={searchIcon}
                  alt="search"
                  className="w-4 h-4 active:opacity-60"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOT 인기글 */}
      <section className="w-full flex justify-center px-4 mt-[40px]">
        <p
          className="w-[95%] md:max-w-3xl lg:max-w-4xl 
                font-gantari font-semibold text-[16px] sm:text-[16px] 
                md:text-[17px] lg:text-[18px]"
        >
          🔥HOT 인기게시글
        </p>
      </section>

      {/* 캐러셀 */}
      <section className="w-full flex justify-center px-4 mt-2 relative">
        <div className="w-[95%] md:max-w-3xl lg:max-w-4xl relative">
          
          <Swiper
            className="w-full"
            spaceBetween={16}
            slidesPerView={1}
            centeredSlides={true}
            modules={[Pagination]}
            pagination={{ clickable: true }}
          >
            {hotPosts.length > 0 ? (
              hotPosts.map((post) => (
                <SwiperSlide key={post.id} className="!w-full">
                  <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/community/${post.id}`)}
                  >
                    <PostCard
                    title={post.title}
                    content={post.excerpt}
                    date={post.createdAt}
                    commentCount={post.commentCount}
                    imageUrls={post.imageUrls?.[0] || undefined}
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide className="!w-full">
                <p className="text-center text-gray-500 py-10">
                  🔥 인기 게시글을 불러오는 중...
                </p>
              </SwiperSlide>
            )}
          </Swiper>
        
          <button
            onClick={() => navigate("/chatbot")}
            className="fixed bottom-[80px] right-6 w-20 h-20 rounded-full shadow-lg bg-white flex items-center justify-center hover:scale-105 transition-transform"
          >
            <img src={chatIcon} alt="Chat" className="w-full h-full object-cover" />
          </button>
        </div>
      </section>

      <TabBar />
    </div>
  );
}

export default MainPage;
