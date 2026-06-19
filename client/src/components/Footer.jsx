import { CONTACT_INFO } from "@/config/contact";
import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/profile/logo.png";

const pageLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Contact", path: "/contact" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <Link to="/" className="navbar-brand flex items-center gap-2">
              <img
                src={logoImg}
                alt="Oussama Hatim Logo"
                className="w-7 h-7 rounded-full object-cover border border-cyan-400/20"
              />
              <span className="navbar-brand-text">
                oussama<span className="text-cyan-400">.dev</span>
              </span>
            </Link>
            <p className="footer-tagline">
              Software engineer building products that feel handcrafted.
            </p>

          </div>

          <div>
            <h3 className="footer-heading">Navigate</h3>
            <ul className="footer-links">
              {pageLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Connect</h3>
            <ul className="footer-links">
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="footer-link">
                  <Mail className="w-4 h-4" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Easter Egg</h3>
            <p className="footer-hint font-mono text-xs text-gray-500">
              Try typing{" "}
              <code className="text-cyan-400/80">sudo hire-oussama</code> in
              the terminal on the homepage.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Oussama. Engineered with intent.</p>
          <span className="font-mono text-xs text-gray-600">
            v2.6.0 · build {currentYear}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
