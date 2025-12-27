"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")

    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login")
    } else if (isAuthenticated && pathname === "/login") {
      router.push("/")
    }

    setIsChecking(false)
  }, [pathname, router])

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    )
  }

  return <>{children}</>
}
