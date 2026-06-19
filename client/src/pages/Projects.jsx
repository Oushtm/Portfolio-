import ProjectCard from "@/components/ProjectCard";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { PROJECT_CATEGORIES, PROJECTS } from "@/config/projects";
import { AnimatePresence, motion } from "framer-motion";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="page-container projects-page">
      <ScrollAnimation>
        <div className="page-header">
          <h1 className="page-title">
            <span className="text-violet-400">~/</span>projects
          </h1>
          <p className="page-subtitle">
            Floating archive of shipped work — filter by category, hover for
            previews.
          </p>
        </div>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className="filter-bar" role="tablist" aria-label="Project categories">
          <Filter className="w-4 h-4 text-gray-500" aria-hidden="true" />
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`filter-pill ${activeCategory === cat ? "filter-pill--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollAnimation>

      <motion.div layout className="projects-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Projects;
