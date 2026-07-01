export default function Footer() {
  return (
    <>
      {/* ── Data Strip ── */}
      <section className="border-y border-border-default">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-4 text-xs font-bold tracking-wider uppercase text-text-muted sm:px-10 sm:py-5">
          <span>Open Source</span>
          <span>Built by Sparsh Sam</span>
          <span>Toronto, Canada</span>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border-default px-6 py-12 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold tracking-widest uppercase text-text-primary">Kovina</p>
            <p className="mt-1 text-xs text-text-secondary">Forged tools for everyday life.</p>
          </div>
          <nav className="flex gap-6">
            <a
              href="https://github.com/sparshsam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-secondary transition-colors hover:text-accent"
            >
              GitHub
            </a>
            <a href="/privacy" className="text-xs text-text-secondary transition-colors hover:text-accent">
              Privacy
            </a>
            <a href="/terms" className="text-xs text-text-secondary transition-colors hover:text-accent">
              Terms
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
