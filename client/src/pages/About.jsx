import DeveloperJourney from "@/components/DeveloperJourney";
import MagneticButton from "@/components/MagneticButton";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import profileImg from "@/assets/profile/profile.jpg";
import { BRAND } from "@/config/brand";
import { CONTACT_INFO } from "@/config/contact";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const About = () => (
  <div className="page-container about-page">
    <ScrollAnimation>
      <div className="about-hero">
        <motion.div
          className="about-avatar-wrap"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="about-avatar-ring" />
          <img
            src={profileImg}
            alt={BRAND.fullName}
            width={280}
            height={280}
            className="about-avatar"
          />
        </motion.div>
        <div className="about-hero-text">
          <h1 className="page-title">
            Developer <span className="text-cyan-400">Journey</span>
          </h1>
          <p className="page-subtitle">{BRAND.tagline}</p>
          <div className="about-meta">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{CONTACT_INFO.location}</span>
            <span className="text-gray-600">·</span>
            <span>{BRAND.title}</span>
          </div>
          <div className="hero-actions mt-6">
            <MagneticButton to="/contact" className="btn-primary">
              Work With Me
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </ScrollAnimation>

    <ScrollAnimation>
      <h2 className="section-title mt-16 mb-8">
        <span className="text-violet-400">//</span> milestones
      </h2>
      <DeveloperJourney />
    </ScrollAnimation>
  </div>
);

export default About;
