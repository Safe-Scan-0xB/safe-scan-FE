import { useState, useEffect } from "react";
import BtnLong from "../components/btn";
import cameraIcon from "../assets/icon/icon_camera.svg";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

type Category = "사례 공유" | "피해자 찾기" | "기타";

type ExistingImage = {
  id: number;
  url: string;
};

function EditPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("사례 공유");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);

  const [newImages, setNewImages] = useState<File[]>([]);

  const categories: Category[] = ["사례 공유", "피해자 찾기", "기타"];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/posts/${postId}`);
        if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");

        const data = await res.json();

        setTitle(data.title);
        setContent(data.content);
        if (categories.includes(data.category)) {
          setCategory(data.category);
        } else {
          setCategory("사례 공유"); 
          }
        const fixedImages = (data.images || []).map((img: ExistingImage) => ({
        ...img,
        url: img.url.startsWith("http")
          ? img.url
          : `${API_BASE_URL}${img.url}`,
      }));

      setExistingImages(fixedImages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [postId]);

  const handleImageUpload = (e: any) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files) as File[];

    if (existingImages.length + newImages.length + files.length > 9) {
      alert("이미지는 최대 9장까지 업로드할 수 있습니다.");
      return;
    }

    setNewImages((prev) => [...prev, ...files]);
    e.target.value = "";
  };


  const removeExistingImage = (id: number) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, idx) => idx !== index));
  };


  const handleEdit = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("categoryName", category);

    existingImages.forEach((img) => {
      formData.append("keepPhotoIds", img.id.toString());
    });


    newImages.forEach((file) => {
      formData.append("newImages", file);
    });

    try {
      const res = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("수정 실패");
      }

      alert("수정 완료되었습니다!");
      navigate("/community");
    } catch (err) {
      console.error(err);
      alert("게시물 수정에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-4">
      {/* 상단 헤더 */}
      <header className="relative w-full flex items-center pt-6 pb-2 bg-white">
        <BackButton className="h-8 w-auto" />
        <h2 className="absolute left-1/2 -translate-x-1/2 text-lg font-medium text-[22px]">
          게시물 수정
        </h2>
      </header>

      <div className="w-full max-w-[600px] mx-auto">
        {/* 제목 */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 작성해주세요."
          className="w-full border border-gray-200 rounded-md px-3 py-3 mt-5 mb-3 bg-gray-50"
        />

        {/* 내용 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요."
          className="w-full border border-gray-200 rounded-md px-3 py-3 mb-4 bg-gray-50 min-h-40"
        />

        {/* 이미지 영역 */}
        <div className="mb-5 flex items-start gap-3 flex-wrap">
          {/* 업로드 버튼 */}
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
              <img src={cameraIcon} alt="사진 추가" className="w-6 h-6 mb-1" />
              <span className="text-xs text-gray-500">
                {existingImages.length + newImages.length}/9
              </span>
            </label>
          </div>

          {/* 기존 이미지 */}
          {existingImages.map((img) => (
            <div
              key={img.id}
              className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100"
            >
              <img src={img.url} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeExistingImage(img.id)}
                className="absolute top-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full"
              >
                X
              </button>
            </div>
          ))}

          {/* 새 이미지 미리보기 */}
          {newImages.map((file, index) => (
            <div
              key={index}
              className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100"
            >
              <img
                src={URL.createObjectURL(file)}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeNewImage(index)}
                className="absolute top-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        </div>

        {/* 카테고리 */}
        <section className="mb-8">
          <h2 className="text-sm font-bold mb-3">카테고리</h2>
          <div className="flex gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm ${
                  category === c
                    ? "bg-[#2C3E54] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* 수정 버튼 */}
        <BtnLong label="수정하기" className="w-full mb-8" onClick={handleEdit} />
      </div>
    </div>
  );
}

export default EditPostPage;
