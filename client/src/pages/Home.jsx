import { BRAND } from "@/config/brand";
import CommandCenter from "@/components/CommandCenter";
import DeveloperStats from "@/components/DeveloperStats";
import GitHubLive from "@/components/GitHubLive";
import MagneticButton from "@/components/MagneticButton";
import { CONTACT_INFO } from "@/config/contact";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

const Home = () => (
  <div className="home-page">
    <section className="hero-command-section">
      <div className="hero-text-col">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-badge">
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer Command Center</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-title-accent">{BRAND.name}</span>
            <span className="hero-title-sub"> builds software</span>
            <br />
            <span className="hero-title-gradient">that ships.</span>
          </h1>
          <p className="hero-desc">{BRAND.bio}</p>
          <div className="hero-actions">
            <MagneticButton to="/projects" className="btn-primary">
              View Projects
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              href={CONTACT_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              GitHub Profile
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      <div className="hero-terminal-col">
        <CommandCenter />
      </div>
    </section>

    <section className="home-section">
      <h2 className="section-title">
        <span className="text-emerald-400">$</span> dev_stats --live
      </h2>
      <DeveloperStats />
    </section>


    <section className="home-section">
      <GitHubLive />
    </section>

    <section className="home-cta">
      <motion.div
        className="cta-panel"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="font-mono text-cyan-400/60 text-sm">
          // ready to collaborate?
        </p>
        <h3 className="text-2xl font-bold mt-2">
          Let&apos;s build something remarkable.
        </h3>
        <MagneticButton to="/contact" className="btn-primary mt-6">
          Get in Touch
          <ArrowRight className="w-4 h-4" />
        </MagneticButton>
      </motion.div>
    </section>
  </div>
);

export default Home;
