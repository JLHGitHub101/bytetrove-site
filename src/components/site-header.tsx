import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="bg-paper px-6">
      <div className="mx-auto flex h-24 max-w-[1180px] items-center justify-between border-b border-ink/20">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-ink"
          aria-label="ByteTrove home"
        >
          <span className="grid h-[34px] w-[34px] place-items-center bg-ink font-display text-xl italic text-paper">
            B
          </span>
          <span className="text-xl">ByteTrove</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-6 font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-muted">
              <li>
                <Link className="hover:text-orange" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-orange" href="/#topics">
                  Topics
                </Link>
              </li>
              <li>
                <Link className="hover:text-orange" href="/#articles">
                  Articles
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-2 border-l border-ink/20 pl-6 font-mono text-[11px] uppercase tracking-[0.09em] text-muted">
            <span
              className="h-2 w-2 rounded-full bg-status ring-4 ring-status/15"
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Field notes online</span>
            <span className="sr-only">Field notes online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
