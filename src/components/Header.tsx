import ThemeToggle from "./ThemeToggle";

export default function Header({ showAllProjects = false }: { showAllProjects?: boolean }) {
  return (
    <header className="relative sticky top-0 z-50 bg-bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:px-10">
        <a
          href="/"
          className="block leading-none"
        >
          <img
            src="/kovina-wordmark-header.svg"
            alt="Kovina"
            className="h-[26px] w-auto light-logo"
            width="156"
            height="26"
          />
          <img
            src="/kovina-wordmark-header-white.svg"
            alt="Kovina"
            className="h-[26px] w-auto dark-logo"
            width="156"
            height="26"
          />
        </a>
        <nav className="flex items-center gap-4">
          {showAllProjects && (
            <a
              href="/#projects"
              className="rounded-full px-3 py-2 text-xs font-semibold text-text-secondary transition-colors hover:bg-accent hover:text-white sm:px-4"
            >
              All Projects
            </a>
          )}
          <a
            href="https://github.com/sparshsam"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-2 text-xs font-semibold text-text-secondary transition-colors hover:bg-accent hover:text-white sm:px-4"
          >
            GitHub
          </a>
        </nav>
      </div>
      <div className="absolute right-0 top-1/2 z-50 -translate-y-1/2">
        <ThemeToggle />
      </div>
    </header>
  );
}
