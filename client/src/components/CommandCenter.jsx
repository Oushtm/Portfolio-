import { BRAND } from "@/config/brand";
import { CONTACT_INFO } from "@/config/contact";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HireEasterEgg from "./HireEasterEgg";

const BOOT_LINES = [
  { text: "Initializing Oushtm OS v2.6...", delay: 0 },
  { text: "Loading kernel modules... OK", delay: 400 },
  { text: "Mounting /dev/skills ... OK", delay: 800 },
  { text: "Type a command or press Tab for hints.", delay: 1200 },
];

const COMMANDS = {
  whoami: {
    output: [
      `${BRAND.fullName} — ${BRAND.title}`,
      BRAND.tagline,
      `Location: ${CONTACT_INFO.location}`,
    ],
  },
  skills: {
    output: [
      "Core: React · TypeScript · Node.js · Python",
      "Data: MongoDB · PostgreSQL · Redis",
      "Cloud: Docker · AWS · Vercel",
      "→ Run 'open skills' to explore the radar",
    ],
    action: "/skills",
  },
  projects: {
    output: [
      `${BRAND.projectsBuilt} projects shipped across web, AI, and OSS`,
      "→ Run 'open projects' to browse the archive",
    ],
    action: "/projects",
  },
  contact: {
    output: [
      `Email: ${CONTACT_INFO.email}`,
      `GitHub: ${CONTACT_INFO.github}`,
      `LinkedIn: ${CONTACT_INFO.linkedin}`,
      "→ Run 'open contact' to send a message",
    ],
    action: "/contact",
  },
  help: {
    output: [
      "Available: whoami, skills, projects, contact",
      "Navigation: open <page>  (about | projects | skills | contact)",
      "Clear: cls  ·  Hint: try something with sudo ;)",
    ],
  },
  cls: { output: [], clear: true },
  clear: { output: [], clear: true },
};

const OPEN_ROUTES = {
  about: "/about",
  projects: "/projects",
  skills: "/skills",
  contact: "/contact",
  home: "/",
};

const CommandCenter = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const [bootDone, setBootDone] = useState(false);
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [demoPaused, setDemoPaused] = useState(false);
  const [demoIdx, setDemoIdx] = useState(0);

  const DEMO_COMMANDS = ["whoami", "skills", "projects", "contact"];

  const appendLines = useCallback((newLines, type = "output") => {
    setLines((prev) => [
      ...prev,
      ...newLines.map((text) => ({ text, type, id: crypto.randomUUID() })),
    ]);
  }, []);

  const runCommand = useCallback(
    (raw, silent = false) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;

      appendLines([`> ${raw}`], "input");

      if (cmd === "sudo hire-oussama") {
        setShowEasterEgg(true);
        appendLines([
          "ACCESS GRANTED ✓",
          "Initiating hire protocol...",
          "Redirecting to contact in 3s...",
        ]);
        if (!silent) setTimeout(() => navigate("/contact"), 3000);
        return;
      }

      if (cmd.startsWith("open ")) {
        const page = cmd.replace("open ", "");
        const route = OPEN_ROUTES[page];
        if (route) {
          appendLines([`Opening /${page}...`]);
          if (!silent) setTimeout(() => navigate(route), 400);
        } else {
          appendLines([`Unknown route: ${page}`, "Try: open projects"]);
        }
        return;
      }

      const def = COMMANDS[cmd];
      if (def) {
        if (def.clear) {
          setLines([]);
          return;
        }
        appendLines(def.output);
        // Only navigate when the user manually runs the command, not in demo mode
        if (def.action && !silent) {
          setTimeout(() => navigate(def.action), 600);
        }
      } else {
        appendLines([
          `Command not found: ${cmd}`,
          "Type 'help' for available commands.",
        ]);
      }
    },
    [appendLines, navigate],
  );

  useEffect(() => {
    const timers = BOOT_LINES.map(({ text, delay }) =>
      setTimeout(() => appendLines([text], "system"), delay),
    );
    const done = setTimeout(() => setBootDone(true), 1600);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [appendLines]);

  useEffect(() => {
    if (!bootDone || demoPaused) return;
    const cmd = DEMO_COMMANDS[demoIdx];
    let charIdx = 0;
    let typed = "";

    const typeInterval = setInterval(() => {
      if (charIdx <= cmd.length) {
        typed = cmd.slice(0, charIdx);
        setInput(typed);
        charIdx++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          runCommand(cmd, true); // silent=true: demo shows output but never navigates
          setInput("");
          setDemoIdx((i) => (i + 1) % DEMO_COMMANDS.length);
        }, 500);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [bootDone, demoIdx, demoPaused, runCommand]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setDemoPaused(true);
    setHistory((h) => [input, ...h]);
    setHistoryIdx(-1);
    runCommand(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIdx - 1;
      if (next < 0) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(history[next] ?? "");
      }
    }
    if (e.key === "Tab") {
      e.preventDefault();
      appendLines(["whoami · skills · projects · contact · help"], "hint");
    }
  };

  return (
    <>
      <HireEasterEgg active={showEasterEgg} onDone={() => setShowEasterEgg(false)} />
      <motion.div
        className="command-center"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="command-center-header">
          <div className="terminal-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="font-mono text-xs text-cyan-400/70 tracking-widest">
            oushtm ~ command-center
          </span>
          <span className="font-mono text-[10px] text-emerald-400/60 ml-auto hidden sm:block">
            ● LIVE
          </span>
        </div>

        <div ref={scrollRef} className="command-center-body">
          {lines.map((line) => (
            <div
              key={line.id}
              className={`terminal-line terminal-line--${line.type}`}
            >
              {line.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="command-center-input-row">
          <span className="text-cyan-400 font-mono">&gt;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setDemoPaused(true);
              setInput(e.target.value);
            }}
            onFocus={() => setDemoPaused(true)}
            onKeyDown={handleKeyDown}
            className="command-input"
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command input"
            placeholder="type a command..."
          />
          <span className="cursor-blink" aria-hidden="true" />
        </form>
      </motion.div>
    </>
  );
};

export default CommandCenter;
