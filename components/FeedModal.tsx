"use client";

import { useState } from "react";

interface FeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: number;
    author: string;
    avatar: string;
    content: string;
    keywords: string[];
    likes: number;
    timeLeft: string;
    type: string;
  } | null;
}

export default function FeedModal({ isOpen, onClose, post }: FeedModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes || 0);

  if (!isOpen || !post) return null;

  const handleLikeClick = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 모달 컨텐츠 */}
      <div className="relative bg-gray-800 rounded-2xl p-6 mx-4 max-w-sm w-full max-h-[80vh] overflow-y-auto">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        {/* 게시물 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm">
              {post.avatar}
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">{post.author}</h3>
              <p className="text-gray-400 text-xs">{post.keywords[0]}</p>
            </div>
          </div>
        </div>

        {/* 게시물 내용 */}
        <div className="mb-4">
          <p className="text-gray-200 text-sm leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* 게시물 푸터 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <button 
              onClick={handleLikeClick}
              className="flex items-center space-x-1 text-pink-400 hover:text-pink-300 transition-colors"
            >
              <span className="text-sm">
                {isLiked ? "♥" : "♡"}
              </span>
              <span className="text-sm">{likeCount}</span>
            </button>
          </div>
          <span className="text-gray-400 text-xs">{post.timeLeft} 남음</span>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-200">
            공감하기
          </button>
          <button className="flex-1 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-200">
            댓글달기
          </button>
        </div>
      </div>
    </div>
  );
}
