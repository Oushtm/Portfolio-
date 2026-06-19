export const SKILL_NODES = [
  { id: "react", label: "React", group: "frontend", x: 0.72, y: 0.28, level: 92 },
  { id: "typescript", label: "TypeScript", group: "frontend", x: 0.58, y: 0.18, level: 88 },
  { id: "nextjs", label: "Next.js", group: "frontend", x: 0.82, y: 0.42, level: 85 },
  { id: "tailwind", label: "Tailwind", group: "frontend", x: 0.65, y: 0.48, level: 90 },
  { id: "nodejs", label: "Node.js", group: "backend", x: 0.38, y: 0.35, level: 90 },
  { id: "express", label: "Express", group: "backend", x: 0.22, y: 0.48, level: 86 },
  { id: "python", label: "Python", group: "backend", x: 0.28, y: 0.22, level: 82 },
  { id: "mongodb", label: "MongoDB", group: "data", x: 0.15, y: 0.65, level: 84 },
  { id: "postgres", label: "PostgreSQL", group: "data", x: 0.35, y: 0.72, level: 78 },
  { id: "docker", label: "Docker", group: "devops", x: 0.52, y: 0.78, level: 80 },
  { id: "aws", label: "AWS", group: "devops", x: 0.68, y: 0.68, level: 75 },
  { id: "git", label: "Git", group: "devops", x: 0.48, y: 0.55, level: 94 },
  { id: "graphql", label: "GraphQL", group: "backend", x: 0.42, y: 0.42, level: 72 },
  { id: "openai", label: "OpenAI", group: "ai", x: 0.78, y: 0.58, level: 80 },
  { id: "framer", label: "Framer Motion", group: "frontend", x: 0.55, y: 0.32, level: 88 },
];

export const SKILL_CONNECTIONS = [
  ["react", "typescript"],
  ["react", "nextjs"],
  ["react", "tailwind"],
  ["react", "framer"],
  ["typescript", "nextjs"],
  ["nodejs", "express"],
  ["nodejs", "mongodb"],
  ["nodejs", "graphql"],
  ["express", "mongodb"],
  ["express", "postgres"],
  ["python", "openai"],
  ["docker", "aws"],
  ["git", "docker"],
  ["react", "graphql"],
  ["nextjs", "nodejs"],
];

export const SKILL_GROUPS = {
  frontend: { label: "Frontend", color: "#22d3ee" },
  backend: { label: "Backend", color: "#a78bfa" },
  data: { label: "Data", color: "#34d399" },
  devops: { label: "DevOps", color: "#fbbf24" },
  ai: { label: "AI / ML", color: "#f472b6" },
};
