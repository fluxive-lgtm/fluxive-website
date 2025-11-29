"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check for auth_token cookie
        const match = document.cookie.match(new RegExp('(^| )auth_token=([^;]+)'))
        if (match) {
            setIsAuthenticated(true)
        } else {
            router.push("/admin/login")
        }
        setIsLoading(false)
    }, [router])

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    if (!isAuthenticated) {
        return null // Will redirect
    }

    return <>{children}</>
}
