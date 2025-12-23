import { motion } from 'framer-motion';

export const CenterNode = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* 다중 펄스 레이어 (시각적 업그레이드) */}
      {[1.2, 1.8, 2.4].map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-blue-500/30"
          style={{ width: isMobile ? 64 : 80, height: isMobile ? 64 : 80 }}
          animate={{
            scale: [1, s],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* 중앙 메인 코어 */}
      <motion.div
        className={`relative z-20 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 shadow-[0_0_30px_rgba(37,99,235,0.6)] border-2 border-blue-400/30
        ${isMobile ? 'h-16 w-16' : 'h-20 w-20'}`}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span className="text-[8px] md:text-[10px] font-black tracking-widest text-blue-200 uppercase">
          Analysis
        </span>
        <span className="text-sm md:text-base font-black text-white">CORE</span>
      </motion.div>
    </div>
  );
};
