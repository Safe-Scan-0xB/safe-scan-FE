// src/components/Comment.tsx
import { useState } from "react";
import menuIcon from "../assets/icon/icon_menu.svg";

type CommentProps = {
  nickname: string;
  date: string;
  text: string;
};

export default function Comment({ nickname, date, text }: CommentProps) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-sm relative border border-gray-200">
      {/* 오른쪽 상단 메뉴 아이콘 */}
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="absolute top-3 right-3 p-2"
      >
        <img src={menuIcon} alt="menu" className="w-4 h-4" />
      </button>

      {/* 닉네임 */}
      <p className="text-[16px] font-medium text-gray-900">{nickname}</p>

      {/* 날짜 */}
      <p className="text-[12px] text-[#B3B3B3]">{date}</p>

      {/* 내용 */}
      <p className="text-[15px] text-gray-800 mt-2 whitespace-pre-line leading-relaxed">
        {text}
      </p>

      {/* 메뉴 드롭다운 */}
      {openMenu && (
        <div className="absolute right-3 top-10 w-28 bg-white shadow-lg rounded-lg py-2 z-50">
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100">
            수정하기
          </button>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100">
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
