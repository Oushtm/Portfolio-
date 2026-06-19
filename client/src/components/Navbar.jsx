import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchDialog from "./SearchDialog";
import logoImg from "@/assets/profile/logo.png";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/skills", label: "Skills" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      ref={menuRef}
      className="navbar fixed top-0 w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-inner">
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

        <div className="hidden lg:flex flex-1 justify-center">
          <SearchDialog />
        </div>

        <div className="hidden md:flex items-center gap-1 ml-auto lg:ml-0">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? "nav-link--active" : ""}`}
              aria-current={
                location.pathname === link.path ? "page" : undefined
              }
            >
              {link.label}
            </Link>
          ))}

          <div className="lg:hidden ml-1">
            <SearchDialog iconOnly />
          </div>
        </div>

        <div className="flex md:hidden items-center ml-auto gap-1">
          <SearchDialog iconOnly />
          <button
            className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          className="md:hidden mobile-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${location.pathname === link.path ? "mobile-nav-link--active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
