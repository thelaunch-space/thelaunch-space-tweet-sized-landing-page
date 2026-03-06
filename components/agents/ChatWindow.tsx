"use client";

import { useEffect, useRef, useState } from "react";
import { AgentChatConfig, ChatMessage } from "./types";
import MessageBubble from "./MessageBubble";

interface Props {
  messages: ChatMessage[];
  isWaitingForAgent: boolean;
  waitingSince: number | null;
  selectedAgent: AgentChatConfig;
}

const THINKING_STAGES = [
  { after: 0, text: "Thinking" },
  { after: 5000, text: "Working on it" },
  { after: 15000, text: "Running tools" },
  { after: 30000, text: "Still working, hang tight" },
  { after: 90000, text: "Doing deep work — you can leave and come back" },
];

function useThinkingText(isWaiting: boolean, since: number | null): string {
  const [text, setText] = useState(THINKING_STAGES[0].text);

  useEffect(() => {
    if (!isWaiting || !since) {
      setText(THINKING_STAGES[0].text);
      return;
    }

    const update = () => {
      const elapsed = Date.now() - since;
      let current = THINKING_STAGES[0].text;
      for (const stage of THINKING_STAGES) {
        if (elapsed >= stage.after) current = stage.text;
      }
      setText(current);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [isWaiting, since]);

  return text;
}

export default function ChatWindow({
  messages,
  isWaitingForAgent,
  waitingSince,
  selectedAgent,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const thinkingText = useThinkingText(isWaitingForAgent, waitingSince);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isWaitingForAgent]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-1">
        {messages.length === 0 && !isWaitingForAgent ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white font-bold"
              style={{ backgroundColor: selectedAgent.accentHex }}
            >
              {selectedAgent.name[0]}
            </div>
            <p className="text-sm font-medium text-text-primary">
              Chat with {selectedAgent.name}
            </p>
            <p className="text-xs text-text-secondary mt-1">{selectedAgent.role}</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg._id} message={msg} agent={selectedAgent} />
          ))
        )}

        {/* Progressive typing indicator while waiting for agent */}
        {isWaitingForAgent && (
          <div className="flex items-start gap-3 py-2">
            <div
              className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5 overflow-hidden"
              style={{ backgroundColor: selectedAgent.accentHex }}
            >
              <img
                src={selectedAgent.avatarPath}
                alt={selectedAgent.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-text-secondary italic">
                {thinkingText}
              </span>
              <span className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/40 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/40 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/40 animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
