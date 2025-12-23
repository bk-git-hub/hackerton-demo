import { motion } from 'framer-motion';

interface ConnectionLinesProps {
  projects: any[];
  selectedId: number | null;
  isMobile: boolean;
}

export const ConnectionLines = ({
  projects,
  selectedId,
  isMobile,
}: ConnectionLinesProps) => {
  return (
    <svg
      className="absolute inset-0 pointer-events-none z-0 overflow-visible"
      style={{ width: '100%', height: '100%' }}
    >
      {projects.map((project, i) => {
        const isSelected = selectedId === project.id;
        const angle = (i / projects.length) * 2 * Math.PI;

        // 노드 위치 계산 로직과 동일하게 설정 (동기화)
        const minRadius = isMobile ? 60 : 90;
        const scoreDiff = 100 - project.matchScore;
        const gap = Math.pow(scoreDiff, 1.6) * 0.6;
        const radius = minRadius + gap;

        // 최종 목적지 (Snap 속도 반영을 위해 node와 동일한 비율 적용)
        const targetRadius = isSelected ? radius * 0.3 : radius;
        const targetX = Math.cos(angle) * targetRadius;
        const targetY = Math.sin(angle) * targetRadius;

        return (
          <motion.line
            key={project.id}
            // SVG의 중심(50%, 50%)에서 시작
            x1="50%"
            y1="50%"
            // 중심으로부터의 상대 좌표를 SVG 좌표계로 변환 (translate)
            x2={`calc(50% + ${targetX}px)`}
            y2={`calc(50% + ${targetY}px)`}
            stroke={isSelected ? '#60a5fa' : '#ffffff'}
            strokeWidth={isSelected ? 2 : 1}
            strokeDasharray="4 4"
            initial={false}
            animate={{
              strokeOpacity: isSelected ? 0.8 : 0.15,
              strokeWidth: isSelected ? 2 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 800,
              damping: 50,
              mass: 0.1,
            }}
          />
        );
      })}
    </svg>
  );
};
