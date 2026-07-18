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
    }, 1500); // 1500ms * 4 steps = 6000ms
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="git-commit-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-alabaster-grey-50 select-none pointer-events-auto"
    >
      <div className="flex items-center gap-6">
        {/* Elegant horizontal line path */}
        <div className="relative w-48 h-4 flex items-center">
          {/* Background line */}
          <div className="absolute inset-x-0 h-[1px] bg-dusk-blue-200/50" />
          
          {/* Active line expanding */}
          <motion.div 
            className="absolute left-0 h-[1px] bg-ink-black-900"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 6.0, ease: "easeInOut" }}
          />

          {/* Pulsing nodes */}
          {/* Node 1 */}
          <motion.div
            className="absolute left-[25%] -translate-x-1/2 w-2 h-2 rounded-full bg-ink-black-900"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.45 }}
          />
          {/* Node 2 */}
          <motion.div
            className="absolute left-[50%] -translate-x-1/2 w-2 h-2 rounded-full bg-ink-black-900"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: 1 }}
            transition={{ delay: 3.0, duration: 0.45 }}
          />
          {/* Node 3 */}
          <motion.div
            className="absolute left-[75%] -translate-x-1/2 w-2 h-2 rounded-full bg-ink-black-900"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: 1 }}
            transition={{ delay: 4.5, duration: 0.45 }}
          />
          {/* Node 4 */}
          <motion.div
            className="absolute left-[100%] -translate-x-1/2 w-2 h-2 rounded-full bg-ink-black-900"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: 1 }}
            transition={{ delay: 6.0, duration: 0.45 }}
          />
        </div>

        {/* Status indicator */}
        <div className="w-32 text-left">
          <span className="text-[10px] font-mono text-dusty-denim-500 lowercase tracking-tight opacity-70 select-none">
            {statusText}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
