import React, { createContext, useContext, useState } from 'react';
import { mockData } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'finished'
  const [problem, setProblem] = useState('');
  const [results, setResults] = useState(null);

  const startComparison = (inputProblem) => {
    setProblem(inputProblem);
    setStatus('loading');

    // Simulate generation delay
    setTimeout(() => {
      setResults({
        models: mockData.models,
        winner: mockData.winner
      });
      setStatus('finished');
    }, 2000);
  };

  const reset = () => {
    setStatus('idle');
    setProblem('');
    setResults(null);
  };

  return (
    <AppContext.Provider value={{ status, problem, results, startComparison, reset }}>
      {children}
    </AppContext.Provider>
  );
};
