// src/components/Comment.tsx
import { useState, useRef, useEffect } from "react";
import menuIcon from "../assets/icon/icon_menu.svg";

export type CommentProps = {
  id: number;
  nickname: string;
  date: string;
  text: string;
  userId: number;
  isMine: boolean;
  onDelete: (commentId: number) => Promise<void>;
};

export default function Comment({
  id,
  nickname,
  date,
  text,
  isMine,
  onDelete,
}: CommentProps) {
  const [openMenu, setOpenMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  // ➤ 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !menuButtonRef.current?.contains(e.target as Node)
      ) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-sm relative border border-gray-200">

      {/* 오른쪽 상단 메뉴 아이콘 */}
      {isMine && (
        <button
          ref={menuButtonRef}
          onClick={() => setOpenMenu(!openMenu)}
          className="absolute top-3 right-3 p-2"
        >
          <img src={menuIcon} alt="menu" className="w-4 h-4" />
        </button>
      )}

      {/* 닉네임 */}
      <p className="text-[16px] font-medium text-gray-900">{nickname}</p>

      {/* 날짜 */}
      <p className="text-[12px] text-[#B3B3B3]">{date}</p>

      {/* 내용 */}
      <p className="text-[15px] text-gray-800 mt-2 whitespace-pre-line leading-relaxed">
        {text}
      </p>

      {/* 메뉴 드롭다운 */}
      {openMenu && isMine && (
        <div
          ref={menuRef}
          className="absolute right-3 top-10 w-28 bg-white shadow-lg rounded-lg py-2 z-50"
        >
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-100"
            onClick={() => {
              setOpenMenu(false);
              onDelete(id);
            }}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
