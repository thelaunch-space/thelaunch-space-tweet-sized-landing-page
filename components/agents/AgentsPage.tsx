"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { CHAT_AGENTS, AgentChatConfig, ChatConversation, ChatMessage } from "./types";
import AgentTopNav from "./AgentTopNav";
import ConversationSidebar from "./ConversationSidebar";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import EmptyState from "./EmptyState";

interface Props {
  initialConversationId: string | null;
}

export default function AgentsPage({ initialConversationId }: Props) {
  const { userId, isSignedIn } = useAuth();

  const [selectedAgent, setSelectedAgent] = useState<AgentChatConfig>(CHAT_AGENTS[0]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(initialConversationId);
  const [isWaitingForAgent, setIsWaitingForAgent] = useState(false);
  const waitingSinceRef = useRef<number | null>(null);

  // Convex queries
  const conversations = useQuery(
    api.agentConversations.listConversations,
    isSignedIn && userId
      ? { agentId: selectedAgent.id, userId }
      : "skip"
  ) as ChatConversation[] | undefined;

  const messages = useQuery(
    api.agentMessages.listMessages,
    activeConversationId
      ? { conversationId: activeConversationId as Id<"agentConversations"> }
      : "skip"
  ) as ChatMessage[] | undefined;

  const conversation = useQuery(
    api.agentConversations.getConversation,
    activeConversationId
      ? { conversationId: activeConversationId as Id<"agentConversations"> }
      : "skip"
  );

  // Clear waiting state when a new assistant message arrives via Convex subscription
  useEffect(() => {
    if (isWaitingForAgent && messages?.length) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.role === "assistant") {
        setIsWaitingForAgent(false);
        waitingSinceRef.current = null;
      }
    }
  }, [messages, isWaitingForAgent]);

  // When loading a deep-linked conversation, sync selectedAgent from Convex data
  useEffect(() => {
    if (conversation?.agentId) {
      const agent = CHAT_AGENTS.find((a) => a.id === conversation.agentId);
      if (agent && agent.id !== selectedAgent.id) {
        setSelectedAgent(agent);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation?.agentId]);

  // Convex mutations
  const createConversation = useMutation(api.agentConversations.createConversation);
  const addMessage = useMutation(api.agentMessages.addMessage);
  const updateTitle = useMutation(api.agentConversations.updateConversationTitle);
  const updateMeta = useMutation(api.agentConversations.updateConversationMeta);

  const handleSelectAgent = useCallback((agent: AgentChatConfig) => {
    setSelectedAgent(agent);
    setActiveConversationId(null);
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const handleNewChat = useCallback(async () => {
    if (!userId) return;
    const id = await createConversation({
      agentId: selectedAgent.id,
      agentName: selectedAgent.name,
      userId,
    });
    setActiveConversationId(id);
  }, [userId, selectedAgent, createConversation]);

  const handleSend = useCallback(async (text: string) => {
    if (!userId || !activeConversationId || isWaitingForAgent) return;

    const convId = activeConversationId as Id<"agentConversations">;

    // Save user message to Convex
    await addMessage({ conversationId: convId, role: "user", content: text });

    // Auto-title from first message (first 60 chars)
    const currentMessages = messages ?? [];
    if (currentMessages.length === 0) {
      const title = text.slice(0, 60) + (text.length > 60 ? "..." : "");
      await updateTitle({ conversationId: convId, title });
    }

    // Update conversation meta
    await updateMeta({
      conversationId: convId,
      lastMessageAt: new Date().toISOString(),
      messageCount: (currentMessages.length + 1),
    });

    // Build messages array for API (last 40 messages + new user message)
    const historyMessages = currentMessages.slice(-39).map((m) => ({
      role: m.role,
      content: m.content,
    }));
    const apiMessages = [...historyMessages, { role: "user", content: text }];

    // Fire-and-forget: send to proxy, response comes back via Convex subscription
    setIsWaitingForAgent(true);
    waitingSinceRef.current = Date.now();

    try {
      const response = await fetch("/api/agent-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          agentId: selectedAgent.id,
          conversationId: activeConversationId,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
    } catch (err) {
      console.error("[AgentsPage] Send error:", err);
      // Save error message so user sees it
      try {
        await addMessage({
          conversationId: convId,
          role: "assistant",
          content: "Sorry, I couldn't reach the agent. Please try again.",
        });
      } catch (saveErr) {
        console.error("[AgentsPage] Error save also failed:", saveErr);
      }
      setIsWaitingForAgent(false);
      waitingSinceRef.current = null;
    }
  }, [userId, activeConversationId, isWaitingForAgent, messages, selectedAgent, addMessage, updateTitle, updateMeta]);

  // Auth gate
  if (!isSignedIn) {
    return (
      <div className="h-full flex items-center justify-center bg-[#F5F5F0]">
        <div className="text-center space-y-3">
          <p className="text-text-primary font-medium">Sign in to chat with your agents</p>
          <a
            href="/admin"
            className="inline-flex items-center px-4 py-2 rounded-xl bg-accent-blue text-white text-sm font-medium hover:bg-accent-blue/90 transition-colors"
          >
            Sign in
          </a>
        </div>
      </div>
    );
  }

  const allMessages: ChatMessage[] = messages ?? [];

  return (
    <div className="h-full flex flex-col">
      <AgentTopNav
        agents={CHAT_AGENTS}
        selectedAgent={selectedAgent}
        onSelectAgent={handleSelectAgent}
      />
      <div className="flex-1 flex overflow-hidden">
        <ConversationSidebar
          conversations={conversations ?? []}
          activeConversationId={activeConversationId}
          selectedAgent={selectedAgent}
          onSelectConversation={handleSelectConversation}
          onNewChat={handleNewChat}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeConversationId ? (
            <>
              <ChatWindow
                messages={allMessages}
                isWaitingForAgent={isWaitingForAgent}
                waitingSince={waitingSinceRef.current}
                selectedAgent={selectedAgent}
              />
              <ChatInput
                onSend={handleSend}
                isStreaming={isWaitingForAgent}
                agentName={selectedAgent.name}
              />
            </>
          ) : (
            <EmptyState
              selectedAgent={selectedAgent}
              onNewChat={handleNewChat}
            />
          )}
        </div>
      </div>
    </div>
  );
}
