// This is the Header component that stays at the top of the page.
// It contains the logo, navigation links, and the sign-in button.
import React from 'react';
import { Layers } from 'lucide-react';
import { Button } from './ui/Button';

// Custom Github Icon as Lucide doesn't include brand logos
// This SVG represents the GitHub brand icon.
const GithubIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const Header = () => {
  return (
    // src-components-Header: Use this class to find this file in the code
    <header className="fixed top-0 inset-x-0 z-50 glass-header src-components-Header">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter text-white leading-none">ARENA</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">AI Solution Bench</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <a href="#" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors tracking-tight">Comparison</a>
          <a href="#" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors tracking-tight">Leaderboard</a>
          <a href="#" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors tracking-tight">API</a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="#" className="hidden sm:flex items-center gap-2 p-2 px-4 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all text-sm font-medium border border-transparent hover:border-white/10">
            <GithubIcon className="w-4 h-4" />
            <span>Star on GitHub</span>
          </a>
          <Button size="sm" className="shadow-none">Sign In</Button>
        </div>
      </div>
    </header>
  );
}; // End of Header component

export default Header;
