import { BRAND, DEV_STATS } from "@/config/brand";
import { fetcher, formatRepoCount } from "@/utils/helpers";
import { motion } from "framer-motion";
import { FolderGit2, GitBranch, Layers, Timer } from "lucide-react";
import useSWR from "swr";

const GITHUB_USER = import.meta.env.VITE_GITHUB_USERNAME || "Oushtm";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USER}`;

const statConfig = (repoCount) => [
  {
    label: "Projects Built",
    value: DEV_STATS.projectsBuilt,
    icon: FolderGit2,
    color: "cyan",
  },
  {
    label: "GitHub Repos",
    value: formatRepoCount(repoCount),
    icon: GitBranch,
    color: "violet",
  },
  {
    label: "Technologies",
    value: DEV_STATS.technologiesUsed,
    icon: Layers,
    color: "emerald",
  },
  {
    label: "Years Learning",
    value: DEV_STATS.yearsLearning,
    icon: Timer,
    color: "amber",
  },
];

const DeveloperStats = () => {
  const { data } = useSWR(GITHUB_API, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000,
  });

  const stats = statConfig(data?.public_repos ?? 0);

  return (
    <div className="stats-grid">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className={`stat-card stat-card--${stat.color}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <stat.icon className="stat-icon" aria-hidden="true" />
          <motion.span
            className="stat-value"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            {stat.value}
          </motion.span>
          <span className="stat-label">{stat.label}</span>
        </motion.div>
      ))}
      <p className="sr-only">
        Developer statistics for {BRAND.fullName}
      </p>
    </div>
  );
};

export default DeveloperStats;
