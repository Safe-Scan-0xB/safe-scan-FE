// src/mainPage.tsx
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import BtnLong from "../components/btn";

function MainPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* 중간 영역 (본문) */}
      <main className="flex-grow flex flex-col items-center justify-center gap-4">
        <p className="font-arialRounded text-lg">Arial Rounded</p>
        <p className="font-gantari font-light">Gantari 400</p>
        <p className="font-gantari font-medium">Gantari 500</p>
        <p className="font-gantari font-semibold">Gantari 600</p>
        <p className="font-gantari font-bold">Gantari 700</p>
        
        <div className="w-11/12 flex flex-col items-center gap-2">
        <BtnLong label="로그인" />
        <BtnLong label="비활성 버튼" disabled />
        </div>
      </main>

      <TabBar />

    </div>
  );
}

export default MainPage;
