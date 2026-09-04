export function SiteFooter() {
  return (
    <footer className="bg-paper px-6">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 border-t border-ink/20 py-8 font-mono text-[11px] uppercase tracking-[0.09em] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ByteTrove</p>
        <p>Cloud architecture / Networks / Homelab</p>
      </div>
    </footer>
  );
}
