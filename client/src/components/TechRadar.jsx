import {
  SKILL_CONNECTIONS,
  SKILL_GROUPS,
  SKILL_NODES,
} from "@/config/skillsRadar";
import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

const TechRadar = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);

  const connections = useMemo(
    () =>
      SKILL_CONNECTIONS.map(([a, b]) => {
        const nodeA = SKILL_NODES.find((n) => n.id === a);
        const nodeB = SKILL_NODES.find((n) => n.id === b);
        if (!nodeA || !nodeB) return null;
        return { a: nodeA, b: nodeB, key: `${a}-${b}` };
      }).filter(Boolean),
    [],
  );

  const isConnected = useCallback(
    (id) => {
      if (!hovered && !active) return false;
      const target = hovered || active;
      return SKILL_CONNECTIONS.some(
        ([a, b]) =>
          (a === target && b === id) || (b === target && a === id),
      );
    },
    [hovered, active],
  );

  const selected = SKILL_NODES.find((n) => n.id === (active || hovered));

  return (
    <div className="tech-radar-wrapper">
      <svg
        viewBox="0 0 100 100"
        className="tech-radar-svg"
        role="img"
        aria-label="Interactive technology radar"
      >
        {[20, 35, 50, 65].map((r) => (
          <circle
            key={r}
            cx="50"
            cy="50"
            r={r * 0.45}
            className="radar-ring"
          />
        ))}

        {connections.map(({ a, b, key }) => {
          const highlighted =
            hovered === a.id ||
            hovered === b.id ||
            active === a.id ||
            active === b.id;
          return (
            <motion.line
              key={key}
              x1={a.x * 100}
              y1={a.y * 100}
              x2={b.x * 100}
              y2={b.y * 100}
              className={`radar-connection ${highlighted ? "radar-connection--active" : ""}`}
              initial={{ pathLength: 0, opacity: 0.15 }}
              animate={{
                pathLength: 1,
                opacity: highlighted ? 0.9 : 0.2,
              }}
              transition={{ duration: 0.4 }}
            />
          );
        })}

        {SKILL_NODES.map((node) => {
          const group = SKILL_GROUPS[node.group];
          const isActive = active === node.id;
          const isHovered = hovered === node.id;
          const connected = isConnected(node.id);

          return (
            <g key={node.id}>
              <motion.circle
                cx={node.x * 100}
                cy={node.y * 100}
                r={isActive || isHovered ? 5 : 3.5}
                fill={group.color}
                className="radar-node"
                style={{
                  filter:
                    isActive || isHovered || connected
                      ? `drop-shadow(0 0 6px ${group.color})`
                      : "none",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() =>
                  setActive((prev) => (prev === node.id ? null : node.id))
                }
                whileHover={{ scale: 1.3 }}
                animate={{
                  opacity: active && !isActive && !connected ? 0.35 : 1,
                }}
              />
              {(isActive || isHovered) && (
                <text
                  x={node.x * 100}
                  y={node.y * 100 - 7}
                  textAnchor="middle"
                  className="radar-label"
                  fill={group.color}
                >
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {selected && (
        <motion.div
          className="radar-detail"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          key={selected.id}
        >
          <span
            className="radar-detail-badge"
            style={{ color: SKILL_GROUPS[selected.group].color }}
          >
            {SKILL_GROUPS[selected.group].label}
          </span>
          <h4 className="radar-detail-title">{selected.label}</h4>
          <div className="radar-detail-bar">
            <motion.div
              className="radar-detail-fill"
              style={{ background: SKILL_GROUPS[selected.group].color }}
              initial={{ width: 0 }}
              animate={{ width: `${selected.level}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <span className="radar-detail-level">{selected.level}% proficiency</span>
        </motion.div>
      )}

      <div className="radar-legend">
        {Object.entries(SKILL_GROUPS).map(([key, { label, color }]) => (
          <span key={key} className="radar-legend-item">
            <span className="radar-legend-dot" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechRadar;
