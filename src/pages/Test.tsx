import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Code2, Database, Globe, Cpu } from 'lucide-react';

// --- 1. 샘플 데이터 정의 ---
// matchScore(SQ지수)가 높을수록 중심에 가깝게 배치됩니다.
const MY_SKILLS = ['React', 'TypeScript', 'Node.js'];
const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: 'AI기반 주식 플랫폼',
    matchScore: 95,
    tech: ['React', 'Python', 'AI'],
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
    tech: ['Solidity', 'React'],
    icon: <Database />,
  },
  {
    id: 4,
    title: '3D 모델링 뷰어',
    matchScore: 60,
    tech: ['Three.js', 'WebGL'],
    icon: <Code2 />,
  },
  {
    id: 5,
    title: '음악 협업툴',
    matchScore: 82,
    tech: ['React', 'Socket.io'],
    icon: <Rocket />,
  },
  // ... 더 많은 프로젝트
];

// --- 2. 헬퍼 함수: 위치 계산기 ---
// 점수와 인덱스를 기반으로 원형 궤도상의 (x, y) 좌표를 계산합니다.
const calculatePosition = (index: number, total: number, score: number) => {
  const angle = (index / total) * 2 * Math.PI; // 360도를 n등분
  // 점수가 높을수록(100에 가까울수록) 반지름(radius)이 작아짐 (가까워짐)
  // 기본 거리 120px + 점수 반비례 거리 최대 250px
  const radius = 120 + (100 - score) * 3.5;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
};

export default function ProjectGalaxyView() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const hoveredProject = SAMPLE_PROJECTS.find((p) => p.id === hoveredId);

  return (
    // 🌌 우주 배경 컨테이너
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black">
      {/* 배경 별 효과 (장식용) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>

      {/* --- 3. 중심 노드 (나) --- */}
      <div className="absolute z-20 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-[0_0_50px_rgba(37,99,235,0.6)] ring-4 ring-blue-400/30">
        <div className="text-center text-white">
          <span className="block text-xs opacity-70">ME</span>
          <span className="font-bold">Front</span>
        </div>
        {/* 중심에서 퍼지는 파동 효과 */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full border-2 border-blue-500/50"
          animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* --- 4. 궤도 및 프로젝트 행성들 --- */}
      <div className="relative flex h-[800px] w-[800px] items-center justify-center">
        {/* 시각적 궤도선 (장식용) */}
        <div className="absolute h-[300px] w-[300px] rounded-full border border-slate-700/30"></div>
        <div className="absolute h-[500px] w-[500px] rounded-full border border-slate-700/30"></div>

        {/* 프로젝트 노드 렌더링 */}
        {SAMPLE_PROJECTS.map((project, index) => {
          // 초기 위치 계산
          const pos = calculatePosition(
            index,
            SAMPLE_PROJECTS.length,
            project.matchScore,
          );
          const isHovered = hoveredId === project.id;
          // 매칭 점수에 따른 색상 및 크기 결정
          const nodeColor =
            project.matchScore > 90
              ? 'bg-emerald-500 shadow-emerald-500/50'
              : project.matchScore > 80
              ? 'bg-blue-500 shadow-blue-500/50'
              : 'bg-slate-600 shadow-slate-500/50';
          const nodeSize = project.matchScore > 90 ? 'h-16 w-16' : 'h-12 w-12';

          return (
            <motion.div
              key={project.id}
              className={`absolute z-30 flex cursor-pointer items-center justify-center rounded-full shadow-lg ${nodeColor} ${nodeSize} text-white`}
              // 🔥 핵심 애니메이션 로직 🔥
              initial={{ x: pos.x, y: pos.y, opacity: 0 }}
              animate={{
                // 마우스 오버 시 중심(0,0) 쪽으로 강력하게 끌려옴, 아니면 원래 자리
                x: isHovered ? pos.x * 0.3 : pos.x,
                y: isHovered ? pos.y * 0.3 : pos.y,
                opacity: 1,
                // 둥둥 떠다니는 부유 효과 추가
                translateY: isHovered ? 0 : [0, -10, 0],
              }}
              transition={{
                // 위치 이동은 스프링처럼 쫀득하게
                x: { type: 'spring', stiffness: 150, damping: 15 },
                y: { type: 'spring', stiffness: 150, damping: 15 },
                // 부유 효과는 부드럽게 반복
                translateY: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: index * 0.2,
                },
              }}
              whileHover={{ scale: 1.2 }} // 호버 시 약간 커짐
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              {project.icon}
              {/* 높은 점수 노드에만 연결선 표시 (SVG 활용) */}
              {project.matchScore > 90 && (
                <svg
                  className="absolute pointer-events-none -z-20 overflow-visible"
                  style={{ left: -pos.x, top: -pos.y }}
                >
                  <line
                    x1="0"
                    y1="0"
                    x2={pos.x}
                    y2={pos.y}
                    stroke="rgba(16, 185, 129, 0.4)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                </svg>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* --- 5. 상세 정보 카드 (Pop-up) --- */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-10 z-50 w-80 rounded-2xl border border-slate-700/50 bg-slate-800/90 p-6 text-slate-100 backdrop-blur-xl shadow-2xl"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xl font-bold">{hoveredProject.title}</h3>
              <span
                className={`text-sm font-bold ${
                  hoveredProject.matchScore > 90
                    ? 'text-emerald-400'
                    : 'text-blue-400'
                }`}
              >
                SQ {hoveredProject.matchScore}%
              </span>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {hoveredProject.tech.map((t) => (
                <span
                  key={t}
                  className={`rounded-md px-2 py-1 text-xs ${
                    MY_SKILLS.includes(t)
                      ? 'bg-blue-500/30 text-blue-200 border border-blue-400/50'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
            <button className="w-full rounded-xl bg-blue-600 py-3 font-bold transition-colors hover:bg-blue-500">
              프로젝트 탐사하기
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 상단 타이틀 */}
      <div className="absolute top-10 text-center">
        <h1 className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-3xl font-black text-transparent">
          PROJECT GALAXY
        </h1>
        <p className="text-slate-400">
          당신과 시너지가 높은 프로젝트를 탐색하세요.
        </p>
      </div>
    </div>
  );
}
