import { motion } from "framer-motion";

const HireEasterEgg = ({ active, onDone }) => {
  if (!active) return null;

  return (
    <motion.div
      className="easter-egg-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={() => setTimeout(onDone, 4000)}
    >
      <motion.div
        className="easter-egg-content"
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="easter-egg-glitch"
          animate={{
            textShadow: [
              "2px 0 #22d3ee, -2px 0 #a78bfa",
              "-2px 0 #22d3ee, 2px 0 #a78bfa",
              "2px 0 #22d3ee, -2px 0 #a78bfa",
            ],
          }}
          transition={{ duration: 0.15, repeat: 20 }}
        >
          🚀 HIRE PROTOCOL ACTIVATED
        </motion.div>
        <p className="text-cyan-300/80 font-mono text-sm mt-4">
          Oussama is available for your next big build.
        </p>
        <div className="easter-egg-particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.span
              key={i}
              className="easter-particle"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
                opacity: 0,
              }}
              transition={{ duration: 1.5, delay: i * 0.05 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HireEasterEgg;
