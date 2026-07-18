import { motion } from 'framer-motion';
import type { FC } from 'react';

export const Home: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
      className="max-w-4xl mx-auto flex flex-col justify-center items-center text-center min-h-[60vh] md:min-h-[65vh] py-12 space-y-4"
    >
      {/* Intro Greetings */}
      <span className="text-xs uppercase tracking-widest text-dusty-denim-700 font-mono font-medium">
        Hello, I am
      </span>
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-ink-black-950 font-sans leading-none sm:whitespace-nowrap">
        Riyadh Al Mahmud
      </h1>
      <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed max-w-md mx-auto pt-2">
        holding a bachelors in computer science while crafting high-performance web applications, translating theoretical engineering into fluid, human-centric software.
      </p>
    </motion.div>
  );
};
