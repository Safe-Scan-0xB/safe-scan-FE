// src/components/PostCard.tsx
import commentIcon from "../assets/icon/icon_comment.svg";

interface PostCardProps {
  title: string;
  content: string;
  date: string;
  commentCount: number;
  imageUrls?: string;
}

export default function PostCard({
  title,
  content,
  date,
  commentCount,
  imageUrls,
}: PostCardProps) {
  return (
    <div className="w-full border border-[#D9D9D9] bg-white rounded-[9px] p-4 flex gap-4 h-[125px] items-center">
      
      {/* 왼쪽 이미지 영역 */}
      {imageUrls && (
        <div className="w-24 h-full flex-shrink-0 flex items-center">
          <img
            src={imageUrls}
            alt="post image"
            className="w-24 h-24 object-cover rounded-md"
          />
        </div>
      )}

      {/* 오른쪽 텍스트 영역 */}
      <div className="flex-1 flex flex-col h-full">
        
        {/* 제목 + 내용 묶음 */}
        <div>
          {/* 제목 */}
          <h3 className="font-gantari font-medium text-[16px] md:text-[17px] lg:text-[17px] text-[#1E1E1E] mb-1">
            {title}
          </h3>

          {/* 내용 */}
          <p className="font-gantari text-[13px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-[#757575] line-clamp-2 overflow-hidden">
            {content}
          </p>
        </div>

        {/* 날짜 + 댓글 (맨 아래 고정) */}
        <div className="mt-auto flex justify-between items-center text-[10px] sm:text-xs md:text-[12px] text-gray-400">
          <span>{date}</span>
          <div className="flex items-center gap-1">
            <img src={commentIcon} alt="comment" className="w-4 h-4" />
            <span>{commentCount}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
