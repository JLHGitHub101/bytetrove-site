import Link from "next/link";

const topics = [
  {
    shortName: "AWS",
    title: "AWS Cloud",
    description:
      "Build secure, practical AWS environments while understanding every configuration decision.",
  },
  {
    shortName: "NET",
    title: "Networking",
    description:
      "Explore routing, switching, DNS, segmentation, and hybrid-cloud connectivity.",
  },
  {
    shortName: "IaC",
    title: "Infrastructure as Code",
    description:
      "Turn manually validated infrastructure into repeatable Terraform deployments.",
  },
  {
    shortName: "LAB",
    title: "Homelab",
    description:
      "Design and operate realistic environments using virtualization, storage, and automation.",
  },
];

const featuredArticles = [
  {
    category: "AWS",
    title: "Hosting a Static Next.js Site on AWS",
    description:
      "Learn how Next.js static export, Amazon S3, CloudFront, ACM, and Route 53 work together.",
    href: "/articles/hosting-nextjs-on-aws/",
    status: "In progress",
  },
];

export default function Home() {
  return (
    <main>
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1.4fr_0.6fr] lg:items-center lg:py-32">
          <div>
            <p className="mb-5 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Learn by building
            </p>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Practical technology knowledge, collected one build at a time.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              ByteTrove documents real cloud, networking, automation, and
              infrastructure projects—from the first console configuration to
              production-ready code.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#articles"
                className="rounded-lg bg-cyan-400 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Explore articles
              </Link>

              <Link
                href="#topics"
                className="rounded-lg border border-slate-700 px-6 py-3 text-center font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
              >
                Browse topics
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/20">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>

            <pre className="overflow-x-auto font-mono text-sm leading-7">
              <code>
                <span className="text-slate-500">$</span>{" "}
                <span className="text-cyan-300">build</span>{" "}
                <span className="text-white">bytetrove</span>
                {"\n"}
                <span className="text-slate-500">→</span>{" "}
                <span className="text-slate-300">learn the architecture</span>
                {"\n"}
                <span className="text-slate-500">→</span>{" "}
                <span className="text-slate-300">validate the deployment</span>
                {"\n"}
                <span className="text-slate-500">→</span>{" "}
                <span className="text-slate-300">automate the result</span>
                {"\n"}
                <span className="text-emerald-400">✓ knowledge captured</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section id="topics" className="bg-slate-900/50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Topics
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Follow the complete technology journey
            </h2>
            <p className="mt-4 leading-7 text-slate-400">
              Each topic connects architecture, implementation, validation,
              troubleshooting, and automation.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic) => (
              <article
                key={topic.title}
                className="rounded-xl border border-slate-800 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-cyan-500/60"
              >
                <div className="mb-5 inline-flex rounded-md bg-cyan-400/10 px-3 py-2 font-mono text-sm font-bold text-cyan-400">
                  {topic.shortName}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {topic.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {topic.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="articles" className="bg-slate-950 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Featured articles
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Current builds and walkthroughs
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featuredArticles.map((article) => (
              <article
                key={article.href}
                className="rounded-xl border border-slate-800 bg-slate-900 p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm font-semibold text-cyan-400">
                    {article.category}
                  </span>
                  <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
                    {article.status}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-semibold text-white">
                  {article.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {article.description}
                </p>

                <Link
                  href={article.href}
                  className="mt-6 inline-flex font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Read the walkthrough →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}