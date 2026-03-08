"use client";

import { useRef, useCallback, useEffect, useState, KeyboardEvent } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUp, ArrowLeft, Radio } from "lucide-react";
import { CronUpdateMessage, ChatMessage, CHAT_AGENTS, AgentChatConfig } from "./types";

interface Props {
  update: CronUpdateMessage | null;
  onBack?: () => void;
  showBackButton?: boolean;
}

const MARKDOWN_CLASSES =
  "text-sm text-text-primary leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-2 [&_li]:mb-0.5 [&_h1]:text-base [&_h1]:font-semibold [&_h1]:mb-1 [&_h2]:text-sm [&_h2]:font-semibold [&_h2]:mb-1 [&_h3]:text-sm [&_h3]:font-medium [&_h3]:mb-1 [&_code]:bg-black/[0.06] [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_pre]:bg-black/[0.06] [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:text-xs [&_strong]:font-semibold [&_blockquote]:border-l-2 [&_blockquote]:border-border-color [&_blockquote]:pl-3 [&_blockquote]:text-text-secondary";

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getAgent(agentId: string): AgentChatConfig {
  return CHAT_AGENTS.find((a) => a.id === agentId) ?? CHAT_AGENTS[0];
}

export default function OpsFeedDetail({ update, onBack, showBackButton }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isWaitingForAgent, setIsWaitingForAgent] = useState(false);
  const waitingConvIdRef = useRef<string | null>(null);

  const agent = update ? getAgent(update.agentId) : null;

  // Query all messages in this conversation (to show replies)
  const allMessages = useQuery(
    api.agentMessages.listMessages,
    update
      ? { conversationId: update.conversationId as Id<"agentConversations"> }
      : "skip"
  ) as ChatMessage[] | undefined;

  // Filter to only replies after the selected cron update message
  const replyMessages = allMessages?.filter((m) => {
    if (!update) return false;
    // Show messages that come after the selected update AND are not the update itself
    return m._id !== update._id && new Date(m.createdAt) >= new Date(update.createdAt);
  }) ?? [];

  // Clear waiting state when agent reply arrives
  useEffect(() => {
    if (isWaitingForAgent && replyMessages.length > 0) {
      const last = replyMessages[replyMessages.length - 1];
      if (last?.role === "assistant" && update?.conversationId === waitingConvIdRef.current) {
        setIsWaitingForAgent(false);
        waitingConvIdRef.current = null;
      }
    }
  }, [replyMessages, isWaitingForAgent, update?.conversationId]);

  // Reset waiting state when switching updates
  useEffect(() => {
    setIsWaitingForAgent(false);
    waitingConvIdRef.current = null;
  }, [update?._id]);

  // Scroll to bottom when new replies
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [replyMessages.length, isWaitingForAgent]);

  const addMessage = useMutation(api.agentMessages.addMessage);
  const updateMeta = useMutation(api.agentConversations.updateConversationMeta);

  const handleResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, []);

  const handleSend = useCallback(async () => {
    if (!update || isWaitingForAgent) return;
    const text = textareaRef.current?.value.trim();
    if (!text) return;

    const convId = update.conversationId as Id<"agentConversations">;

    // Save user message
    await addMessage({ conversationId: convId, role: "user", content: text });

    // Update conversation meta
    const currentCount = allMessages?.length ?? 0;
    await updateMeta({
      conversationId: convId,
      lastMessageAt: new Date().toISOString(),
      messageCount: currentCount + 1,
    });

    // Clear input
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }

    // Build messages for API (recent context + new message)
    const historyMessages = (allMessages ?? []).slice(-39).map((m) => ({
      role: m.role,
      content: m.content,
    }));
    const apiMessages = [...historyMessages, { role: "user", content: text }];

    setIsWaitingForAgent(true);
    waitingConvIdRef.current = update.conversationId;

    try {
      const response = await fetch("/api/agent-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          agentId: update.agentId,
          conversationId: update.conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
    } catch (err) {
      console.error("[OpsFeedDetail] Send error:", err);
      try {
        await addMessage({
          conversationId: convId,
          role: "assistant",
          content: "Sorry, I couldn't reach the agent. Please try again.",
        });
      } catch (saveErr) {
        console.error("[OpsFeedDetail] Error save also failed:", saveErr);
      }
      setIsWaitingForAgent(false);
      waitingConvIdRef.current = null;
    }
  }, [update, isWaitingForAgent, allMessages, addMessage, updateMeta]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  // Empty state — no update selected
  if (!update || !agent) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 bg-white">
        <Radio size={32} className="mb-3 text-text-secondary/30" />
        <p className="text-sm font-medium text-text-primary">Select a cron update to view details</p>
        <p className="text-xs text-text-secondary mt-1">Agent reports appear in the inbox on the left</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      {/* Header */}
      <div className="shrink-0 px-4 py-3 flex items-center gap-3">
        {showBackButton && (
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-black/[0.04] transition-colors md:hidden"
          >
            <ArrowLeft size={18} className="text-text-secondary" />
          </button>
        )}
        <div
          className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold overflow-hidden"
          style={{ backgroundColor: agent.accentHex }}
        >
          <img
            src={agent.avatarPath}
            alt={agent.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text-primary">{agent.name}</span>
            {update.jobName && (
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${agent.accentHex}15`,
                  color: agent.accentHex,
                }}
              >
                {update.jobName}
              </span>
            )}
          </div>
          <p className="text-[11px] text-text-secondary">{formatTimestamp(update.createdAt)}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {/* Original cron update */}
          <div className={MARKDOWN_CLASSES}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {update.content}
            </ReactMarkdown>
          </div>

          {/* Reply thread */}
          {replyMessages.length > 0 && (
            <div className="mt-6 pt-4 space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary/50 mb-3">
                Replies
              </p>
              {replyMessages.map((msg) => {
                const isUser = msg.role === "user";
                if (isUser) {
                  return (
                    <div key={msg._id} className="flex justify-end py-1">
                      <div className="max-w-[80%] sm:max-w-[70%] bg-gray-100 text-text-primary rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={msg._id} className="flex items-start gap-3 py-1">
                    <div
                      className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5 overflow-hidden"
                      style={{ backgroundColor: agent.accentHex }}
                    >
                      <img
                        src={agent.avatarPath}
                        alt={agent.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold mb-1 block" style={{ color: agent.accentHex }}>
                        {agent.name}
                      </span>
                      <div className={MARKDOWN_CLASSES}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Waiting indicator */}
          {isWaitingForAgent && (
            <div className="flex items-start gap-3 py-2 mt-2">
              <div
                className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5 overflow-hidden"
                style={{ backgroundColor: agent.accentHex }}
              >
                <img
                  src={agent.avatarPath}
                  alt={agent.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs text-text-secondary italic">Thinking</span>
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

      {/* Reply input */}
      <div className="shrink-0 px-4 py-3 pb-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 bg-white border border-gray-200 rounded-2xl shadow-lg px-4 py-2.5 focus-within:border-gray-300 focus-within:shadow-xl transition-all">
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder={`Reply to ${agent.name}...`}
              disabled={isWaitingForAgent}
              onInput={handleResize}
              onKeyDown={handleKeyDown}
              className="flex-1 resize-none bg-transparent text-base sm:text-sm text-text-primary placeholder:text-text-secondary/50 outline-none leading-relaxed max-h-[160px] disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isWaitingForAgent}
              className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isWaitingForAgent ? undefined : "#111827",
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
    </div>
  );
}
