import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className="project-float-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      style={{ perspective: 1000 }}
    >
      <div className="project-card-glow" aria-hidden="true" />

      <div className="project-card-image-wrap">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="project-card-image"
        />
        <motion.div
          className="project-card-preview"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.25 }}
        >
          <p>{project.preview}</p>
        </motion.div>
      </div>

      <div className="project-card-body">
        <div className="project-card-top">
          <span className="project-category">{project.category}</span>
          <div className="project-timeline">
            <span className="timeline-dot" />
            <span className="font-mono text-[10px] text-gray-500">
              {project.timeline.start} → {project.timeline.end}
            </span>
            <span className="timeline-phase">{project.timeline.phase}</span>
          </div>
        </div>

        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="project-card-links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link project-link--live"
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </a>
          )}
        </div>
      </div>

      <motion.div
        className="project-timeline-bar"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
        style={{ originX: 0 }}
      />
    </motion.article>
  );
};

export default ProjectCard;
