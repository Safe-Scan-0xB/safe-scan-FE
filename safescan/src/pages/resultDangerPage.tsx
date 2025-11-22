// src/resultDangerPage.tsx
import TabBar from "../components/TabBar";
import Header from "../components/Header";
import { useSearchParams } from "react-router-dom";
import dangerIcon from "../assets/icon/icon_danger.svg"; 
import chatIcon from "../assets/icon/icon_chat.svg"; 
import { useNavigate } from "react-router-dom";

function ResultDangerPage() {
  const [params] = useSearchParams();
  const url = params.get("url");
  const url_count = params.get("url_count");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* 상단 박스 */}
      <section className="w-full flex justify-center px-4 mt-[90px]">
        <div
          className="w-[95%] md:max-w-3xl lg:max-w-4xl 
                     border-[2.8px] border-[#D2524C] bg-[#FFEBEB] rounded-[27px] 
                     py-[45px] px-4 flex flex-col items-center gap-4"
        >
          {/* 아이콘 + 텍스트 */}
          <div className="flex items-center justify-center gap-2">
            <img src={dangerIcon} alt="danger" className="w-8 h-8" />
            <p className="text-[#D2524C] font-gantari font-bold text-[24px]">
              위험 !
            </p>
          </div>
        </div>
      </section>

      {/* 회색 박스 */}
      <section className="w-full flex justify-center px-4 mt-4">
        <div
          className="w-[95%] md:max-w-3xl lg:max-w-4xl rounded-[17px]
                     bg-[#F5F5F5] rounded-[10px] py-12 px-6 flex flex-col items-start gap-2"
        >
          <p className="text-[20px] font-gantari font-weight:500 text-[#000000]">현재</p>
          <p className="text-[20px] font-gantari font-weight:500">
            <span className="text-[#D2524C] font-gantari font-bold">{url}</span>
            <span className="text-[#000000]">&nbsp;로</span>
          </p>
          <p className="text-[20px] font-gantari font-weight:500 text-[#000000]">등록된 신고 횟수 : {url_count} 건</p>
        </div>
      </section>

      <section className="w-full flex justify-center px-4 mt-4">
        <div
          className="w-[95%] md:max-w-3xl lg:max-w-4xl rounded-[20px]
                     bg-white border-[1px] border-[#2C3E54] rounded-[9px] py-5 px-6 flex flex-col items-start gap-2"
        >
          <p className="text-black font-gantari font-bold text-[16px]">
              안전가이드
          </p>
          <p className="text-[14px] font-gantari font-weight:500 text-[#000000]">- SafeScan이 당신의 안전을 지켜드립니다.</p>
          <p className="text-[14px] font-gantari font-weight:500 text-[#000000]">- 피해 예방 방법 및 대처 방법을 챗봇에게 물어보세요.</p>
          <p className="text-[14px] font-gantari font-weight:500 text-[#000000]">- 피싱 신고 금융감독원 1332</p>
        </div>
      </section>

      <button
            onClick={() => navigate("/chatbot")}
            className="fixed bottom-[80px] right-6 w-20 h-20 rounded-full shadow-lg bg-white flex items-center justify-center hover:scale-105 transition-transform"
          >
            <img src={chatIcon} alt="Chat" className="w-full h-full object-cover" />
      </button>


      <TabBar />
    </div>
  );
}

export default ResultDangerPage;
