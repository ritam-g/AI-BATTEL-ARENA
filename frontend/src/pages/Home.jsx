import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Layers3, Shield, Sparkles, Swords } from "lucide-react";
import Header from "../components/Header";
import SolutionCard from "../components/SolutionCard";
import JudgePanel from "../components/JudgePanel";
import BattleRow from "../components/chat/BattleRow";
import BattleStartIndicator from "../components/chat/BattleStartIndicator";
import ChatContainer from "../components/chat/ChatContainer";
import ChatMessage from "../components/chat/ChatMessage";
import InputBar from "../components/chat/InputBar";
import { useApp } from "../context/AppContext";
import { getWinnerKey, getWinnerLabel } from "../utils/battle";

const modelCards = [
  {
    key: "solution_1",
    title: "Mistral",
    subtitle: "solution_1",
    model: "mistral",
  },
  {
    key: "solution_2",
    title: "Cohere",
    subtitle: "solution_2",
    model: "cohere",
  },
];

const emptyStateItems = [
  {
    icon: Layers3,
    title: "Instant battle orchestration",
    description: "Your prompt becomes a live arena run with staged model responses and a final verdict.",
  },
  {
    icon: Swords,
    title: "Side-by-side answers",
    description: "Watch Mistral and Cohere answer in parallel inside a single cinematic conversation flow.",
  },
  {
    icon: Shield,
    title: "Judge-backed winner",
    description: "Scores, reasoning, and the winner land as their own verdict block with animated emphasis.",
  },
];

const Home = () => {
  const { status, messages, error, startComparison, clearConversation } = useApp();
  const [input, setInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!input.trim() || status === "loading") {
      return;
    }

    const submittedInput = input;
    setInput("");
    await startComparison(submittedInput);
  };

  const renderArenaMessage = (message) => {
    if (message.type === "user") {
      return <ChatMessage key={message.id} content={message.content} tone="user" />;
    }

    if (message.type === "system") {
      return <ChatMessage key={message.id} content={message.content} tone="system" />;
    }

    if (message.type === "battle_start") {
      return <BattleStartIndicator key={message.id} />;
    }

    if (message.type === "solutions") {
      const winnerKey = getWinnerKey(message.judgeMent?.winner);

      return (
        <BattleRow
          key={message.id}
          left={(
            <SolutionCard
              title={modelCards[0].title}
              subtitle={modelCards[0].subtitle}
              content={message.solution_1}
              score={message.judgeMent?.solution_1_score}
              isWinner={winnerKey === modelCards[0].key}
              model={modelCards[0].model}
            />
          )}
          right={(
            <SolutionCard
              title={modelCards[1].title}
              subtitle={modelCards[1].subtitle}
              content={message.solution_2}
              score={message.judgeMent?.solution_2_score}
              isWinner={winnerKey === modelCards[1].key}
              model={modelCards[1].model}
            />
          )}
        />
      );
    }

    if (message.type === "judgement") {
      return (
        <JudgePanel
          key={message.id}
          judgeMent={message.judgeMent}
          winnerKey={getWinnerKey(message.judgeMent?.winner)}
          winnerLabel={getWinnerLabel(message.judgeMent?.winner)}
        />
      );
    }

    return null;
  };

  return (
    <div className="arena-shell h-screen overflow-hidden">
      <Header />

      <main className="mt-20 h-[calc(100vh-5rem)] px-4 pb-4 pt-4 md:px-6">
        <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[32px] border border-white/8 bg-white/[0.03] shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
          <ChatContainer scrollKey={messages.length}>
            {messages.length === 0 ? (
              <motion.section
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex min-h-full flex-1 items-center justify-center"
              >
                <div className="w-full max-w-5xl">
                  <div className="mx-auto max-w-3xl text-center">
                    <div className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full border border-violet-300/20 bg-violet-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.34em] text-violet-100 shadow-[0_0_40px_rgba(124,58,237,0.18)]">
                      <Sparkles className="h-4 w-4 text-cyan-300" />
                      Premium battle mode
                    </div>
                    <h1 className="text-balance text-5xl font-black tracking-tight text-white md:text-7xl">
                      Real-time AI battles in a single conversation.
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                      Enter a challenge and watch Mistral and Cohere respond side by side, then let the judge deliver a clean winner with animated reasoning.
                    </p>
                  </div>

                  <div className="mt-14 grid grid-cols-1 gap-5 xl:grid-cols-3">
                    {emptyStateItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="rounded-[28px] border border-white/8 bg-slate-950/55 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl"
                        >
                          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-violet-100">
                            <Icon className="h-6 w-6" />
                          </div>
                          <h2 className="text-2xl font-black tracking-tight text-white">{item.title}</h2>
                          <p className="mt-3 text-base leading-7 text-slate-400">{item.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.section>
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((message) => renderArenaMessage(message))}
              </AnimatePresence>
            )}
          </ChatContainer>

          <InputBar
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            onClear={clearConversation}
            isLoading={status === "loading"}
            disabled={status === "loading"}
            hasMessages={messages.length > 0}
            helperText={error || (status === "loading"
              ? "Arena is evaluating both models in real time."
              : "Press Enter to launch a battle. Shift+Enter adds a new line.")}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
