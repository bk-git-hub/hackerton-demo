import {
  TinderRoot,
  TinderLikeButton,
  TinderCard,
  TinderNopeButton,
  TinderResetButton,
  TinderEmptyFallback,
} from './Slider';

// 1. 샘플 데이터 (실제 데이터는 API나 Props에서 가져올 수 있습니다)
const SAMPLE_CARDS = [
  {
    id: 1,
    name: '김철수',
    age: 24,
    major: '컴퓨터공학',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
  },
  {
    id: 2,
    name: '이영희',
    age: 22,
    major: '산업디자인',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500',
  },
  {
    id: 3,
    name: '박지민',
    age: 23,
    major: '소프트웨어',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500',
  },
];

export default function FindTeamMate() {
  return (
    <div className="flex h-fit w-full flex-col items-center md:p-4">
      {/* 상단 헤더 섹션 */}
      <div className="   text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            팀원 찾기
          </h2>
          <p className="text-sm leading-relaxed text-slate-500">
            마음에 드는 팀원을 오른쪽으로 스와이프 하세요!
          </p>
        </div>
      </div>

      {/* 2. 틴더 슬라이더 메인 영역 */}
      <TinderRoot cards={SAMPLE_CARDS}>
        <div className="relative h-100 w-70 md:h-140 md:w-85">
          {SAMPLE_CARDS.map((card, i) => (
            <TinderCard
              key={card.id}
              index={i}
              className="h-full w-full overflow-hidden rounded-3xl shadow-2xl"
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* 카드 내부 정보 오버레이 */}
              <div className="pointer-events-none absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-white">
                <p className="text-sm font-medium text-blue-400">
                  {card.major}
                </p>
                <h3 className="text-2xl font-bold">
                  {card.name}, <span className="font-light">{card.age}</span>
                </h3>
              </div>
            </TinderCard>
          ))}

          {/* 모든 카드를 소진했을 때 표시 */}
          <TinderEmptyFallback>
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white p-8 text-center shadow-inner">
              <div className="mb-4 text-5xl">🙌</div>
              <h2 className="text-xl font-bold text-slate-800">
                모든 인재를 확인했습니다!
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                새로운 팀원을 더 기다려볼까요?
              </p>
              <TinderResetButton className="mt-8 rounded-full bg-slate-900 px-8 py-3 font-bold text-white transition-all hover:bg-slate-800 active:scale-95">
                다시 보기
              </TinderResetButton>
            </div>
          </TinderEmptyFallback>
        </div>

        {/* 3. 하단 컨트롤 버튼 */}
        <div className="mt-4 flex items-center space-x-10">
          <TinderNopeButton className="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-red-50 active:scale-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500 transition-transform group-hover:rotate-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </TinderNopeButton>

          <TinderLikeButton className="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-green-50 active:scale-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-500 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </TinderLikeButton>
        </div>
      </TinderRoot>
    </div>
  );
}
