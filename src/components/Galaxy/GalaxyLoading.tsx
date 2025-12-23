import { motion } from 'framer-motion';

export const GalaxyLoading = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950">
      <div className="relative h-40 w-40">
        {/* 중앙 코어 */}
        <motion.div
          className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-blue-500 shadow-[0_0_20px_#3b82f6]"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* 회전하는 궤도들 */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 m-auto rounded-full border border-blue-500/30"
            style={{ width: i * 40, height: i * 40 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4 / i, repeat: Infinity, ease: 'linear' }}
          >
            <div
              className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]"
              style={{ marginTop: -4, marginLeft: '50%' }}
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <h2 className="text-xl font-bold tracking-widest text-white">
          ANALYZING SYNERGY...
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-mono">
          Searching projects near your orbit
        </p>
      </motion.div>
    </div>
  );
};
