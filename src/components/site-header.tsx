import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white"
        >
          Byte<span className="text-cyan-400">Trove</span>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-6 text-sm text-slate-300">
            <li>
              <Link className="hover:text-cyan-400" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-cyan-400" href="/#topics">
                Topics
              </Link>
            </li>
            <li>
              <Link className="hover:text-cyan-400" href="/#articles">
                Articles
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}