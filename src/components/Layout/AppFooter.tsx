const AppFooter = () => {
  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated))]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-[rgb(var(--text-muted))]">
        <p>
          Study tool only, not professional advice. Always verify against the
          current NCC/Standards and local regulations.
        </p>
        <p>Carpentry Companion (AU) — data-driven learning and calculators.</p>
        {import.meta.env.VITE_ISSUE_URL ? (
          <a
            href={import.meta.env.VITE_ISSUE_URL}
            className="text-[rgb(var(--text))]"
            target="_blank"
            rel="noreferrer"
          >
            Report an issue
          </a>
        ) : null}
      </div>
    </footer>
  )
}

export default AppFooter
