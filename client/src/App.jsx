import {
  DynamicGrid,
  ErrorBoundary,
  FloatingParticles,
  Footer,
  Loading,
  Navbar,
} from "@/components/index";
import { useSEO } from "@/hooks/useSEO";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Scrolls to top on every route change so no page ever starts mid-scroll
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);
  return null;
}

function AnimatedOutlet() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="min-w-0 w-full overflow-x-clip"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

function AppLayout() {
  useSEO();
  useVisitorTracking();

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-clip max-w-[100vw]">
      <DynamicGrid />
      <ErrorBoundary fallback={null}>
        <FloatingParticles count={20} />
      </ErrorBoundary>
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow relative z-10 min-w-0 w-full overflow-x-clip">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route element={<AnimatedOutlet />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
