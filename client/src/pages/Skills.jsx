import { ScrollAnimation } from "@/components/ScrollAnimation";
import TechRadar from "@/components/TechRadar";
import { SKILL_GROUPS } from "@/config/skillsRadar";

const Skills = () => (
  <div className="page-container skills-page">
    <ScrollAnimation>
      <div className="page-header">
        <h1 className="page-title">
          <span className="text-cyan-400">~/</span>skills
        </h1>
        <p className="page-subtitle">
          Interactive tech radar — click nodes to explore connections and
          proficiency levels.
        </p>
      </div>
    </ScrollAnimation>

    <ScrollAnimation>
      <TechRadar />
    </ScrollAnimation>

    <ScrollAnimation>
      <div className="skills-groups-grid">
        {Object.entries(SKILL_GROUPS).map(([key, { label, color }]) => (
          <div key={key} className="skill-group-card">
            <span
              className="skill-group-dot"
              style={{ background: color, boxShadow: `0 0 12px ${color}40` }}
            />
            <span className="skill-group-label">{label}</span>
          </div>
        ))}
      </div>
    </ScrollAnimation>
  </div>
);

export default Skills;
