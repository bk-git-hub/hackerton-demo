import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Globe, Database, Rocket, Code2, X } from 'lucide-react';
import { GalaxyLoading } from './GalaxyLoading';
import { ProjectNode } from './ProjectNode';
import { ConnectionLines } from './ConnectionLines';

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

export default function ProjectDiscoveryView() {
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 및 반응형 실시간 감지
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 로딩 시뮬레이션 (GalaxyLoading 노출)
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const selectedProject = SAMPLE_PROJECTS.find((p) => p.id === selectedId);

  // 🔥 로딩 섹션 복구
  if (loading) return <GalaxyLoading />;

  return (
    <div
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-950 touch-none"
      onClick={() => setSelectedId(null)}
    >
      {/* 1. 배경 가이드 라인 (현재 가용 반경에 맞춰 동적 조절) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0.15, 0.3, 0.42].map((ratio, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/[0.02]"
            style={{
              width:
                Math.min(dimensions.width, dimensions.height) * ratio * 2.5,
              height:
                Math.min(dimensions.width, dimensions.height) * ratio * 2.5,
            }}
          />
        ))}
      </div>

      {/* 2. 연결선 레이어 (ProjectNode와 동일한 Viewport Clamping 적용 필요) */}
      <ConnectionLines
        projects={SAMPLE_PROJECTS}
        selectedId={selectedId}
        isMobile={isMobile}
        dimensions={dimensions} // 화면 크기 전달
      />

      {/* 3. 중앙: CORE 노드 */}
      <div className="relative z-20 flex items-center justify-center">
        {[1.5, 2.2, 3].map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-blue-500/20"
            style={{ width: isMobile ? 60 : 80, height: isMobile ? 60 : 80 }}
            animate={{ scale: [1, s], opacity: [0.4, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: 'easeOut',
            }}
          />
        ))}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className={`flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 shadow-[0_0_40px_rgba(37,99,235,0.4)] border-2 border-blue-400/20
          ${isMobile ? 'h-16 w-16' : 'h-24 w-24'}`}
        >
          <span className="text-[8px] md:text-[10px] text-blue-200 font-bold uppercase tracking-widest">
            Analysis
          </span>
          <span className="text-xs md:text-sm font-black text-white leading-none">
            CORE
          </span>
        </motion.div>
      </div>

      {/* 4. 주변 프로젝트 노드들 */}
      <div className="relative flex items-center justify-center">
        {SAMPLE_PROJECTS.map((project, i) => (
          <ProjectNode
            key={project.id}
            project={project}
            index={i}
            total={SAMPLE_PROJECTS.length}
            isSelected={selectedId === project.id}
            isMobile={isMobile}
            dimensions={dimensions} // 화면 크기 전달
            onClick={() => setSelectedId(project.id)}
          />
        ))}
      </div>

      {/* 5. 상세 정보창 */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={isMobile ? { y: '100%' } : { x: 400, opacity: 0 }}
            animate={isMobile ? { y: 0 } : { x: 0, opacity: 1 }}
            exit={isMobile ? { y: '100%' } : { x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className={`fixed z-50 bg-slate-900/98 backdrop-blur-3xl border border-white/10 p-6 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.6)]
              ${
                isMobile
                  ? 'bottom-0 left-0 right-0 rounded-t-[40px] border-t'
                  : 'right-8 top-8 bottom-8 w-84 rounded-[32px]'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {isMobile && (
              <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-slate-800" />
            )}
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-mono text-blue-400 tracking-[0.2em] uppercase font-bold">
                Project Detail
              </span>
              <button
                onClick={() => setSelectedId(null)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X size={isMobile ? 24 : 20} />
              </button>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white leading-tight">
                {selectedProject.title}
              </h3>
              <div className="flex items-center gap-3">
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
              <p className="text-sm leading-relaxed text-slate-400">
                보유하신 기술 스택과 매우 높은 연관성을 가지고 있습니다. 즉시
                프로젝트에 기여 가능한 상태입니다.
              </p>
              <button className="w-full rounded-2xl bg-blue-600 py-4 font-black text-white shadow-xl shadow-blue-900/40 active:scale-95 hover:bg-blue-500 transition-all">
                프로젝트 참여 신청
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
