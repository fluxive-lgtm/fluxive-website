"use client"

import { useEffect } from "react"

export default function ScrollToTop() {
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    
    // Also handle browser back/forward navigation
    window.history.scrollRestoration = "manual"
  }, [])

  return null
}
