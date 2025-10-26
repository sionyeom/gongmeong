# 공명 (Gongmeong) - 트렌드 생각들

> 지금 이 순간 사람들이 생각하고 있는 것들을 확인해보세요

공명은 실시간으로 사람들의 생각과 트렌드를 시각화하는 모바일 우선 웹 애플리케이션입니다. 인터랙티브한 키워드 버블을 통해 현재 인기 있는 주제들을 탐색할 수 있습니다.

## ✨ 주요 기능

### 🎯 트렌드 시각화
- **인터랙티브 키워드 버블**: 물리 엔진 기반의 동적 버블 애니메이션
- **실시간 카운트**: 각 키워드별 참여자 수 표시
- **색상 구분**: 키워드별 고유 색상으로 시각적 구분
- **크기 차별화**: 인기도에 따른 버블 크기 조절

### 📱 모바일 최적화
- **반응형 디자인**: 모바일 우선 설계
- **터치 인터랙션**: 직관적인 터치 조작
- **고정 너비**: 데스크톱에서 모바일 크기로 제한
- **부드러운 애니메이션**: 모바일 성능 최적화

### 🎨 사용자 경험
- **직관적 네비게이션**: 하단 탭 바를 통한 쉬운 이동
- **시각적 피드백**: 터치 및 호버 효과
- **키워드 선택**: 클릭으로 상세 정보 확인
- **부드러운 전환**: 자연스러운 페이지 전환

## 🛠 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: CSS Transitions, Custom Physics Engine
- **Icons**: Emoji-based Icon System
- **Font**: Geist Sans, Geist Mono

## 📱 화면 구성

### 메인 화면 (트렌드)
- **헤더**: "트렌드 생각들" 타이틀
- **서브타이틀**: "지금 이 순간 사람들이 생각하고 있는 것들"
- **키워드 버블 영역**: 
  - Coffee (490), NewBeginning (323), Workout (541)
  - Reading (371), Healing (489), Morning (70)
  - Meditation (364), Gratitude (346), Focus (130)
  - Wellness (161), Mindfulness (185)
  - Growth (404), Peace (149), Journey (78), Balance (271)

### 네비게이션
- **트렌드** 📊: 메인 트렌드 화면
- **공명** 🔗: 피드 화면
- **글쓰기** ✍️: 글 작성 화면
- **알림** 🔔: 알림 화면
- **마이** 👤: 마이페이지

## 🎨 디자인 특징

### 색상 팔레트
- **배경**: 그라데이션 (gray-900 → blue-900 → purple-900)
- **키워드 색상**: 
  - 파란색 계열: Coffee, Focus
  - 보라색 계열: NewBeginning, Meditation, Balance
  - 청록색 계열: Workout, Mindfulness, Gratitude
  - 초록색 계열: Reading, Growth
  - 핑크색 계열: Healing, Peace
  - 노란색 계열: Morning, Journey
  - 자홍색 계열: Wellness

### 레이아웃
- **최대 너비**: 448px (max-w-md)
- **중앙 정렬**: 데스크톱에서 양쪽 여백
- **모바일 우선**: 전체 화면 활용
- **고정 네비게이션**: 하단 탭 바

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

## 📁 프로젝트 구조

```
gongmeong/
├── app/
│   ├── (main)/
│   │   └── page.tsx          # 메인 트렌드 페이지
│   ├── feed/
│   │   └── page.tsx          # 피드 페이지
│   ├── write/
│   │   └── page.tsx          # 글쓰기 페이지
│   ├── notification/
│   │   └── page.tsx          # 알림 페이지
│   ├── mypage/
│   │   └── page.tsx          # 마이페이지
│   ├── layout.tsx            # 루트 레이아웃
│   └── globals.css           # 전역 스타일
├── components/
│   ├── Header.tsx            # 헤더 컴포넌트
│   ├── Footer.tsx            # 푸터 네비게이션
│   └── FeedModal.tsx        # 피드 모달
└── public/                   # 정적 파일
```

## 🎯 핵심 기능 구현

### 물리 엔진 기반 버블 애니메이션
- **충돌 감지**: 버블 간 충돌 및 반발 처리
- **경계 반사**: 화면 경계에서의 반사 효과
- **속도 제한**: 부드러운 애니메이션을 위한 속도 제어
- **일시정지**: 키워드 선택 시 애니메이션 일시정지

### 반응형 디자인
- **모바일 우선**: 448px 최대 너비로 제한
- **터치 최적화**: 48px 최소 터치 영역
- **성능 최적화**: 150ms 애니메이션 프레임 레이트

## 🔧 커스터마이징

### 키워드 추가/수정
`app/(main)/page.tsx`의 `keywords` 배열에서 키워드를 관리할 수 있습니다:

```typescript
const keywords = [
  { name: "Coffee", count: 490, color: "text-blue-400", size: "large" },
  // ... 더 많은 키워드
];
```

### 색상 변경
Tailwind CSS 클래스를 사용하여 키워드 색상을 변경할 수 있습니다.

### 애니메이션 조정
물리 엔진 파라미터를 조정하여 애니메이션 속도와 동작을 변경할 수 있습니다.

## 📄 라이선스

MIT License

---

**공명**으로 새로운 생각과 트렌드를 발견해보세요! 🌟