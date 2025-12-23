import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Globe, Database, Rocket, Code2, X } from 'lucide-react';
import { GalaxyLoading } from './GalaxyLoading';
import { ProjectPlanet } from './ProjectPlanet';

const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: 'AI기반 주식 플랫폼',
    matchScore: 95,
    tech: ['React', 'Python'],
    icon: <Cpu />,
  },
  {
    id: 2,
    title: '친환경 커머스 마켓',
    matchScore: 88,
    tech: ['React', 'Node.js'],
    icon: <Globe />,
  },
  {
    id: 3,
    title: '블록체인 투표 시스템',
    matchScore: 75,
    tech: ['Solidity'],
    icon: <Database />,
  },
  {
    id: 4,
    title: '3D 모델링 뷰어',
    matchScore: 60,
    tech: ['Three.js'],
    icon: <Code2 />,
  },
  {
    id: 5,
    title: '음악 협업툴',
    matchScore: 82,
    tech: ['Socket.io'],
    icon: <Rocket />,
  },
];

export default function ProjectGalaxyView() {
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 1. 화면 크기 감지 (반응형)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const selectedProject = SAMPLE_PROJECTS.find((p) => p.id === selectedId);

  if (loading) return <GalaxyLoading />;

  return (
    <div
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-950 touch-none"
      onClick={() => setSelectedId(null)}
    >
      {/* 배경 장식 (모바일에서는 크기 축소) */}
      <div
        className={`absolute rounded-full border border-white/5 ${
          isMobile ? 'h-64 w-64' : 'h-[500px] w-[500px]'
        }`}
      />

      {/* 중앙: ME 노드 */}
      <div
        className={`absolute z-20 flex flex-col items-center justify-center rounded-full bg-blue-600 shadow-2xl transition-all
        ${isMobile ? 'h-16 w-16' : 'h-20 w-20'}`}
      >
        <span className="text-[8px] md:text-[10px] text-blue-200">YOU</span>
        <span className="text-xs md:text-sm font-black text-white">DEV</span>
      </div>

      {/* 행성들 */}
      <div className="relative flex items-center justify-center">
        {SAMPLE_PROJECTS.map((project, i) => (
          <ProjectPlanet
            key={project.id}
            project={project}
            index={i}
            total={SAMPLE_PROJECTS.length}
            isSelected={selectedId === project.id}
            isMobile={isMobile}
            onClick={() => setSelectedId(project.id)}
          />
        ))}
      </div>

      {/* 상세 정보창 (모바일: 바텀시트 / 데스크톱: 사이드바) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            // 🔥 모바일은 아래에서 위로, 데스크톱은 오른쪽에서 왼쪽으로
            initial={isMobile ? { y: '100%' } : { x: 300, opacity: 0 }}
            animate={isMobile ? { y: 0 } : { x: 0, opacity: 1 }}
            exit={isMobile ? { y: '100%' } : { x: 300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed z-50 bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-6 md:p-8 shadow-2xl
              ${
                isMobile
                  ? 'bottom-0 left-0 right-0 rounded-t-[40px] border-t'
                  : 'right-6 top-6 bottom-6 w-80 rounded-3xl'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모바일용 핸들바 */}
            {isMobile && (
              <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-slate-700" />
            )}

            <button
              onClick={() => setSelectedId(null)}
              className="absolute right-6 top-6 text-slate-500 hover:text-white"
            >
              <X size={isMobile ? 24 : 20} />
            </button>

            <div className="mt-2">
              <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase">
                Mission Selected
              </span>
              <h3 className="mt-1 text-2xl font-black text-white leading-tight">
                {selectedProject.title}
              </h3>

              {/* 매칭 프로그레스 */}
              <div className="mt-6 flex items-center gap-3">
                <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedProject.matchScore}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-blue-400">
                  {selectedProject.matchScore}%
                </span>
              </div>

              <p className="mt-8 text-sm leading-relaxed text-slate-400">
                해당 프로젝트의 요구 스택과 당신의 기술 셋이 매우 높은 공명
                지수를 보입니다.
              </p>

              <button className="mt-8 w-full rounded-2xl bg-blue-600 py-4 font-black text-white shadow-xl shadow-blue-900/40 active:scale-95 transition-transform">
                프로젝트 도킹하기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-10 text-center pointer-events-none">
        <h1 className="text-[10px] font-mono tracking-[0.4em] text-blue-500/40 uppercase">
          System Orbit Active
        </h1>
      </div>
    </div>
  );
}
