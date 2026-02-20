import type { ReactNode } from "react"
import React from "react"

type ErrorBoundaryProps = {
  children: ReactNode
  resetKey?: string
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error("UI crashed:", error)
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.hasError && this.props.resetKey !== prevProps.resetKey) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))] p-6">
          <h2 className="text-lg font-semibold">Something went wrong</h2>
          <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">
            Try refreshing the page. If the issue persists, return to Home.
          </p>
          <a href="#/" className="mt-4 inline-flex text-sm underline">
            Go to Home
          </a>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
