"use client"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Loader2, Sparkles, Zap, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { parseAIResponse, renderGenerativeContent, type ContentDefinition } from "@/components/chat/ComponentRenderer"
import { ComponentLoadingAnimation } from "@/components/chat/ComponentLoadingAnimation"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  generativeContent?: ContentDefinition | null
  hasComponents?: boolean
  isGenerating?: boolean
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isWelcomeHiding, setIsWelcomeHiding] = useState(false)

  // Minimum swipe distance (in px) to trigger close
  const minSwipeDistance = 100

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchEnd - touchStart
    const isLeftToRightSwipe = distance > minSwipeDistance

    if (isLeftToRightSwipe) {
      setIsOpen(false)
    }
  }

  // Generate or retrieve persistent session ID
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check if we already have a session ID in localStorage
      let storedSessionId = localStorage.getItem('fluxive_chat_session_id')

      if (!storedSessionId) {
        // Create new session ID if it doesn't exist
        storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('fluxive_chat_session_id', storedSessionId)
      }

      return storedSessionId
    }
    // Fallback for SSR
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  })

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
    // Set welcome message only on client side to avoid hydration mismatch
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "✨ **Hey there!** I'm VIX.\n\nReady to help with your projects, answer questions, or discuss ideas. What's on your mind?",
        timestamp: new Date(),
      },
    ])
  }, [])

  // Add/remove body class for page shift effect
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('chat-open')
    } else {
      document.body.classList.remove('chat-open')
    }

    return () => {
      document.body.classList.remove('chat-open')
    }
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    // Trigger welcome message fade-out animation on first message
    if (messages.length === 1 && messages[0].id === "welcome" && !isWelcomeHiding) {
      setIsWelcomeHiding(true)
      // Remove only welcome message after animation completes
      setTimeout(() => {
        setMessages((prev) => prev.filter(msg => msg.id !== "welcome"))
        setIsWelcomeHiding(false)
      }, 400) // Match animation duration
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Create assistant message placeholder for streaming
      const assistantMessageId = (Date.now() + 1).toString()
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        },
      ])

      // Get user's local time and timezone info
      const now = new Date()
      const userTimeInfo = {
        localTime: now.toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezoneOffset: -now.getTimezoneOffset() / 60, // Hours from UTC
        timestamp: now.toISOString()
      }

      // Use Next.js API route
      // Use PHP API proxy for static hosting compatibility
      const apiUrl = '/api/chat.php'

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId: sessionId,
          userTimeInfo: userTimeInfo,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      // Handle streaming response from n8n
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        let accumulatedText = ""
        let buffer = ""
        let isStreamingComplete = false
        let firstChunkReceived = false
        let isCodeBlockDetected = false
        let codeBlockStarted = false

        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            isStreamingComplete = true
            break
          }

          // Decode the chunk and add to buffer
          const chunk = decoder.decode(value, { stream: true })
          buffer += chunk

          // Split by newlines to process complete JSON objects
          const lines = buffer.split("\n")

          // Keep the last incomplete line in the buffer
          buffer = lines.pop() || ""

          // Process each complete line
          for (const line of lines) {
            if (!line.trim()) continue

            try {
              const parsed = JSON.parse(line)

              // n8n sends chunks with type: "item" and content field
              if (parsed.type === "item" && parsed.content) {
                // Hide typing indicator on first chunk
                if (!firstChunkReceived) {
                  setIsLoading(false)
                  firstChunkReceived = true
                }

                // Add content character by character for smooth typing effect
                const newContent = parsed.content

                for (let i = 0; i < newContent.length; i++) {
                  accumulatedText += newContent[i]

                  // Check if we've detected a code block starting (```json, ```typescript, etc.)
                  if (!isCodeBlockDetected && accumulatedText.includes('```')) {
                    isCodeBlockDetected = true
                    codeBlockStarted = true

                    // Extract text before code block
                    const textBeforeCode = accumulatedText.split('```')[0].trim()

                    console.log('🎨 Code block detected! Showing loading animation...')
                    console.log('📝 Text before code:', textBeforeCode)

                    // Show loading animation immediately
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === assistantMessageId
                          ? {
                            ...msg,
                            content: textBeforeCode,
                            hasComponents: false,
                            generativeContent: null,
                            isGenerating: true
                          }
                          : msg
                      )
                    )

                    // Stop character-by-character updates, just accumulate
                    break
                  }

                  // If no code block detected yet, continue with smooth typing
                  if (!isCodeBlockDetected) {
                    // Delay based on character type for natural typing
                    const char = newContent[i]
                    const delay = char === ' ' ? 20 : char.match(/[.,!?;:]/) ? 40 : 15

                    await new Promise(resolve => setTimeout(resolve, delay))

                    // Update message with smooth streaming
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === assistantMessageId
                          ? {
                            ...msg,
                            content: accumulatedText,
                            hasComponents: false,
                            generativeContent: null,
                            isGenerating: false
                          }
                          : msg
                      )
                    )
                  }
                }
              }
            } catch (e) {
              // Skip invalid JSON lines
              console.warn("Failed to parse chunk:", line)
            }
          }
        }

        // Process any remaining buffer content
        if (buffer.trim()) {
          try {
            const parsed = JSON.parse(buffer)
            if (parsed.type === "item" && parsed.content) {
              accumulatedText += parsed.content
            }
          } catch (e) {
            console.warn("Failed to parse final chunk:", buffer)
          }
        }

        // After streaming is complete, parse and render components
        if (isStreamingComplete && accumulatedText) {
          console.log('✅ Streaming complete. Processing response...')
          console.log('📄 Full accumulated text length:', accumulatedText.length)

          const { hasComponents, content, plainText } = parseAIResponse(accumulatedText)

          console.log('🔍 Parse results:', { hasComponents, plainTextLength: plainText.length })

          // If code block was detected during streaming, keep showing loading for a moment
          if (isCodeBlockDetected) {
            console.log('⏳ Showing loading animation for 1.2s before rendering component...')
            await new Promise(resolve => setTimeout(resolve, 1200))
          }

          console.log('🎉 Rendering final component!')

          // Render final components
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {
                  ...msg,
                  content: hasComponents ? plainText : accumulatedText,
                  hasComponents,
                  generativeContent: content,
                  isGenerating: false
                }
                : msg
            )
          )
        }
      } else {
        // Fallback for non-streaming response
        const data = await response.json()
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: data.response || data.output || "No response" }
              : msg
          )
        )
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage = error instanceof Error && error.message === "Webhook URL is not configured"
        ? "⚠️ Chat service is not configured. Please contact support."
        : "❌ Sorry, I encountered an error. Please try again."

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: errorMessage,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const modalContent = (
    <>
      {/* Backdrop Blur Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] will-change-[opacity]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Chat */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
              opacity: { duration: 0.3 }
            }}
            className="fixed top-0 right-0 bottom-0 z-[9999] w-full sm:w-[380px] md:w-[420px] lg:w-[450px] flex flex-col shadow-2xl h-[100dvh] max-h-[100dvh] sm:rounded-l-3xl overflow-hidden will-change-transform"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Chat Container */}
            <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-l border-primary/20 shadow-xl shadow-primary/10 flex flex-col h-full w-full overflow-hidden relative min-h-0 sm:rounded-l-3xl">
              {/* Swipe Indicator - Visual feedback */}
              <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10 pointer-events-none">
                <div className="flex flex-col gap-1 opacity-20">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <div className="w-1 h-8 bg-primary rounded-full" />
                </div>
              </div>

              {/* Accent Bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/60 to-primary/30" />

              {/* Header */}
              <div className="relative flex items-center justify-between px-4 sm:px-6 py-3 sm:py-5 border-b border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 backdrop-blur-sm flex-shrink-0">
                <div className="flex items-center gap-3 sm:gap-4">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="h-9 w-9 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center shadow-lg shadow-primary/40 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white relative z-10" />
                  </motion.div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                      VIX
                    </h2>
                    <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.8, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary shadow-lg shadow-primary/60"
                      />
                      <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Always Online</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-primary/10 h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl transition-all duration-300 hover:rotate-90 group"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/70 group-hover:text-primary transition-colors" />
                </Button>
              </div>

              {/* Messages Area with Generative UI */}
              <ScrollArea className="flex-1 px-3 sm:px-5 py-3 sm:py-5 bg-gradient-to-b from-transparent via-muted/5 to-transparent min-h-0" ref={scrollAreaRef}>
                <div className="space-y-4 sm:space-y-5 max-w-full mx-auto">
                  {messages
                    .filter(message => message.role === "user" || message.content.length > 0)
                    .map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: (message.id === "welcome" && isWelcomeHiding) ? 0 : 1,
                          y: (message.id === "welcome" && isWelcomeHiding) ? -20 : 0,
                          scale: (message.id === "welcome" && isWelcomeHiding) ? 0.95 : 1
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                      >
                        {/* Avatar for AI */}
                        {message.role === "assistant" && (
                          <div className="flex-shrink-0 mt-1">
                            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-primary/90 to-primary/70 flex items-center justify-center shadow-md">
                              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                            </div>
                          </div>
                        )}

                        <div className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"} max-w-[85%]`}>
                          <div
                            className={`rounded-2xl sm:rounded-3xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-md hover:shadow-lg transition-shadow w-full overflow-hidden ${message.role === "user"
                              ? "bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground"
                              : "bg-card border border-border/50 text-card-foreground backdrop-blur-sm"
                              }`}
                          >
                            {/* Show loading animation when generating components */}
                            {message.isGenerating ? (
                              <div className="space-y-2 sm:space-y-3">
                                {message.content && (
                                  <div className={`prose max-w-none text-sm sm:text-base ${message.role === "user"
                                    ? "prose-invert prose-headings:text-primary-foreground prose-p:text-primary-foreground prose-strong:text-primary-foreground prose-li:text-primary-foreground"
                                    : "dark:prose-invert"
                                    }`}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                      {message.content}
                                    </ReactMarkdown>
                                  </div>
                                )}
                                <ComponentLoadingAnimation />
                              </div>
                            ) : message.hasComponents && message.generativeContent ? (
                              <div className="space-y-2 sm:space-y-3">
                                {message.content && (
                                  <div className={`prose max-w-none text-sm sm:text-base ${message.role === "user"
                                    ? "prose-invert prose-headings:text-primary-foreground prose-p:text-primary-foreground prose-strong:text-primary-foreground prose-li:text-primary-foreground"
                                    : "dark:prose-invert"
                                    }`}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                      {message.content}
                                    </ReactMarkdown>
                                  </div>
                                )}
                                <div className="generative-ui-content w-full overflow-x-auto">
                                  {renderGenerativeContent(message.generativeContent)}
                                </div>
                              </div>
                            ) : (
                              <div className={`prose max-w-none text-sm sm:text-base ${message.role === "user"
                                ? "prose-invert prose-headings:text-primary-foreground prose-p:text-primary-foreground prose-strong:text-primary-foreground prose-li:text-primary-foreground"
                                : "dark:prose-invert"
                                }`}>
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                    // Custom heading styles
                                    h1: ({ children }) => (
                                      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 mt-1.5 sm:mt-2">{children}</h1>
                                    ),
                                    h2: ({ children }) => (
                                      <h2 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 mt-1.5 sm:mt-2">{children}</h2>
                                    ),
                                    h3: ({ children }) => (
                                      <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 mt-1.5 sm:mt-2">{children}</h3>
                                    ),
                                    // Custom paragraph styles
                                    p: ({ children }) => (
                                      <p className="text-[13px] sm:text-[15px] leading-relaxed mb-1.5 sm:mb-2 last:mb-0">
                                        {children}
                                      </p>
                                    ),
                                    // Custom list styles
                                    ul: ({ children }) => (
                                      <ul className="space-y-0.5 sm:space-y-1 my-2 sm:my-3 ml-3 sm:ml-4">{children}</ul>
                                    ),
                                    ol: ({ children }) => (
                                      <ol className="space-y-0.5 sm:space-y-1 my-2 sm:my-3 ml-3 sm:ml-4">{children}</ol>
                                    ),
                                    li: ({ children }) => (
                                      <li className="text-[13px] sm:text-[15px] leading-relaxed">{children}</li>
                                    ),
                                    // Custom link styles
                                    a: ({ href, children }) => (
                                      <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${message.role === "user"
                                          ? "text-primary-foreground underline hover:opacity-80"
                                          : "text-primary hover:text-primary/80 underline"
                                          } transition-colors`}
                                      >
                                        {children}
                                      </a>
                                    ),
                                    // Custom code block with syntax highlighting
                                    code({ node, inline, className, children, ...props }: any) {
                                      const match = /language-(\w+)/.exec(className || "")
                                      return !inline && match ? (
                                        <div className="my-3 rounded-xl overflow-hidden">
                                          <SyntaxHighlighter
                                            style={atomDark}
                                            language={match[1]}
                                            PreTag="div"
                                            className="text-sm"
                                            {...props}
                                          >
                                            {String(children).replace(/\n$/, "")}
                                          </SyntaxHighlighter>
                                        </div>
                                      ) : (
                                        <code
                                          className={`${message.role === "user"
                                            ? "bg-white/20 text-primary-foreground"
                                            : "bg-primary/20 text-primary"
                                            } px-1.5 py-0.5 rounded text-sm font-mono`}
                                          {...props}
                                        >
                                          {children}
                                        </code>
                                      )
                                    },
                                    // Custom blockquote
                                    blockquote: ({ children }) => (
                                      <blockquote className="border-l-4 border-primary pl-4 py-2 my-3 italic">
                                        {children}
                                      </blockquote>
                                    ),
                                    // Custom table
                                    table: ({ children }) => (
                                      <div className="overflow-x-auto my-3">
                                        <table className="min-w-full border border-white/10 rounded-lg">
                                          {children}
                                        </table>
                                      </div>
                                    ),
                                    th: ({ children }) => (
                                      <th className="border border-white/10 px-3 py-2 bg-white/5 font-semibold text-left">
                                        {children}
                                      </th>
                                    ),
                                    td: ({ children }) => (
                                      <td className="border border-white/10 px-3 py-2">
                                        {children}
                                      </td>
                                    ),
                                  }}
                                >
                                  {message.content}
                                </ReactMarkdown>
                              </div>
                            )}
                          </div>

                          {/* Timestamp */}
                          <p className={`text-[10px] mt-1.5 ${message.role === "user" ? "text-white/50" : "text-muted-foreground/60"}`}>
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        {/* Avatar for User */}
                        {message.role === "user" && (
                          <div className="flex-shrink-0 mt-1">
                            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-muted-foreground/90 to-muted-foreground/70 flex items-center justify-center shadow-md">
                              <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}

                  {/* Typing Indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 justify-start"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-primary/90 to-primary/70 flex items-center justify-center shadow-md">
                          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white animate-pulse" />
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        <div className="rounded-2xl sm:rounded-3xl px-5 py-3 bg-card border border-border/50 backdrop-blur-sm shadow-md">
                          <div className="flex gap-1.5">
                            <motion.div
                              className="h-2 w-2 rounded-full bg-primary/60"
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                              className="h-2 w-2 rounded-full bg-primary/60"
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                            />
                            <motion.div
                              className="h-2 w-2 rounded-full bg-primary/60"
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                            />
                          </div>
                        </div>
                        <p className="text-[10px] mt-1.5 text-muted-foreground/60">AI is thinking...</p>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="relative px-3 sm:px-5 py-3 sm:py-4 pb-safe border-t border-primary/20 bg-gradient-to-t from-muted/20 to-transparent dark:from-gray-800/30 dark:to-transparent backdrop-blur-sm flex-shrink-0 safe-area-bottom">
                <div className="flex gap-2 sm:gap-3 items-end">
                  <div className="flex-1 relative group">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      disabled={isLoading}
                      className="h-10 sm:h-12 bg-background dark:bg-gray-800/60 border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground text-sm px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 group-hover:border-primary/40"
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                    className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 p-0 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:shadow-lg hover:shadow-primary/40 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg sm:rounded-xl font-semibold text-primary-foreground"
                  >
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground/70 mt-2 sm:mt-2.5 text-center flex items-center justify-center gap-1 sm:gap-1.5">
                  <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
                  Powered by <span className="text-primary font-semibold">FLUXIV</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )

  // Prevent hydration errors by only rendering on client
  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Floating Chat Bubble - Fixed Position */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px hsl(var(--primary) / 0.3)",
                  "0 0 40px hsl(var(--primary) / 0.6)",
                  "0 0 20px hsl(var(--primary) / 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-full"
            >
              <Button
                onClick={() => setIsOpen(true)}
                size="lg"
                className="h-16 w-16 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:scale-110 transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="relative z-10"
                >
                  <Sparkles className="h-7 w-7 text-white" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render Modal in Portal */}
      {createPortal(modalContent, document.body)}
    </>
  )

  // Prevent hydration errors by only rendering on client
  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Floating Chat Bubble - Fixed Position */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px hsl(var(--primary) / 0.3)",
                  "0 0 40px hsl(var(--primary) / 0.6)",
                  "0 0 20px hsl(var(--primary) / 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-full"
            >
              <Button
                onClick={() => setIsOpen(true)}
                size="lg"
                className="h-16 w-16 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:scale-110 transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="relative z-10"
                >
                  <Sparkles className="h-7 w-7 text-white" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render Modal in Portal */}
      {createPortal(modalContent, document.body)}
    </>
  )
}
