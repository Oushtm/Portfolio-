import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://oussama.dev";

const PAGE_META = {
  "/": {
    title: "Oussama Hatim — Full-Stack Developer & Software Engineering Student | Developer Command Center",
    description:
      "Oussama Hatim — Full-Stack Developer & Software Engineering Student crafting performant web products. Interactive portfolio with live GitHub stats, tech radar, and terminal interface.",
  },
  "/about": {
    title: "About — Oussama Hatim | Developer Journey",
    description:
      "Explore Oussama Hatim's developer journey — milestones in education, certifications, and achievements.",
  },
  "/projects": {
    title: "Projects — Oussama Hatim | Web Apps, AI & Open Source",
    description:
      "Floating project archive of Oussama Hatim — web apps, AI tools, full-stack builds, and open source contributions.",
  },
  "/skills": {
    title: "Skills — Oussama Hatim | Interactive Tech Radar",
    description:
      "Interactive technology radar showing React, TypeScript, Node.js, Python, Docker, AWS, and more.",
  },
  "/contact": {
    title: "Contact — Oussama Hatim | Hire a Full-Stack Developer",
    description:
      "Get in touch with Oussama Hatim for freelance projects, job opportunities, or collaborations.",
  },
};

const FALLBACK_META = {
  title: "Oussama Hatim — Full-Stack Developer & Software Engineering Student",
  description: "Portfolio of Oussama Hatim — Full-Stack Developer & Software Engineering Student building memorable web products.",
};

export const useSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const meta = PAGE_META[location.pathname] ?? FALLBACK_META;
    const url = `${BASE_URL}${location.pathname}`;

    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", meta.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", url);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
  }, [location.pathname]);
};
