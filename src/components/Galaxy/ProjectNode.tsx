import { motion } from 'framer-motion';

interface ProjectNodeProps {
  project: any;
  index: number;
  total: number;
  isSelected: boolean;
  isMobile: boolean;
  onClick: () => void;
}

export const ProjectNode = ({
  project,
  index,
  total,
  isSelected,
  isMobile,
  onClick,
}: ProjectNodeProps) => {
  const angle = (index / total) * 2 * Math.PI;

  // 1. 거리를 더 극적으로 계산 (지수 함수 적용)
  const minRadius = isMobile ? 60 : 90;
  // 점수 차이가 클수록 거리가 제곱 비례로 멀어지게 설정
  const scoreDiff = 100 - project.matchScore;
  const gap = Math.pow(scoreDiff, 1.6) * 0.6;
  const radius = minRadius + gap;

  const posX = Math.cos(angle) * radius;
  const posY = Math.sin(angle) * radius;

  return (
    <motion.div
      className={`absolute flex cursor-pointer items-center justify-center rounded-full shadow-2xl
        ${
          project.matchScore > 90
            ? 'bg-emerald-500 shadow-emerald-500/50'
            : 'bg-blue-500 shadow-blue-500/30'
        }
        ${isSelected ? 'ring-4 ring-white' : 'ring-0'}`}
      style={{
        width: isMobile ? 44 : 60,
        height: isMobile ? 44 : 60,
        // 🔥 Z-Index 수정: 세부 패널(z-50)보다 낮게, 선택 시 40, 평상시 10 내외
        zIndex: isSelected ? 40 : Math.floor(project.matchScore / 10),
      }}
      initial={false}
      animate={{
        x: isSelected ? posX * 0.3 : posX,
        y: isSelected ? posY * 0.3 : posY,
        opacity: 1,
        scale: isSelected ? 1.2 : 0.6 + (project.matchScore / 100) * 0.7,
      }}
      // 초고속 반응 유지
      transition={{
        type: 'spring',
        stiffness: 800,
        damping: 50,
        mass: 0.1,
        restDelta: 0.1,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="absolute -top-7 whitespace-nowrap rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-black text-white border border-white/20">
        {project.matchScore}%
      </div>
      <div className="text-white text-lg md:text-xl">{project.icon}</div>
    </motion.div>
  );
};
