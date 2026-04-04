import React from "react";
import { LoaderCircle, RotateCcw, Sparkles, Swords } from "lucide-react";
import { Button } from "../ui/Button";

const InputBar = ({
  value,
  onChange,
  onSubmit,
  onClear,
  isLoading,
  disabled,
  hasMessages,
  helperText,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit(event);
    }
  };

  return (
    <div className="border-t border-white/6 bg-slate-950/75 px-4 pb-4 pt-4 backdrop-blur-2xl md:px-6">
      <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-6xl flex-col gap-3">
        <div className="flex items-center gap-3 rounded-[28px] border border-white/10 bg-white/[0.04] px-4 py-3 shadow-[0_16px_50px_rgba(0,0,0,0.32)]">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-violet-200">
            <Sparkles className="h-5 w-5" />
          </div>

          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything or start a battle..."
            rows={1}
            disabled={disabled}
            className="chat-scrollbar min-h-[56px] max-h-40 flex-1 resize-none bg-transparent px-1 py-3 text-base text-white outline-none placeholder:text-slate-500"
          />

          <div className="flex items-center gap-2">
            {hasMessages && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="hidden md:inline-flex"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={disabled || !value.trim()}
              className="gap-2 rounded-2xl px-6"
            >
              {isLoading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Swords className="h-4 w-4" />
              )}
              {isLoading ? "Battling..." : "Compare"}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <p className="text-xs uppercase tracking-[0.26em] text-slate-500">
            {helperText}
          </p>
          {hasMessages && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 transition-colors hover:text-white md:hidden"
            >
              Clear Chat
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default InputBar;
