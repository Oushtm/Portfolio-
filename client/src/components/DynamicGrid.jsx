import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const DynamicGrid = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame;
    let offset = 0;

    const animate = () => {
      offset = (offset + 0.15) % 60;
      el.style.backgroundPosition = `${offset}px ${offset}px`;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <div className="canvas-container bg-[#030308]" />
      <div ref={ref} className="dynamic-grid" aria-hidden="true" />
      <div className="grid-glow" aria-hidden="true" />
      <div className="scanline-overlay" aria-hidden="true" />
    </>
  );
};

export default DynamicGrid;
