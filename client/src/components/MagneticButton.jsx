import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const MagneticButton = ({
  children,
  className = "",
  strength = 0.35,
  to,
  href,
  ...props
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = to ? (
    <Link to={to} className={`magnetic-btn ${className}`} {...props}>
      {children}
    </Link>
  ) : href ? (
    <a href={href} className={`magnetic-btn ${className}`} {...props}>
      {children}
    </a>
  ) : (
    <button type="button" className={`magnetic-btn ${className}`} {...props}>
      {children}
    </button>
  );

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {inner}
    </motion.div>
  );
};

export default MagneticButton;
