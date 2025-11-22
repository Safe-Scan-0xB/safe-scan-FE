// src/pages/createPostPage.tsx
import { useState } from "react";
import BtnLong from "../components/btn";
import cameraIcon from "../assets/icon/icon_camera.svg";
import { Link, useNavigate } from "react-router-dom";
import arrow from "../assets/icon/icon_arrowLeft.svg";

type Category = "사례 공유" | "피해자 찾기" | "기타";

function CreatePostPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState<Category>("사례 공유");

  const categories: Category[] = ["사례 공유", "피해자 찾기", "기타"];

  const categoryMap: Record<Category, number> = {
    "사례 공유": 0,
    "피해자 찾기": 1,
    "기타": 2,
  };

  // 이미지 업로드 (최대 9장)
  const handleImageUpload = (e: any) => {
    if (!e.target.files) return;

    const uploadFiles = Array.from(e.target.files) as File[];

    const newPreview = [...previewImages];
    const newFiles = [...files];

    uploadFiles.forEach((file) => {
      if (newPreview.length < 9) {
        newPreview.push(URL.createObjectURL(file));
        newFiles.push(file);
      }
    });

    setPreviewImages(newPreview);
    setFiles(newFiles);

    e.target.value = "";
  };

  // 이미지 삭제
  const removeImage = (index: number) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index));
    setFiles(files.filter((_, i) => i !== index));
  };

  // 게시글 등록 API 요청
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("categoryId", String(categoryMap[category]));

    // 파일 추가
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        alert("게시글 등록에 실패했습니다.");
        return;
      }

      await response.json();
      alert("게시글이 등록되었습니다!");

      navigate("/community");
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-4">

      {/* 상단 헤더 */}
      <header className="relative w-full flex items-center pt-6 pb-2 bg-white">
        <Link to="/community" className="flex items-center">
          <img
            src={arrow}
            alt="arrow"
            className="h-8 sm:h-9 md:h-9 lg:h-9 w-auto"
          />
        </Link>
        <h2 className="absolute left-1/2 -translate-x-1/2 text-lg font-medium text-[22px]">
          게시물 작성
        </h2>
      </header>

      <div className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] mx-auto">

        {/* 제목 */}
        <input
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          placeholder="제목을 작성해주세요."
          className="w-full border border-gray-200 rounded-md px-3 py-3 mt-5 mb-3 bg-gray-50"
        />

        {/* 내용 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="피해 사례를 작성해주세요."
          className="w-full border border-gray-200 rounded-md px-3 py-3 mb-4 bg-gray-50 min-h-40"
        />

        {/* 이미지 업로드 */}
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
              className="w-20 h-20 border border-gray-200 rounded-md bg-gray-50 flex flex-col items-center justify-center cursor-pointer"
            >
              <img src={cameraIcon} alt="사진 추가" className="w-6 h-6 mb-1 opacity-70" />
              <span className="text-xs text-gray-500">{previewImages.length}/9</span>
            </label>
          </div>

          {/* 미리보기 */}
          <div className="flex flex-wrap gap-2">
            {previewImages.map((src, i) => (
              <div key={i} className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 카테고리 */}
        <section className="mb-8">
          <h2 className="text-base font-bold mb-3">카테고리</h2>
          <div className="flex gap-2">
            {categories.map((c) => {
              const isActive = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-full ${
                    isActive ? "bg-[#2C3E54] text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </section>

        {/* 등록 버튼 */}
        <div className="mb-8">
          <BtnLong label="등록하기" className="w-full" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default CreatePostPage;
