// src/components/ChatBubble.tsx
import AiProfile from "../assets/icon/ai_profile.png";

type Props = {
  role: "ai" | "user";
  text: string;
  timeText?: string;
  className?: string;
};

export default function ChatBubble({ role, text, timeText, className = "" }: Props) {
  const isAI = role === "ai";

  // ===== AI 버블 (왼쪽) =====
  if (isAI) {
    return (
      <div className={`w-full flex items-start gap-2 ${className}`}>
        
        {/* 프로필 이미지 */}
        <img 
        src={AiProfile} 
        alt="AI" 
        className="flex-shrink-0 w-10 h-10 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-11 lg:h-11"
        />

        <div className="flex items-end gap-2 max-w-[75%]">

        <div className="px-4 py-2 bg-[#F5F5F5] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] border-b border-neutral-100">
            <p className="font-gantari font-medium text-neutral-700 whitespace-pre-line">
              {text}
            </p>
          </div>

          {/* 시간 (버블 오른쪽 끝에 맞추기) */}
          {timeText && (
            <span className="font-gantari font-semibold text-[#888888] whitespace-nowrap text-[12px]">
              {timeText}
            </span>
          )}
        </div>
      </div>
    );
  }


  // ===== 사용자 버블 (오른쪽) =====
  return (
    <div className={`w-full flex justify-end ${className}`}>
        
      <div className="flex flex-row-reverse items-end gap-2 max-w-[75%]">

        <div className="px-4 py-2 bg-[#2C3E54] rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[0px]">
          <p className="font-gantari text-white whitespace-pre-line">{text}</p>
        </div>

        {timeText && (
          <span className="font-gantari font-semibold text-[#888888] whitespace-nowrap text-[12px]">
            {timeText}
          </span>
        )}
        
      </div>
    </div>
  );
}
