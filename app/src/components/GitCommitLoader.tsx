import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { motion } from 'framer-motion';

const statuses = ['git init', 'fetching modules...', 'verifying blocks...', 'origin main'];

export const GitCommitLoader: FC = () => {
  const [statusText, setStatusText] = useState<string>(statuses[0]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < statuses.length) {
        setStatusText(statuses[current]);
      } else {
        clearInterval(interval);
      }
    }, 600); // 600ms * 4 steps = 2400ms
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="git-commit-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-alabaster-grey-50 select-none pointer-events-auto"
    >
      <div className="flex items-center gap-6">
        {/* Elegant horizontal line path */}
        <div className="relative w-48 h-4 flex items-center">
          {/* Background line */}
          <div className="absolute inset-x-0 h-[1px] bg-dusk-blue-200/50" />
          
          {/* Active line expanding */}
          <motion.div 
            className="absolute left-0 h-[1px] bg-ink-black-900 shadow-[0_0_6px_rgba(8,18,27,0.2)]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.4, ease: [0.25, 1, 0.5, 1] }}
          />

          {/* Background circles indicating node placements */}
          <div className="absolute left-[25%] -translate-x-1/2 w-2 h-2 rounded-full border border-dusk-blue-200/50 bg-alabaster-grey-50" />
          <div className="absolute left-[50%] -translate-x-1/2 w-2 h-2 rounded-full border border-dusk-blue-200/50 bg-alabaster-grey-50" />
          <div className="absolute left-[75%] -translate-x-1/2 w-2 h-2 rounded-full border border-dusk-blue-200/50 bg-alabaster-grey-50" />
          <div className="absolute left-[100%] -translate-x-1/2 w-2 h-2 rounded-full border border-dusk-blue-200/50 bg-alabaster-grey-50" />

          {/* Pulsing nodes with relative container ripples */}
          {/* Node 1 */}
          <div className="absolute left-[25%] -translate-x-1/2 flex items-center justify-center w-6 h-6">
            <motion.div
              className="absolute w-full h-full rounded-full border border-ink-black-900/30"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.3, 1.4, 1.7], opacity: [0, 0.7, 0] }}
              transition={{ delay: 0.6, duration: 1.4, repeat: Infinity, repeatDelay: 0.8 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-ink-black-900 shadow-[0_0_6px_rgba(8,18,27,0.25)]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 180, damping: 10 }}
            />
          </div>

          {/* Node 2 */}
          <div className="absolute left-[50%] -translate-x-1/2 flex items-center justify-center w-6 h-6">
            <motion.div
              className="absolute w-full h-full rounded-full border border-ink-black-900/30"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.3, 1.4, 1.7], opacity: [0, 0.7, 0] }}
              transition={{ delay: 1.2, duration: 1.4, repeat: Infinity, repeatDelay: 0.8 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-ink-black-900 shadow-[0_0_6px_rgba(8,18,27,0.25)]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 180, damping: 10 }}
            />
          </div>

          {/* Node 3 */}
          <div className="absolute left-[75%] -translate-x-1/2 flex items-center justify-center w-6 h-6">
            <motion.div
              className="absolute w-full h-full rounded-full border border-ink-black-900/30"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.3, 1.4, 1.7], opacity: [0, 0.7, 0] }}
              transition={{ delay: 1.8, duration: 1.4, repeat: Infinity, repeatDelay: 0.8 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-ink-black-900 shadow-[0_0_6px_rgba(8,18,27,0.25)]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.8, type: "spring", stiffness: 180, damping: 10 }}
            />
          </div>

          {/* Node 4 */}
          <div className="absolute left-[100%] -translate-x-1/2 flex items-center justify-center w-6 h-6">
            <motion.div
              className="absolute w-full h-full rounded-full border border-ink-black-900/30"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.3, 1.4, 1.7], opacity: [0, 0.7, 0] }}
              transition={{ delay: 2.4, duration: 1.4, repeat: Infinity, repeatDelay: 0.8 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-ink-black-900 shadow-[0_0_6px_rgba(8,18,27,0.25)]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.4, type: "spring", stiffness: 180, damping: 10 }}
            />
          </div>
        </div>

        {/* Status indicator with blinking typewriter block */}
        <div className="w-36 text-left flex items-center gap-1.5 font-mono text-[10px] text-dusty-denim-600 lowercase tracking-tight opacity-90 select-none">
          <span>{statusText}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-dusty-denim-500 inline-block shrink-0"
          />
        </div>
      </div>
    </motion.div>
  );
};
