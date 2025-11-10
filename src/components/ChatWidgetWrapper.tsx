"use client";

import dynamic from "next/dynamic";

// Lazy load ChatWidget to improve initial page load
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: false,
  loading: () => null
});

export default function ChatWidgetWrapper() {
  return <ChatWidget />;
}
