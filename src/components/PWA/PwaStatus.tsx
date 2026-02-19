import { useEffect, useState } from "react"
import { useRegisterSW } from "virtual:pwa-register/react"
import Toast from "../ui/Toast"
import Button from "../ui/Button"

const PwaStatus = () => {
  const [offline, setOffline] = useState(!navigator.onLine)
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(
    null,
  )

  const { needRefresh, updateServiceWorker } = useRegisterSW({
    immediate: true,
  })

  useEffect(() => {
    const handleOnline = () => setOffline(false)
    const handleOffline = () => setOffline(true)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as BeforeInstallPromptEvent)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3">
      {offline && (
        <Toast variant="warning">
          <p className="font-medium">Offline</p>
          <p>You can keep working with cached content.</p>
        </Toast>
      )}
      {needRefresh && (
        <Toast variant="info">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">Update available</p>
              <p>Refresh to get the latest content.</p>
            </div>
            <Button size="sm" onClick={() => updateServiceWorker(true)}>
              Refresh
            </Button>
          </div>
        </Toast>
      )}
      {installPrompt && (
        <Toast variant="success">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">Install App</p>
              <p>Keep Carpentry Companion on your home screen.</p>
            </div>
            <Button
              size="sm"
              onClick={async () => {
                await installPrompt.prompt()
                setInstallPrompt(null)
              }}
            >
              Install
            </Button>
          </div>
        </Toast>
      )}
    </div>
  )
}

export default PwaStatus

declare global {
  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
  }
}
