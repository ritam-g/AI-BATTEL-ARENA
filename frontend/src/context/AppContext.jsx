import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { createBattleMessage, normalizeBattleResult } from "../utils/battle";

const AppContext = createContext();

const wait = (duration) => new Promise((resolve) => {
  window.setTimeout(resolve, duration);
});

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
};

export const AppProvider = ({ children }) => {
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  // startComparison keeps the existing API request intact, then stages
  // the battle UI as separate chat events so the interface feels live.
  const startComparison = async (inputProblem) => {
    const trimmedProblem = inputProblem?.trim();

    if (!trimmedProblem || status === "loading") {
      return;
    }

    setStatus("loading");
    setError("");

    setMessages((currentMessages) => [
      ...currentMessages,
      createBattleMessage("user", { content: trimmedProblem }),
      createBattleMessage("battle_start", { problem: trimmedProblem }),
    ]);

    try {
      const response = await axios.post("http://localhost:3000/compare", {
        userInput: trimmedProblem,
      });

      const normalizedResult = normalizeBattleResult(response?.data?.result, trimmedProblem);

      setResults(normalizedResult);

      await wait(650);
      setMessages((currentMessages) => [
        ...currentMessages,
        createBattleMessage("solutions", normalizedResult),
      ]);

      await wait(700);
      setMessages((currentMessages) => [
        ...currentMessages,
        createBattleMessage("judgement", {
          problem: normalizedResult.problem,
          judgeMent: normalizedResult.judgeMent,
        }),
      ]);

      setStatus("finished");
    } catch (requestError) {
      console.error("Arena comparison failed", requestError);
      setError("Unable to connect to the battle service right now.");
      setMessages((currentMessages) => [
        ...currentMessages,
        createBattleMessage("system", {
          content: "Unable to connect to the battle service right now. Please try again.",
        }),
      ]);
      setStatus("idle");
    }
  };

  const clearConversation = () => {
    setStatus("idle");
    setResults(null);
    setMessages([]);
    setError("");
  };

  return (
    <AppContext.Provider
      value={{
        status,
        results,
        messages,
        error,
        startComparison,
        clearConversation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
