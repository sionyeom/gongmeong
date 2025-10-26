"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function TrendPage() {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [bubblePositions, setBubblePositions] = useState<Array<{x: number, y: number, vx: number, vy: number}>>([]);
  const [pausedBubbles, setPausedBubbles] = useState<Set<number>>(new Set());
  const [keywordInfoRef, setKeywordInfoRef] = useState<HTMLDivElement | null>(null);

  // 키워드 데이터 (Figma 디자인 기반)
  const keywords = [
    { name: "Coffee", count: 490, color: "text-blue-400", size: "large" },
    { name: "NewBeginning", count: 323, color: "text-purple-400", size: "large" },
    { name: "Workout", count: 541, color: "text-cyan-400", size: "large" },
    { name: "Reading", count: 371, color: "text-green-400", size: "medium" },
    { name: "Healing", count: 489, color: "text-pink-400", size: "medium" },
    { name: "Morning", count: 70, color: "text-yellow-400", size: "small" },
    { name: "Meditation", count: 364, color: "text-indigo-400", size: "medium" },
    { name: "Gratitude", count: 346, color: "text-teal-400", size: "medium" },
    { name: "Focus", count: 130, color: "text-blue-400", size: "small" },
    { name: "Wellness", count: 161, color: "text-purple-400", size: "small" },
    { name: "Mindfulness", count: 185, color: "text-cyan-400", size: "small" },
    { name: "Growth", count: 404, color: "text-green-400", size: "medium" },
    { name: "Peace", count: 149, color: "text-pink-400", size: "small" },
    { name: "Journey", count: 78, color: "text-yellow-400", size: "small" },
    { name: "Balance", count: 271, color: "text-indigo-400", size: "medium" }
  ];

  // 버블 위치 초기화
  useEffect(() => {
    const initialPositions = keywords.map(() => ({
      x: Math.random() * 85 + 7.5, // 7.5% ~ 92.5% 범위
      y: Math.random() * 75 + 12.5, // 12.5% ~ 87.5% 범위로 더 넓게 분산
      vx: (Math.random() - 0.5) * 0.2, // 모바일에서 속도를 더 줄임
      vy: (Math.random() - 0.5) * 0.2
    }));
    setBubblePositions(initialPositions);
  }, []);

  // 충돌 감지 및 반발 함수
  const checkCollision = (pos1: {x: number, y: number, vx: number, vy: number}, pos2: {x: number, y: number, vx: number, vy: number}, size1: string, size2: string) => {
    const getRadius = (size: string) => {
      switch (size) {
        case "large": return 8; // 16px / 2
        case "medium": return 7; // 14px / 2
        case "small": return 6; // 12px / 2
        default: return 7;
      }
    };

    const r1 = getRadius(size1);
    const r2 = getRadius(size2);
    const minDistance = r1 + r2;
    
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < minDistance && distance > 0) {
      // 충돌 발생 - 반발 계산
      const overlap = minDistance - distance;
      const separationX = (dx / distance) * overlap * 0.5;
      const separationY = (dy / distance) * overlap * 0.5;
      
      // 속도 교환 (탄성 충돌)
      const relativeVx = pos2.vx - pos1.vx;
      const relativeVy = pos2.vy - pos1.vy;
      const dotProduct = relativeVx * dx + relativeVy * dy;
      
      if (dotProduct < 0) { // 서로 접근 중일 때만
        const impulse = (2 * dotProduct) / (distance * distance);
        const impulseX = impulse * dx;
        const impulseY = impulse * dy;
        
        return {
          pos1: {
            x: pos1.x - separationX,
            y: pos1.y - separationY,
            vx: pos1.vx + impulseX,
            vy: pos1.vy + impulseY
          },
          pos2: {
            x: pos2.x + separationX,
            y: pos2.y + separationY,
            vx: pos2.vx - impulseX,
            vy: pos2.vy - impulseY
          }
        };
      }
    }
    
    return null;
  };

  // 애니메이션 루프
  useEffect(() => {
    const animate = () => {
      setBubblePositions(prev => {
        const newPositions = [...prev];
        
        // 각 버블의 기본 움직임 계산
        for (let i = 0; i < newPositions.length; i++) {
          let pos = newPositions[i];
          
          // 일시정지된 버블은 움직이지 않음
          if (pausedBubbles.has(i)) {
            newPositions[i] = pos;
            continue;
          }
          
          let newX = pos.x + pos.vx;
          let newY = pos.y + pos.vy;
          let newVx = pos.vx;
          let newVy = pos.vy;

          // 경계에서 반사
          if (newX <= 5 || newX >= 90) {
            newVx = -newVx * 0.8;
            newX = Math.max(5, Math.min(90, newX));
          }
          if (newY <= 5 || newY >= 90) {
            newVy = -newVy * 0.8;
            newY = Math.max(5, Math.min(90, newY));
          }

          // 약간의 랜덤 움직임 추가 (모바일에서 더 부드럽게)
          newVx += (Math.random() - 0.5) * 0.005;
          newVy += (Math.random() - 0.5) * 0.005;

          // 속도 제한 (모바일에서 더 느리게)
          newVx = Math.max(-0.3, Math.min(0.3, newVx));
          newVy = Math.max(-0.3, Math.min(0.3, newVy));

          newPositions[i] = {
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        }

        // 충돌 감지 및 반발 처리 (일시정지된 버블은 제외)
        for (let i = 0; i < newPositions.length; i++) {
          for (let j = i + 1; j < newPositions.length; j++) {
            // 둘 다 일시정지된 경우 충돌 처리하지 않음
            if (pausedBubbles.has(i) && pausedBubbles.has(j)) {
              continue;
            }
            
            const collision = checkCollision(
              newPositions[i], 
              newPositions[j], 
              keywords[i].size, 
              keywords[j].size
            );
            
            if (collision) {
              newPositions[i] = collision.pos1;
              newPositions[j] = collision.pos2;
            }
          }
        }

        return newPositions;
      });
    };

    const interval = setInterval(animate, 150); // 모바일에서 더 부드럽게
    return () => clearInterval(interval);
  }, [pausedBubbles]);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "text-lg font-semibold px-3 py-2";
      case "medium":
        return "text-sm font-semibold px-2 py-1";
      case "small":
        return "text-xs font-semibold px-2 py-1";
      default:
        return "text-sm font-semibold px-2 py-1";
    }
  };

  const getBubbleSize = (size: string) => {
    switch (size) {
      case "large":
        return "w-16 h-16";
      case "medium":
        return "w-14 h-14";
      case "small":
        return "w-12 h-12";
      default:
        return "w-14 h-14";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Header title="트렌드 생각들" />
      
      <div className="px-2 py-4 pb-20">
        {/* 서브타이틀 */}
        <div className="text-center mb-4">
          <p className="text-gray-300 text-xs">지금 이 순간 사람들이 생각하고 있는 것들</p>
        </div>

        {/* 키워드 버블 컨테이너 */}
        <div className="relative bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-white/10 rounded-xl p-3 h-[60vh] overflow-hidden mx-2">
            {/* 키워드 버블들 */}
            {keywords.map((keyword, index) => {
              const position = bubblePositions[index];
              if (!position) return null;
              
              return (
                <div
                  key={keyword.name}
                  className={`absolute cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation ${
                    selectedKeyword === keyword.name ? 'scale-110 z-10' : ''
                  }`}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: 'translate(-50%, -50%)',
                    minWidth: '48px',
                    minHeight: '48px',
                  }}
                  onClick={() => {
                    const keywordIndex = keywords.findIndex(k => k.name === keyword.name);
                    
                    if (selectedKeyword === keyword.name) {
                      // 같은 키워드 클릭 - 선택 해제 및 일시정지 해제
                      setSelectedKeyword(null);
                      setPausedBubbles(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(keywordIndex);
                        return newSet;
                      });
                    } else {
                      // 다른 키워드 클릭 - 이전 선택 해제, 새 선택 및 일시정지
                      setSelectedKeyword(keyword.name);
                      setPausedBubbles(prev => {
                        const newSet = new Set<number>(prev);
                        newSet.add(keywordIndex);
                        return newSet;
                      });
                      
                      // 키워드 정보 섹션으로 부드럽게 스크롤
                      setTimeout(() => {
                        if (keywordInfoRef) {
                          keywordInfoRef.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                          });
                        }
                      }, 100);
                    }
                  }}
                >
                  <div className={`${getBubbleSize(keyword.size)} rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center hover:from-white/20 hover:to-white/10 transition-all duration-300 shadow-lg`}>
                    <span className={`${keyword.color} ${getSizeClasses(keyword.size)} text-center`}>
                      {keyword.name}
                    </span>
                    <span className="text-gray-300 text-xs font-bold">
                      {keyword.count}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        {/* 선택된 키워드 정보 */}
        {selectedKeyword && (
          <div 
            ref={setKeywordInfoRef}
            className="mt-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg p-3 mx-2"
          >
            <h3 className="text-white text-base font-semibold mb-2">
              {selectedKeyword} 관련 피드로 이동
            </h3>
            <p className="text-gray-300 text-xs">
              이 키워드와 관련된 게시글들을 확인해보세요.
            </p>
            <button className="mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-semibold py-2 px-3 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 text-sm">
              피드로 이동
            </button>
          </div>
        )}
      </div>

      <Footer activeTab="trend" />
    </div>
  );
}
