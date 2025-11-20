// src/pages/createPostPage.tsx
import { useState } from "react";
import BtnLong from "../components/btn";
import cameraIcon from "../assets/icon/icon_camera.svg";
import { Link } from "react-router-dom";
import arrow from "../assets/icon/icon_arrowLeft.svg";

type Category = "사례 공유" | "피해자 찾기" | "기타";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState<Category>("사례 공유");

  const categories: Category[] = ["사례 공유", "피해자 찾기", "기타"];

  // 이미지 업로드 (최대 9장)
  const handleImageUpload = (e: any) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files) as File[];
    const newImages = [...images];

    files.forEach((file) => {
      if (newImages.length < 9) {
        const url = URL.createObjectURL(file);
        newImages.push(url);
      }
    });

    setImages(newImages);
    e.target.value = ""; // 같은 파일 다시 선택 가능하도록 초기화
  };

  // 개별 이미지 삭제
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-4">

      {/* 상단 헤더 */}
      <header className="relative w-full flex items-center pt-6 pb-2 bg-white">
        <Link to="/community" className="flex items-center">
          <img
            src={arrow}
            alt="arrow"
            className="h-8 sm:h-9 md:h-9 lg:h-9 w-auto transition-all duration-200"
          />
        </Link>
        <h2 className="absolute left-1/2 -translate-x-1/2 text-lg font-medium text-[22px]">
          게시물 작성
        </h2>
      </header>

      <div className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] mx-auto">


        {/* 제목 입력 */}
        <input
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          placeholder="제목을 작성해주세요."
          className="w-full border border-gray-200 rounded-md px-3 py-3 mt-5 mb-3 text-sm sm:text-base bg-gray-50"
        />

        {/* 내용 입력 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`피해 사례를 작성해주세요.
            
            ✔ 등록 전 꼭 확인해주세요!
            - 등록 주의 사항
            -`}
          className="w-full border border-gray-200 rounded-md px-3 py-3 mb-4 text-sm sm:text-base bg-gray-50 min-h-40 whitespace-pre-line"
        />

        {/* 이미지 업로드 영역 */}
        <div className="mb-5 flex items-center gap-3">
          <div>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="imageInput"
              className="w-20 h-20 sm:w-24 sm:h-24 border border-gray-200 rounded-md bg-gray-50 flex flex-col items-center justify-center cursor-pointer"
            >
              <img
                src={cameraIcon}
                alt="사진 추가"
                className="w-6 h-6 mb-1 opacity-70"
              />
              <span className="text-xs text-gray-500">
                {images.length}/9
              </span>
            </label>
          </div>

          {/* 업로드된 이미지 미리보기 */}
          <div className="flex flex-wrap gap-2">
            {images.map((src, i) => (
              <div
                key={i}
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden bg-gray-100"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 카테고리 선택 */}
        <section className="mb-8 w-full">
          <h2 className="text-sm sm:text-base font-bold mb-3">카테고리</h2>
          <div className="flex gap-2 justify-start">
            {categories.map((c) => {
              const isActive = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all ${
                    isActive
                      ? "bg-[#2C3E54] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </section>

        {/* 등록 버튼 */}
        <div className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] mx-auto mb-8">
          <BtnLong label="등록하기" className="w-full" />
        </div>

      </div>
    </div>
  );
}

export default CreatePostPage;
