import { motion } from 'framer-motion';

interface ProjectPlanetProps {
  project: any;
  index: number;
  total: number;
  isSelected: boolean;
  isMobile: boolean; // 추가된 Prop
  onClick: () => void;
}

export const ProjectPlanet = ({
  project,
  index,
  total,
  isSelected,
  isMobile,
  onClick,
}: ProjectPlanetProps) => {
  const angle = (index / total) * 2 * Math.PI;

  // 🔥 모바일일 때는 반지름을 줄여서 화면 안에 다 들어오게 함
  const baseRadius = isMobile ? 100 : 140;
  const scoreGap = isMobile ? 1.5 : 3;
  const radius = baseRadius + (100 - project.matchScore) * scoreGap;

  const posX = Math.cos(angle) * radius;
  const posY = Math.sin(angle) * radius;

  return (
    <motion.div
      className={`absolute z-30 flex cursor-pointer items-center justify-center rounded-full shadow-lg transition-colors
        ${
          project.matchScore > 90
            ? 'bg-emerald-500 shadow-emerald-500/30'
            : 'bg-blue-500 shadow-blue-500/30'
        } 
        ${isSelected ? 'ring-2 ring-white scale-110' : 'ring-0'}`}
      style={{ width: isMobile ? 48 : 56, height: isMobile ? 48 : 56 }}
      initial={{ x: posX, y: posY, opacity: 0 }}
      animate={{
        x: isSelected ? posX * 0.4 : posX,
        y: isSelected ? posY * 0.4 : posY,
        opacity: 1,
        scale: isSelected ? 1.2 : 1,
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="text-white scale-75 md:scale-100">{project.icon}</div>
    </motion.div>
  );
};
