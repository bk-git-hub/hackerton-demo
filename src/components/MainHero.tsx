import { motion } from 'framer-motion';
import { Rocket, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MainHero() {
  const navigate = useNavigate();

  return (
    <section className="relative flex h-[85vh] w-full flex-col items-center justify-center overflow-hidden bg-slate-950 px-6">
      {/* 배경 글로우 효과 */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,58,138,0.2)_0%,_transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 flex flex-col items-center text-center space-y-6"
      >
        {/* 수정: Orbit Systems -> AI 기반 팀 매칭 플랫폼 */}
        <div className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-blue-400 uppercase">
          AI Based Team Matching Platform
        </div>

        {/* 수정: DISCOVER YOUR NEXT MISSION -> 나에게 딱 맞는 프로젝트 찾기 */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
          FIND YOUR <br />
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            IDEAL PROJECT
          </span>
        </h1>

        {/* 수정: 기술 주파수/안착 -> 기술 스택 분석/최적화된 매칭 */}
        <p className="mx-auto max-w-xl text-lg font-medium text-slate-400">
          우주매치는 사용자의 기술 스택을 분석하여{' '}
          <br className="hidden md:block" />
          가장 효율적인 팀 빌딩과 매칭 경험을 제공합니다.
        </p>

        {/* CTA 버튼: 특별 탐색 시작하기 -> 프로젝트 탐색 시작하기 */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/explore')}
          className="group relative mt-10 flex items-center gap-4 rounded-full bg-blue-600 px-10 py-5 text-xl font-black text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:bg-blue-500"
        >
          <Rocket
            size={24}
            className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
          />
          <span>프로젝트 탐색 시작하기</span>
          <ChevronRight size={20} className="opacity-50" />
        </motion.button>
      </motion.div>
    </section>
  );
}
