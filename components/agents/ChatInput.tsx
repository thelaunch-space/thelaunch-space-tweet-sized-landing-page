"use client";

import { useRef, useCallback, KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";

interface Props {
  onSend: (text: string) => void;
  isStreaming: boolean;
  agentName: string;
}

export default function ChatInput({ onSend, isStreaming, agentName }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, []);

  const handleSend = useCallback(() => {
    const text = textareaRef.current?.value.trim();
    if (!text || isStreaming) return;
    onSend(text);
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }
  }, [onSend, isStreaming]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div className="shrink-0 px-4 py-3 pb-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-3 bg-white border border-gray-200 rounded-2xl shadow-lg px-4 py-2.5 focus-within:border-gray-300 focus-within:shadow-xl transition-all">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder={`Message ${agentName}...`}
            disabled={isStreaming}
            onInput={handleResize}
            onKeyDown={handleKeyDown}
            className="flex-1 resize-none bg-transparent text-base sm:text-sm text-text-primary placeholder:text-text-secondary/50 outline-none leading-relaxed max-h-[200px] disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isStreaming}
            className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              backgroundColor: isStreaming ? undefined : "#111827",
            }}
          >
            <ArrowUp size={16} className="text-white" />
          </button>
        </div>
        <p className="text-center text-[10px] text-text-secondary/40 mt-2">
          Cmd + Enter to send
        </p>
      </div>
    </div>
  );
}
