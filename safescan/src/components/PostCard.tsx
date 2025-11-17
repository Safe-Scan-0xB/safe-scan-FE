// src/components/PostCard.tsx
import commentIcon from "../assets/icon/icon_comment.svg";

interface PostCardProps {
  title: string;
  content: string;
  date: string;
  commentCount: number;
  imageUrl?: string;
}

export default function PostCard({
  title,
  content,
  date,
  commentCount,
  imageUrl,
}: PostCardProps) {
  return (
    <div
      className="w-full border border-[#D9D9D9] bg-white rounded-[9px] p-4 flex gap-4 h-[120px] items-center"
    >
      {/* 왼쪽 이미지 영역 */}
      {imageUrl && (
        <div className="w-24 h-full flex-shrink-0 flex items-center">
          <img
            src={imageUrl}
            alt="post image"
            className="w-25 h-25 object-cover rounded-md"
          />
        </div>
      )}

      {/* 오른쪽 텍스트 영역 */}
      <div className="flex-1 flex flex-col h-full">
        {/* 제목 */}
        <h3 className="font-gantari font-medium text-[16px] md:text-[17px] lg:text-[17px] text-[#1E1E1E] mb-1">
          {title}
        </h3>

        {/* 내용 */}
        <p className="font-gantari text-[14px] sm:text-[14px] md:text-[15px] lg:text-[15px] text-[#757575] line-clamp-2 overflow-hidden mb-3">
          {content}
        </p>

        {/* 날짜 + 댓글 */}
        <div className="flex justify-between items-center">
          <span className="font-gantari font-medium text-[13px] md:text-[14px] lg:text-[14px] text-[#B3B3B3]">
            {date}
          </span>
          <div className="flex items-center gap-1">
            <img src={commentIcon} alt="comment" className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-arialRounded text-[12px] md:text-[13px] lg:text-[13px] text-[#B3B3B3]">
              {commentCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

