import { JOURNEY_MILESTONES } from "@/config/journey";
import { motion } from "framer-motion";
import {
  Award,
  Brain,
  Code2,
  Github,
  GraduationCap,
  Rocket,
  Sparkles,
} from "lucide-react";

const ICONS = {
  code: Code2,
  graduation: GraduationCap,
  rocket: Rocket,
  award: Award,
  github: Github,
  brain: Brain,
  sparkles: Sparkles,
};

const TYPE_COLORS = {
  education: "cyan",
  certification: "violet",
  achievement: "emerald",
  vision: "amber",
};

const DeveloperJourney = () => (
  <div className="journey-timeline">
    <div className="journey-line" aria-hidden="true" />
    {JOURNEY_MILESTONES.map((milestone, i) => {
      const Icon = ICONS[milestone.icon] || Code2;
      const color = TYPE_COLORS[milestone.type] || "cyan";

      return (
        <motion.div
          key={milestone.id}
          className="journey-item"
          initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <div className={`journey-node journey-node--${color}`}>
            <Icon className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="journey-card">
            <div className="journey-card-header">
              <span className={`journey-year journey-year--${color}`}>
                {milestone.year}
              </span>
              <span className={`journey-type journey-type--${color}`}>
                {milestone.type}
              </span>
            </div>
            <h4 className="journey-title">{milestone.title}</h4>
            <p className="journey-subtitle">{milestone.subtitle}</p>
            <p className="journey-desc">{milestone.description}</p>
          </div>
        </motion.div>
      );
    })}
  </div>
);

export default DeveloperJourney;
