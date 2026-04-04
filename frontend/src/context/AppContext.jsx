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
  const [results, setResults] = useState(null);

  const startComparison = (inputProblem) => {
    setStatus('loading');

    // Keep the dummy data shape identical to the backend response shape
    // so the UI can swap to real API data later without structural changes.
    setTimeout(() => {
      setResults({
        ...mockData,
        problem: inputProblem?.trim() || mockData.problem,
      });
      setStatus('finished');
    }, 2000);
  };

  const reset = () => {
    setStatus('idle');
    setResults(null);
  };

  return (
    <AppContext.Provider value={{ status, results, startComparison, reset }}>
      {children}
    </AppContext.Provider>
  );
};
