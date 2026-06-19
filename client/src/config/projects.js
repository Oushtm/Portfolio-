import rentabilioImg from "@/assets/projects_img/rentabilio.jpg";
import buildingMgmtImg from "@/assets/projects_img/building-management.png";

export const PROJECT_CATEGORIES = [
  "All",
  "Web Apps",
  "AI",
  "Full Stack",
  "Open Source",
];

export const PROJECTS = [
  {
    id: 1,
    title: "Rentabilio Platform",
    description:
      "Professional property management platform built to help property owners maximize rental revenue through intelligent analytics, revenue forecasting, seasonal optimization, and streamlined property management.",
    image: rentabilioImg,
    github: "https://github.com/Oushtm/Rentabilio",
    live: null,
    category: "Full Stack",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn/UI", "Node.js"],
    timeline: { start: "2025-01", end: "2025-05", phase: "Production" },
    preview: "Maximize rental revenue with intelligent analytics and revenue forecasting.",
  },
  {
    id: 2,
    title: "Building Management Platform",
    description:
      "Modern property management platform designed to streamline apartment administration, financial tracking, and resident management. Features intelligent dashboards, automated payment processing, multilingual reporting, and enterprise-grade security.",
    image: buildingMgmtImg,
    github: "https://github.com/Oushtm",
    live: null,
    category: "Full Stack",
    tags: ["React 19", "Vite 7", "Supabase", "PostgreSQL", "Framer Motion", "Vanilla CSS"],
    timeline: { start: "2025-03", end: "2025-06", phase: "Production" },
    preview: "Streamline apartment administration with intelligent dashboards and automated payments.",
  },
];
