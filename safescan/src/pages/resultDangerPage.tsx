// src/resultDangerPage.tsx
import TabBar from "../components/TabBar";
import Header from "../components/Header";
import { useSearchParams } from "react-router-dom";
import dangerIcon from "../assets/icon/icon_danger.svg"; 

function ResultDangerPage() {
  const [params] = useSearchParams();
  const url = params.get("url");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* 상단 박스 */}
      <section className="w-full flex justify-center px-4 mt-[100px]">
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
                     bg-[#F5F5F5] rounded-[9px] py-10 px-6 flex flex-col items-start gap-2"
        >
          <p className="text-[19px] font-gantari font-weight:500 text-[#000000]">현재</p>
          <p className="text-[19px] font-gantari font-weight:500">
            <span className="text-[#D2524C] font-gantari font-bold">{url}</span>
            <span className="text-[#000000]">&nbsp;로</span>
          </p>
          <p className="text-[19px] font-gantari font-weight:500 text-[#000000]">등록된 신고 횟수 : 32건</p>
        </div>
      </section>

      <TabBar />
    </div>
  );
}

export default ResultDangerPage;
