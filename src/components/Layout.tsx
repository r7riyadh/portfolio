import { useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home as HomeIcon,
  Briefcase, 
  Code2,
  GraduationCap, 
  Share2
} from 'lucide-react';

interface LayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoading: boolean;
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({
  activeTab,
  setActiveTab,
  isLoading,
  children
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'experiences', label: 'Experiences', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'credentials', label: 'Credentials', icon: GraduationCap },
    { id: 'social', label: 'Social', icon: Share2 },
  ];

  return (
    <div className="min-h-screen bg-alabaster-grey-50 text-ink-black-950 flex flex-col antialiased font-sans font-light">
      {/* Main Content Area */}
      <main className="flex-1 w-full px-6 pt-12 pb-12 md:pt-20">
        {children}
      </main>

      {/* Floating Bottom Pill / Vertical Sidebar Navigation Dock */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="navigation-dock"
            initial={isMobile ? { opacity: 0, y: 40, x: "-50%" } : { opacity: 0, x: -40, y: "-50%" }}
            animate={isMobile ? { opacity: 1, y: 0, x: "-50%" } : { opacity: 1, x: 0, y: "-50%" }}
            exit={isMobile ? { opacity: 0, y: 40, x: "-50%" } : { opacity: 0, x: -40, y: "-50%" }}
            transition={{ 
              duration: 0.3, 
              ease: "easeOut"
            }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 z-50 pointer-events-auto"
          >
            <nav className="flex flex-row md:flex-col gap-6 md:gap-4 p-1.5 md:p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-dusty-denim-200 shadow-lg max-w-[95vw] md:max-w-none md:w-14 h-auto items-center justify-center overflow-x-auto md:overflow-y-auto scrollbar-none">
              {menuItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative group flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 shrink-0 select-none z-10 ${
                      isActive ? 'text-alabaster-grey-50' : 'text-dusty-denim-600 hover:text-ink-black-800'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavigationTab"
                        className="absolute inset-0 bg-ink-black-900 rounded-full -z-10"
                        transition={{ type: "tween", ease: "circOut", duration: 0.25 }}
                      />
                    )}
                    <Icon className="w-5 h-5 transition-colors" strokeWidth={2} />
                    
                    {/* CSS/Tailwind Hover Tooltip */}
                    <span className="absolute bottom-14 left-1/2 -translate-x-1/2 md:bottom-auto md:left-16 md:translate-x-0 scale-0 group-hover:scale-100 rounded-md bg-zinc-900 px-2 py-1 text-[10px] font-mono lowercase text-white transition-all duration-150 whitespace-nowrap shadow-md pointer-events-none z-20">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
