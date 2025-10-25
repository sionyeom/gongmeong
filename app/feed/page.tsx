"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FeedModal from "../../components/FeedModal";

export default function FeedPage() {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(["Coffee", "Meditation", "Reading", "Healing"]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [postLikes, setPostLikes] = useState<{[key: number]: number}>({});

  // 피드 데이터 (Figma 디자인 기반)
  const feedPosts = [
    {
      id: 1,
      author: "MorningPerson",
      avatar: "👤",
      content: "오늘 아침 커피 향이 유독 좋았다. 새로운 시작의 느낌이랄까... 이런 작은 순간들이 하루를 특별하게 만드는 것 같아.",
      keywords: ["#Coffee"],
      likes: 23,
      timeLeft: "8시간",
      type: "user"
    },
    {
      id: 2,
      author: "FitnessLover",
      avatar: "👤",
      content: "운동 후 느끼는 이 상쾌함. 몸과 마음이 모두 깨어나는 기분이다. 땀 한 방울 한 방울이 나를 더 강하게 만들어준다.",
      keywords: ["#Workout"],
      likes: 45,
      timeLeft: "12시간",
      type: "user"
    },
    {
      id: 3,
      author: "BookWorm",
      avatar: "👤",
      content: "책 한 페이지 한 페이지가 새로운 세상을 열어준다. 오늘은 어떤 이야기가 나를 기다리고 있을까?",
      keywords: ["#Reading"],
      likes: 12,
      timeLeft: "4시간",
      type: "user"
    },
    {
      id: 4,
      author: "ZenMaster",
      avatar: "👤",
      content: "명상하며 찾은 내 마음의 평화. 오늘도 감사한 하루를 보낼 수 있음에 진심으로 고마움을 느낀다.",
      keywords: ["#Meditation"],
      likes: 67,
      timeLeft: "16시간",
      type: "user"
    },
    {
      id: 5,
      author: "SelfCareGuru",
      avatar: "👤",
      content: "치유의 시간. 스스로를 돌보는 것의 중요함을 깨닫다. 나에게 가장 소중한 사람은 바로 나 자신이니까.",
      keywords: ["#Healing"],
      likes: 34,
      timeLeft: "6시간",
      type: "user"
    },
    {
      id: 6,
      author: "EarlyBird",
      avatar: "👤",
      content: "새벽 공기가 특별히 맑다. 세상이 깨어나기 전 이 조용한 시간이 내게는 가장 소중한 순간.",
      keywords: ["#Morning"],
      likes: 28,
      timeLeft: "10시간",
      type: "user"
    }
  ];

  const availableKeywords = [
    { name: "Coffee", active: selectedKeywords.includes("Coffee") },
    { name: "Meditation", active: selectedKeywords.includes("Meditation") },
    { name: "Reading", active: selectedKeywords.includes("Reading") },
    { name: "Healing", active: selectedKeywords.includes("Healing") }
  ];

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword) 
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleLikeClick = (postId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // 게시물 클릭 이벤트 방지
    
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        setPostLikes(prevLikes => ({
          ...prevLikes,
          [postId]: (prevLikes[postId] || feedPosts.find(p => p.id === postId)?.likes || 0) - 1
        }));
      } else {
        newSet.add(postId);
        setPostLikes(prevLikes => ({
          ...prevLikes,
          [postId]: (prevLikes[postId] || feedPosts.find(p => p.id === postId)?.likes || 0) + 1
        }));
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Header title="공명 피드" />
      
      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        {/* 나와 관련된 키워드 섹션 */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 mb-6">
          <p className="text-gray-300 text-sm mb-3">나와 관련된 키워드</p>
          <div className="flex flex-wrap gap-2">
            {availableKeywords.map((keyword) => (
              <button
                key={keyword.name}
                onClick={() => toggleKeyword(keyword.name)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  keyword.active
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "bg-gray-700/50 text-gray-400 border border-gray-600/30"
                }`}
              >
                #{keyword.name}
              </button>
            ))}
          </div>
        </div>

        {/* 피드 게시물들 */}
        <div className="space-y-4">
          {feedPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer"
            >
              {/* 게시물 헤더 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                    {post.avatar}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">{post.author}</h3>
                    <p className="text-gray-400 text-xs">{post.keywords[0]}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-pink-400 text-sm">♥ {post.likes}</span>
                </div>
              </div>

              {/* 게시물 내용 */}
              <p className="text-gray-200 text-sm leading-relaxed mb-3">
                {post.content}
              </p>

              {/* 게시물 푸터 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={(e) => handleLikeClick(post.id, e)}
                    className="flex items-center space-x-1 text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    <span className="text-sm">
                      {likedPosts.has(post.id) ? "♥" : "♡"}
                    </span>
                    <span className="text-sm">
                      {postLikes[post.id] !== undefined ? postLikes[post.id] : post.likes}
                    </span>
                  </button>
                </div>
                <span className="text-gray-400 text-xs">{post.timeLeft} 남음</span>
              </div>
            </div>
          ))}
        </div>

        {/* 안내 메시지 */}
        <div className="mt-6 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-4">
          <p className="text-gray-300 text-sm text-center">
            생각들을 터치해서 이동시키거나 탭해서 자세히 읽어보세요
          </p>
        </div>
      </div>

      <Footer activeTab="feed" />
      
      {/* 모달 */}
      <FeedModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPost}
      />
    </div>
  );
}