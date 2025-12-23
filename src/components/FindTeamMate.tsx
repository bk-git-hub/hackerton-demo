import React from 'react';
import {
  TinderRoot,
  TinderLikeButton,
  TinderCard,
  TinderNopeButton,
  TinderResetButton,
  TinderEmptyFallback,
} from './Slider';
import { Rocket, Zap, X, Heart, RefreshCw, Cpu } from 'lucide-react';

// --- 샘플 데이터 (Orbit 최적화) ---
const SAMPLE_CARDS = [
  {
    id: 1,
    name: '김철수',
    sq: 98,
    major: 'Backend / DevOps',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    tags: ['Node.js', 'Docker'],
  },
  {
    id: 2,
    name: '이영희',
    sq: 94,
    major: 'UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500',
    tags: ['Figma', 'Prototyping'],
  },
  {
    id: 3,
    name: '박지민',
    sq: 89,
    major: 'Frontend Developer',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500',
    tags: ['React', 'Three.js'],
  },
];

export default function FindTeamMate() {
  return (
    <div className="flex h-fit w-full flex-col items-center bg-transparent">
      {/* 1. 헤더 섹션: 시스템 스캔 메시지 */}
      <div className="mb-10 text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-600/20 rounded-2xl text-blue-400 animate-pulse">
            <Cpu size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">
          Crew Discovery Scan
        </h2>
        <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">
          Swipe right to initialize matching
        </p>
      </div>

      {/* 2. 틴더 슬라이더 메인 영역 */}
      <TinderRoot cards={SAMPLE_CARDS}>
        <div className="relative h-[420px] w-[300px] md:h-[500px] md:w-[360px]">
          {SAMPLE_CARDS.map((card, i) => (
            <TinderCard
              key={card.id}
              index={i}
              className="h-full w-full overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 shadow-2xl"
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* 카드 내부 정보 오버레이 (Glassmorphism) */}
              <div className="pointer-events-none absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-600 text-[10px] font-black rounded-md uppercase tracking-wider">
                    SQ {card.sq}%
                  </span>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                    {card.major}
                  </span>
                </div>

                <h3 className="text-3xl font-black tracking-tighter mb-4">
                  {card.name}
                </h3>

                <div className="flex gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 상단 스캔 라인 효과 (데코레이션) */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-scan" />
            </TinderCard>
          ))}

          {/* 3. Empty Fallback (스캔 완료 상태) */}
          <TinderEmptyFallback>
            <div className="flex h-full flex-col items-center justify-center rounded-[32px] border border-white/5 bg-slate-900/50 backdrop-blur-xl p-8 text-center shadow-inner">
              <div className="mb-6 p-5 bg-slate-800 rounded-full text-slate-500">
                <RefreshCw size={40} />
              </div>
              <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">
                Scan Complete
              </h2>
              <p className="mt-2 text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
                No more potential <br /> entities found in range
              </p>

              <TinderResetButton className="mt-10 group flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-black text-slate-950 transition-all hover:bg-blue-400 active:scale-95 shadow-lg">
                <RefreshCw
                  size={18}
                  className="group-hover:rotate-180 transition-transform duration-500"
                />
                RESCAN SECTOR
              </TinderResetButton>
            </div>
          </TinderEmptyFallback>
        </div>

        {/* 4. 하단 컨트롤 버튼 (고성능 대시보드 스타일) */}
        <div className="mt-10 flex items-center space-x-8">
          <TinderNopeButton className="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-3xl bg-slate-900 border border-white/5 shadow-xl transition-all hover:bg-rose-500/10 hover:border-rose-500/30 active:scale-90">
            <X
              size={32}
              className="text-rose-500 transition-transform group-hover:rotate-90"
            />
          </TinderNopeButton>

          <TinderLikeButton className="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-3xl bg-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:bg-blue-500 active:scale-90 border border-blue-400/30">
            <Heart
              size={32}
              className="text-white fill-white transition-transform group-hover:scale-110"
            />
          </TinderLikeButton>
        </div>
      </TinderRoot>
    </div>
  );
}
