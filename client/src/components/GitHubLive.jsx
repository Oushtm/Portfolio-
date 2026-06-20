import { fetcher } from "@/utils/helpers";
import { motion } from "framer-motion";
import { ExternalLink, GitFork, Star } from "lucide-react";
import { memo, useMemo } from "react";
import useSWR from "swr";

const GITHUB_USER = import.meta.env.VITE_GITHUB_USERNAME || "Oushtm";
const USER_API = `https://api.github.com/users/${GITHUB_USER}`;
const REPOS_API = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`;
const CONTRIB_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?format=application/json`;

const LanguageBar = memo(({ languages }) => {
  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  if (!total) return null;

  const colors = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3776ab",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Go: "#00add8",
    Rust: "#dea584",
  };

  return (
    <div className="lang-bar">
      {Object.entries(languages).map(([lang, bytes]) => (
        <div
          key={lang}
          className="lang-segment"
          style={{
            width: `${(bytes / total) * 100}%`,
            background: colors[lang] || "#64748b",
          }}
          title={`${lang}: ${Math.round((bytes / total) * 100)}%`}
        />
      ))}
    </div>
  );
});

LanguageBar.displayName = "LanguageBar";

const GitHubLive = () => {
  const { data: user } = useSWR(USER_API, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000,
  });

  const { data: repos } = useSWR(REPOS_API, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000,
  });

  const { data: contrib } = useSWR(CONTRIB_API, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 600000,
    shouldRetryOnError: false,
  });

  const totalStars = useMemo(
    () => repos?.reduce((sum, r) => sum + (r.stargazers_count || 0), 0) ?? 0,
    [repos],
  );

  const languages = useMemo(() => {
    if (!repos) return {};
    const langs = {};
    repos.forEach((repo) => {
      if (repo.language) {
        langs[repo.language] = (langs[repo.language] || 0) + 1;
      }
    });
    return langs;
  }, [repos]);

  const contribTotal = contrib?.total?.lastYear ?? null;

  return (
    <section className="github-live">
      <div className="github-live-header">
        <h3 className="section-title">
          <span className="text-cyan-400">git</span> hub — live feed
        </h3>
        <span className="live-badge">API SYNC</span>
      </div>

      <div className="github-stats-row">
        {[
          { label: "Repos", value: user?.public_repos ?? "—" },
          { label: "Stars", value: totalStars || "—" },
          { label: "Followers", value: user?.followers ?? "—" },
          {
            label: "Contributions",
            value: contribTotal ?? "—",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className="github-stat-pill"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <span className="github-stat-value">{s.value}</span>
            <span className="github-stat-label">{s.label}</span>
          </motion.div>
        ))}
      </div>

      {Object.keys(languages).length > 0 && (
        <div className="github-lang-section">
          <span className="text-xs text-gray-500 font-mono mb-2 block">
            language breakdown
          </span>
          <LanguageBar languages={languages} />
          <div className="lang-legend">
            {Object.entries(languages).map(([lang, count]) => (
              <span key={lang} className="lang-legend-item">
                {lang} ({count})
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="github-repos-grid">
        {(repos ?? []).slice(0, 6).map((repo, i) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="github-repo-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start justify-between gap-2 min-w-0">
              <span className="repo-name">{repo.name}</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            </div>
            <p className="repo-desc">{repo.description || "No description"}</p>
            <div className="repo-meta">
              {repo.language && (
                <span className="repo-lang">
                  <span className="repo-lang-dot" />
                  {repo.language}
                </span>
              )}
              <span className="repo-stat">
                <Star className="w-3 h-3" />
                {repo.stargazers_count}
              </span>
              <span className="repo-stat">
                <GitFork className="w-3 h-3" />
                {repo.forks_count}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default GitHubLive;
