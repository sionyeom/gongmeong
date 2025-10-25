"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Header title="마이 페이지" />
      
      <div className="max-w-md mx-auto px-4 pt-4 pb-24 space-y-6">
        {/* 프로필 섹션 */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl">👤</span>
          </div>
          <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 mx-auto -mt-6 ml-12"></div>
          <h2 className="text-white text-xl font-semibold mb-2">This Month's Activity</h2>
        </div>

        {/* 키워드 프로필 섹션 */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-2xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4">My Keyword Profile</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-sm">
              Healing
            </span>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-sm">
              Reading
            </span>
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-sm">
              SoloTime
            </span>
          </div>
          
          {/* 통계 */}
          <div className="flex justify-between">
            <div className="text-center">
              <div className="text-white text-2xl font-bold">28</div>
              <div className="text-gray-400 text-sm">게시물</div>
            </div>
            <div className="text-center">
              <div className="text-white text-2xl font-bold">110</div>
              <div className="text-gray-400 text-sm">연결</div>
            </div>
            <div className="text-center">
              <div className="text-white text-2xl font-bold">47</div>
              <div className="text-gray-400 text-sm">공감</div>
            </div>
          </div>
        </div>

        {/* 활성 게시물 섹션 */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Active Posts (3)</h3>
          <div className="space-y-3">
            {/* 게시물 1 */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                  <div>
                    <h4 className="text-white font-medium">Cast I for Rides</h4>
                    <p className="text-gray-400 text-sm">3:05&</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-white">❤️</span>
                  <span className="text-white text-sm">12</span>
                </div>
              </div>
            </div>

            {/* 게시물 2 */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                  <div>
                    <h4 className="text-white font-medium">Yoga Tore a Fin Hell</h4>
                    <p className="text-gray-400 text-sm">4시간 전</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-white">❤️</span>
                  <span className="text-white text-sm">23</span>
                </div>
              </div>
            </div>

            {/* 게시물 3 */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                  <div>
                    <h4 className="text-white font-medium">Auld Roe Hateos</h4>
                    <p className="text-gray-400 text-sm">3:05&</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-white">❤️</span>
                  <span className="text-white text-sm">8</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 프리미엄 업그레이드 버튼 */}
        <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-semibold py-3 px-6 rounded-xl hover:from-cyan-500 hover:to-blue-600 transition-all duration-200">
          ⭐ Upgrade to Premium
        </button>
      </div>

      <Footer activeTab="mypage" />
    </div>
  );
}