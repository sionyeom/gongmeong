"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function WriterPage() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    // 실제 구현에서는 API 호출
    setTimeout(() => {
      setIsSubmitting(false);
      setContent("");
      alert("생각이 발송되었습니다! 🚀");
    }, 1000);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setContent(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Header title="오늘의 생각" />
      
      <div className="px-4 py-6 pb-24">
        {/* 안내 메시지 */}
        <div className="text-center mb-8">
          <p className="text-gray-300 text-sm">
            지금 이 순간 당신의 생각을 자유롭게 적어보세요
          </p>
        </div>

        {/* 글쓰기 영역 */}
        <div className="space-y-6">
          {/* 텍스트 에리어 */}
          <div className="relative">
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="오늘 무엇을 생각하고 계신가요?"
              className="w-full h-[60vh] bg-gray-800/50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-cyan-400 transition-colors"
              maxLength={500}
            />
            <div className="absolute bottom-3 right-3 text-gray-400 text-xs">
              {content.length}/500
            </div>
          </div>

          {/* 알려드려요 섹션 */}
          <div className="bg-gray-800/30 border border-gray-600 rounded-xl p-4">
            <h4 className="text-white font-medium text-sm mb-3 flex items-center">
              💡 알려드려요
            </h4>
            <ul className="space-y-2 text-gray-300 text-xs">
              <li>• 게시물은 24시간 후 자동으로 사라집니다</li>
              <li>• 공감을 많이 받으면 수명이 연장됩니다</li>
              <li>• AI가 키워드를 분석해 비슷한 생각들과 연결해드려요</li>
            </ul>
          </div>

          {/* 발송 버튼 */}
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            className={`w-full py-3 px-4 rounded-xl font-medium text-base transition-all duration-200 ${
              content.trim() && !isSubmitting
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 hover:from-cyan-500 hover:to-blue-600"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "발송 중..." : "생각 발송하기"}
          </button>
        </div>
      </div>

      <Footer activeTab="write" />
    </div>
  );
}