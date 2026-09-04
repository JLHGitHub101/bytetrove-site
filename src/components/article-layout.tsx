import type { ReactNode } from "react";
import Link from "next/link";

type ArticleLayoutProps = {
  category: string;
  title: string;
  description: string;
  readingTime: string;
  children: ReactNode;
};

type ArticleSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function ArticleLayout({
  category,
  title,
  description,
  readingTime,
  children,
}: ArticleLayoutProps) {
  return (
    <main className="flex-1 bg-slate-950">
      <article className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex items-center gap-2 text-sm text-slate-400"
        >
          <Link className="hover:text-cyan-400" href="/">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link className="hover:text-cyan-400" href="/#articles">
            Articles
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-300">{category}</span>
        </nav>

        <header className="border-b border-slate-800 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 font-mono text-sm font-semibold text-cyan-400">
              {category}
            </span>
            <span className="text-sm text-slate-500">{readingTime}</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {description}
          </p>
        </header>

        <div className="mt-12 space-y-14">{children}</div>
      </article>
    </main>
  );
}

export function ArticleSection({
  id,
  title,
  children,
}: ArticleSectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
      <div className="mt-5 space-y-5 leading-8 text-slate-300">
        {children}
      </div>
    </section>
  );
}

export function ArticleNote({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-6 text-slate-200">
      {children}
    </aside>
  );
}