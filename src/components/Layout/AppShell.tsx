import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import CommandBar from "./CommandBar"
import SidebarNav from "./SidebarNav"
import BottomNav from "./BottomNav"
import AppFooter from "./AppFooter"
import CommandPalette from "../Search/CommandPalette"
import PwaStatus from "../PWA/PwaStatus"
import ErrorBoundary from "./ErrorBoundary"

const AppShell = () => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setIsPaletteOpen(true)
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "j") {
        event.preventDefault()
        navigate("/jobs")
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "n") {
        event.preventDefault()
        navigate("/jobs")
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <div className="min-h-screen">
      <CommandBar onOpenPalette={() => setIsPaletteOpen(true)} />
      <div className="mx-auto flex w-full max-w-6xl gap-6 px-4 pb-24 pt-6">
        <SidebarNav />
        <main className="min-w-0 flex-1 transition-soft">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
      <AppFooter />
      <BottomNav />
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
      />
      <PwaStatus />
    </div>
  )
}

export default AppShell
