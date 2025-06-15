import { ThemeToggler } from "./themeToggler"
import { Home, Upload } from "lucide-react"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="font-bold text-sm">V</span>
            </div>
            <span className="font-semibold text-lg">VideoHub</span>
          </div>

          {/* Navigation Links */}
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
          </div>

          {/* Theme Toggler */}
        </div>
      </div>
    </nav >
  )
}

export default Navbar