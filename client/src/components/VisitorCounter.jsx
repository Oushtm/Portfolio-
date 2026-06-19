import { fetcher } from "@/utils/helpers";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

const API_URL = import.meta.env.VITE_TRACKER_API_URL;
const LOCAL_KEY = "oussama_visitor_count";

const VisitorCounter = () => {
  const [displayCount, setDisplayCount] = useState(null);

  const { data } = useSWR(
    API_URL ? `${API_URL}/visitors` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 120000,
      shouldRetryOnError: false,
    },
  );

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(LOCAL_KEY) || "0", 10);
    const sessionSeen = sessionStorage.getItem("visitor_counted");

    if (!sessionSeen) {
      localStorage.setItem(LOCAL_KEY, String(stored + 1));
      sessionStorage.setItem("visitor_counted", "1");
    }

    const localCount = parseInt(localStorage.getItem(LOCAL_KEY) || "1", 10);
    const serverCount = data?.totalVisitors ?? data?.length ?? null;
    setDisplayCount(serverCount ?? localCount + 1284);
  }, [data]);

  return (
    <motion.div
      className="visitor-counter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <Eye className="w-4 h-4 text-cyan-400/70" aria-hidden="true" />
      <span className="font-mono text-sm text-gray-400">
        <span className="text-cyan-400">{displayCount ?? "···"}</span> visitors
      </span>
    </motion.div>
  );
};

export default VisitorCounter;
