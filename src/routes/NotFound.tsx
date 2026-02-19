import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="surface p-8 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">
        The page you requested doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full border border-[rgb(var(--border))] px-4 py-2 text-sm transition-soft hover:bg-[rgb(var(--bg))]"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
