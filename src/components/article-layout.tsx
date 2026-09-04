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
    <main className="flex-1 bg-paper px-6">
      <article className="mx-auto max-w-[920px] py-16 sm:py-24">
        <nav
          aria-label="Breadcrumb"
          className="mb-12 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.09em] text-muted"
        >
          <Link className="hover:text-orange" href="/">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link className="hover:text-orange" href="/#articles">
            Field notes
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-blue">{category}</span>
        </nav>

        <header className="border-b border-ink/20 pb-12">
          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] font-bold uppercase tracking-[0.09em]">
            <span className="text-blue">{category}</span>
            <span className="text-orange">Build in progress</span>
            <span className="text-muted">{readingTime}</span>
          </div>

          <h1 className="mt-7 max-w-4xl font-display text-[clamp(3.25rem,8vw,6.5rem)] font-normal leading-[0.9] tracking-[-0.055em]">
            {title}
          </h1>

          <p className="ml-auto mt-10 max-w-[650px] text-xl leading-8 text-muted">
            {description}
          </p>
        </header>

        <div className="mt-14 space-y-16">{children}</div>
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
      <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-normal leading-none tracking-[-0.04em]">
        {title}
      </h2>
      <div className="mt-6 space-y-5 text-[1.05rem] leading-8 text-muted">
        {children}
      </div>
    </section>
  );
}

export function ArticleNote({ children }: { children: ReactNode }) {
  return (
    <aside className="border-l-4 border-orange bg-[#e9e5db] p-6 text-ink">
      {children}
    </aside>
  );
}
