"use client"

import { ThemeToggler } from "./themeToggler"
import { Home, Upload } from "lucide-react"
import { Button } from "./button"
import Link from "next/link"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const Navbar = () => {
  const { status } = useSession()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    if (status === "authenticated") {
      setAuthenticated(true)
    } else if (status === "unauthenticated") {
      setAuthenticated(false)
    }
  }, [status])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-20">
        <Image
          src="/Loader.gif"
          alt="Loading..."
          width={40}
          height={40}
          priority
        />
      </div>
    )
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
    toast.success("Signed Out successfully")
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="font-bold text-sm">V</span>
            </div>
            <span className="font-semibold text-lg">VideoHub</span>
          </div>

          {authenticated && (
            <>
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-6">
                  <Link
                    href="/home"
                    className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                  <Link
                    href="/upload"
                    className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload</span>
                  </Link>
                </div>
                <ThemeToggler />

                <Button
                  variant="ghost"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={handleSignOut}
                >
                  Log Out
                </Button>
              </div>

            </>
          )}

          {authenticated === false && (
            <>
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-6">
                  <Link
                    href="/register"
                    className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                  <Link
                    href="/login"
                    className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
