// This is the Home page of the AI Battle Arena.
// It contains the main search input, displays model results, and the judge panel.
import React, { useState } from 'react';
import Header from '../components/Header';
import SolutionCard from '../components/SolutionCard';
import JudgePanel from '../components/JudgePanel';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Trophy, Zap, RefreshCw } from 'lucide-react';

const Home = () => {
  const { status, results, startComparison, reset } = useApp();
  const [input, setInput] = useState('');

  // handleSubmit: This function is called when the user clicks 'Compare Solution' 
  // or presses Enter in the input search box.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && status === 'idle') {
      startComparison(input);
    }
  };

  return (
    // src-pages-Home: Root class for identifying the Home page code
    <div className="min-h-screen bg-background pb-32 src-pages-Home">
      <Header />
      
      <main className="pt-20">
        {/* Input Section: This is where you type your prompt or problem */}
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* Background Blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] pointer-events-none -z-10">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse delay-700" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
              The Bench for <br />
              <span className="gradient-text">AI Excellence.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
                Experience real-time solution benchmarking between specialized models. 
                Enter a challenge and watch the evaluation unfold.
            </p>

            <form 
              onSubmit={handleSubmit}
              className="relative w-full max-w-3xl mx-auto group"
            >
              <div className="relative glass-input rounded-2xl flex items-center p-2 pr-4 shadow-2xl transition-all border-white/10 group-focus-within:border-purple-500/30 group-focus-within:ring-4 ring-purple-500/10 group-hover:border-white/20">
                <div className="pl-4 text-slate-500">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your problem (e.g., Write a factorial fn)..."
                  className="w-full bg-transparent border-none outline-none px-6 py-5 text-white placeholder-slate-500 text-lg font-medium"
                  disabled={status !== 'idle'}
                />
                <Button 
                  disabled={!input.trim() || status !== 'idle'}
                  className="hidden md:flex gap-2"
                >
                  {status === 'loading' ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4" />
                  )}
                  {status === 'loading' ? 'Comparing...' : 'Compare Solution'}
                </Button>
              </div>
            </form>
          </motion.div>
        </section>

        {/* Results Section: This shows once the AI models have finished generating solutions */}
        <AnimatePresence>
          {status === 'finished' && results && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="container mx-auto px-6 py-20"
            >
              {/* Winner Header */}
              <div className="flex flex-col items-center mb-16 text-center">
                <div className="inline-flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 px-5 py-2.5 rounded-2xl mb-6 shadow-xl shadow-purple-500/5">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    <span className="text-sm font-black text-white uppercase tracking-widest">
                        Winner: {results.models.find(m => m.id === results.winner).name}
                    </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Solution Comparison</h2>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                {results.models.map((model, idx) => (
                    <motion.div
                        key={model.id}
                        initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.2, duration: 0.8, ease: "easeOut" }}
                    >
                        <SolutionCard
                            name={model.name}
                            solution={model.solution}
                            isWinner={model.id === results.winner}
                        />
                    </motion.div>
                ))}
              </div>

              {/* Judge Section */}
              <JudgePanel models={results.models} winner={results.winner} />

              {/* Reset Section */}
              <div className="mt-20 flex justify-center">
                <Button 
                    variant="secondary" 
                    size="lg" 
                    className="gap-2 px-12 py-6 rounded-2xl border-white/5"
                    onClick={reset}
                >
                    <RefreshCw className="w-5 h-5" />
                    New Comparison
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-white/5 bg-black/20 text-center">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
          © 2026 AI Arena Benchmark. Built by Ritam Maty.
        </p>
      </footer>
    </div>
  );
};

export default Home;
