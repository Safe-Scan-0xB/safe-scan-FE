// src/communityPage.tsx
import TabBar from "../components/TabBar";

function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* 중간 영역 (본문) */}
      <main className="flex-grow flex flex-col items-center justify-center gap-4">
  
        <p className="font-gantari font-bold">커뮤니티 페이지</p>
        
    
      </main>

      <TabBar />

    </div>
  );
}

export default CommunityPage;
