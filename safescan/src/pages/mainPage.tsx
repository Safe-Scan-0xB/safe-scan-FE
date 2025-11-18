// src/mainPage.tsx
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import PostCard from "../components/PostCard";
import searchIcon from "../assets/icon/icon_search.svg";
import exampleImage from "../assets/icon/Image.png";
import chatIcon from "../assets/icon/icon_chat.svg"; 

import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { useState } from "react";
import "swiper/css"; 
import 'swiper/css/pagination';

function MainPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (!searchValue) return;

    // API 연결 전 임시
    const isSafe = searchValue.startsWith("0"); // 우선 0으로 시작하면 safe라고 가정

    if (isSafe) {
      navigate(`/result/safe?url=${searchValue}`);
    } else {
      navigate(`/result/danger?url=${searchValue}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* 큰 회색 박스 */}
      <section className="w-full flex justify-center px-4 mt-[90px]">
        <div
          className="w-[95%] md:max-w-3xl lg:max-w-4xl 
                     bg-[#D9D9D9] rounded-[9px] px-8 py-8 flex flex-col gap-3"
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
            
            <SwiperSlide className="!w-full">
              <PostCard
              title="사기 링크 조심하세요!"
              content="최근 올라온 링크 중 위험한 URL을 정리해봤습니다."
              date="2025.03.12"
              commentCount={12}
              imageUrl={exampleImage}
              />
            </SwiperSlide>
            <SwiperSlide className="!w-full">
              <PostCard
              title="사기 링크 조심하세요!"
              content="최근 올라온 링크 중 위험한 URL을 정리해봤습니다."
              date="2025.03.12"
              commentCount={12}
              />
            </SwiperSlide>
            <SwiperSlide className="!w-full">
              <PostCard
              title="사기 링크 조심하세요!"
              content="최근 올라온 링크 중 위험한 URL을 정리해봤습니다."
              date="2025.03.12"
              commentCount={12}
              />
            </SwiperSlide>
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
