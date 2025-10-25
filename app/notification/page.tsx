"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AlarmPage() {
  // 알림 데이터 (Figma 디자인 기반)
  const notifications = [
    {
      id: 1,
      type: "likes",
      title: "Likes",
      count: 156,
      description: "Posts: 23",
      time: "2분 전",
      isNew: true,
      icon: "❤️"
    },
    {
      id: 2,
      type: "likes_received",
      title: "Likes Received",
      count: 47,
      description: "Comments: 47",
      time: "5분 전",
      isNew: true,
      icon: "💙"
    },
    {
      id: 3,
      type: "discovery",
      title: "New Discoveries",
      description: "Someone liked your Deep Sleep Post",
      time: "10분 전",
      isNew: false,
      icon: "🔍"
    },
    {
      id: 4,
      type: "story",
      title: "New Cok Story",
      description: "post expires in 2hrs",
      time: "1시간 전",
      isNew: false,
      icon: "📖"
    },
    {
      id: 5,
      type: "similar_thoughts",
      title: "New thoughts similar to \"Winter\" appeared",
      description: "Reply on tea Daily life",
      time: "2시간 전",
      isNew: false,
      icon: "💭"
    },
    {
      id: 6,
      type: "like",
      title: "FitnoJob like",
      description: "Dec 12th 07:01",
      time: "3시간 전",
      isNew: false,
      icon: "👍"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "likes":
        return "❤️";
      case "likes_received":
        return "💙";
      case "discovery":
        return "🔍";
      case "story":
        return "📖";
      case "similar_thoughts":
        return "💭";
      case "like":
        return "👍";
      default:
        return "🔔";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "likes":
      case "likes_received":
        return "bg-cyan-500/20 border-cyan-500/30";
      default:
        return "bg-gray-600/20 border-gray-600/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Header title="알림" />
      
      <div className="px-4 pt-20 pb-24">
        {/* 최근 알림 섹션 */}
        <div className="mb-6">
          <h2 className="text-white text-lg font-semibold mb-4">최근 알림</h2>
        </div>

        {/* 알림 목록 */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-4 hover:bg-gray-800/70 transition-all duration-200 ${
                notification.isNew ? 'ring-1 ring-cyan-400/30' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                {/* 알림 아이콘 */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  notification.type === 'likes' || notification.type === 'likes_received'
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'bg-gray-600/20 text-gray-400'
                }`}>
                  {getNotificationIcon(notification.type)}
                </div>

                {/* 알림 내용 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-medium text-base">
                      {notification.title}
                    </h3>
                    {notification.count && (
                      <span className="text-cyan-400 font-bold text-lg">
                        {notification.count}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-2">
                    {notification.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">
                      {notification.time}
                    </span>
                    {notification.isNew && (
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 빈 상태 메시지 (알림이 없을 때) */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔔</span>
            </div>
            <h3 className="text-white text-lg font-medium mb-2">알림이 없습니다</h3>
            <p className="text-gray-400 text-sm">
              새로운 알림이 오면 여기에 표시됩니다
            </p>
          </div>
        )}
      </div>

      <Footer activeTab="notification" />
    </div>
  );
}