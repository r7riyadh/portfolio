import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Experiences } from './components/Experiences';
import { Projects } from './components/Projects';
import { Credentials } from './components/Credentials';
import { Social } from './components/Social';
import { GitCommitLoader } from './components/GitCommitLoader';
import { getPortfolioData } from './utils/googleSheets';
import type { PortfolioData } from './types';

const App: FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loadingScreen, setLoadingScreen] = useState<boolean>(true);
  const isScrolling = useRef(false);

  const loadData = async () => {
    try {
      const data = await getPortfolioData();
      setPortfolioData(data);
    } catch {
      // Fallback empty schema so UI does not crash
      setPortfolioData({
        experiences: [],
        projects: [],
        certificates: [],
        education: [],
        social: []
      });
    }
  };

  useEffect(() => {
    loadData();

    // Enforce minimum loader duration of 6500ms
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 6500);

    return () => clearTimeout(timer);
  }, []);

  // IntersectionObserver (Scroll Spy) to track viewport visibility
  useEffect(() => {
    if (!portfolioData) return;

    const sections = ['home', 'experiences', 'projects', 'credentials', 'social'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isScrolling.current) {
          const id = entry.target.id;
          setActiveTab(id);
          // Silently update hash to match current section for deep linking support
          window.history.replaceState(null, '', `#/${id}`);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [portfolioData]);

  // Deep Link scrolling on load
  useEffect(() => {
    if (portfolioData && !loadingScreen) {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validSections = ['home', 'experiences', 'projects', 'credentials', 'social'];
      if (validSections.includes(hash)) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 400);
      }
    }
  }, [portfolioData, loadingScreen]);

  const handleTabChange = (tabId: string) => {
    isScrolling.current = true;
    setActiveTab(tabId);
    window.history.replaceState(null, '', `#/${tabId}`);
    const el = document.getElementById(tabId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      isScrolling.current = false;
    }, 1000); // 1s cooldown gives plenty of time to clear transitions
  };

  const showLoader = loadingScreen || !portfolioData;

  return (
    <>
      {/* Git Commit Stream Loading Animation Overlay */}
      <AnimatePresence>
        {showLoader && <GitCommitLoader />}
      </AnimatePresence>

      <Layout 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        isLoading={showLoader}
      >
        {portfolioData && (
          <div className="flex flex-col">
            {/* Viewport Sections */}
            <section id="home" className="min-h-screen w-full flex flex-col justify-center items-center py-16 px-6 md:px-12 scroll-mt-24 border-b border-dusk-blue-200/40">
              <Home />
            </section>
            
            <section id="experiences" className="min-h-fit w-full flex flex-col justify-center items-center py-16 scroll-mt-24 border-b border-dusk-blue-200/40">
              <Experiences data={portfolioData.experiences} />
            </section>
            
            <section id="projects" className="min-h-fit w-full flex flex-col justify-center items-center scroll-mt-24 border-b border-dusk-blue-200/40">
              <Projects data={portfolioData.projects} />
            </section>
            
            <section id="credentials" className="min-h-fit w-full flex flex-col justify-center items-center py-16 scroll-mt-24 border-b border-dusk-blue-200/40">
              <Credentials 
                education={portfolioData.education}
                certificates={portfolioData.certificates}
              />
            </section>

            <section id="social" className="min-h-fit w-full px-4 md:px-0 py-20 scroll-mt-24">
              <Social data={portfolioData.social} />
            </section>

            {/* Global Monospace Footer */}
            <footer className="text-center pb-8 pt-4 text-[10px] font-mono text-dusty-denim-400 lowercase tracking-tight">
              © 2026 riyadh al mahmud. all rights reserved.
            </footer>
          </div>
        )}
      </Layout>
    </>
  );
};

export default App;
