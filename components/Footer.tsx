"use client";

import { useRouter } from 'next/navigation';

interface FooterProps {
  activeTab?: 'trend' | 'feed' | 'write' | 'notification' | 'mypage';
}

export default function Footer({ activeTab = 'trend' }: FooterProps) {
  const router = useRouter();

  const tabs = [
    { id: 'trend', icon: '📊', label: '트렌드', path: '/' },
    { id: 'feed', icon: '🔗', label: '공명', path: '/feed' },
    { id: 'write', icon: '✍️', label: '글쓰기', path: '/write' },
    { id: 'notification', icon: '🔔', label: '알림', path: '/notification' },
    { id: 'mypage', icon: '👤', label: '마이', path: '/mypage' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
      <div className="max-w-md mx-auto flex justify-around py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="flex flex-col items-center py-2 px-4"
            onClick={() => router.push(tab.path as string)}
          >
            <div className={`w-6 h-6 mb-1 ${
              activeTab === tab.id ? 'text-cyan-400' : 'text-gray-400'
            }`}>
              {tab.icon}
            </div>
            <span className={`text-xs ${
              activeTab === tab.id ? 'text-cyan-400' : 'text-gray-400'
            }`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
