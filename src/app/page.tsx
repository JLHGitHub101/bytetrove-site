import Link from "next/link";

const topics = [
  {
    number: "01",
    title: "AWS Architecture",
    description:
      "Console-first cloud builds that explain the service, the configuration, and the reason behind each decision.",
  },
  {
    number: "02",
    title: "Network Engineering",
    description:
      "Practical routing, switching, DNS, segmentation, and hybrid connectivity documented from the packet level up.",
  },
  {
    number: "03",
    title: "Infrastructure as Code",
    description:
      "Validated environments translated into maintainable Terraform modules and repeatable delivery workflows.",
  },
  {
    number: "04",
    title: "Homelab Builds",
    description:
      "Hands-on virtualization, storage, Windows services, automation, and observability in a working lab.",
  },
];

const featuredArticles = [
  {
    category: "AWS / DELIVERY",
    number: "FIELD NOTE 001",
    title: "Hosting a Static Next.js Site on AWS",
    description:
      "Follow the path from a local static export to S3, CloudFront, ACM, Route 53, and an automated deployment pipeline.",
    href: "/articles/hosting-nextjs-on-aws/",
    status: "BUILD IN PROGRESS",
  },
];

export default function Home() {
  return (
    <main className="bg-paper px-6">
      <div className="mx-auto max-w-[1180px]">
        <section className="border-b border-ink/20 pb-20 pt-[clamp(4.75rem,11vw,9.375rem)]">
          <p className="mb-8 font-mono text-xs font-bold uppercase tracking-[0.16em] text-blue">
            01 &nbsp; Building in public
          </p>

          <h1 className="max-w-[970px] font-display text-[clamp(3.6rem,10vw,8.25rem)] font-normal leading-[0.84] tracking-[-0.065em] text-ink">
            Learn it. Build it.
            <br />
            <em className="font-normal text-orange">Document it.</em>
          </h1>

          <p className="ml-auto mt-11 max-w-[650px] text-[clamp(1.125rem,2.2vw,1.55rem)] leading-[1.55] text-muted">
            A field journal for practical cloud architecture, network
            engineering, and the labs that turn theory into working systems.
          </p>

          <div className="mt-14 flex flex-wrap gap-2.5">
            {topics.slice(0, 3).map((topic) => (
              <span
                key={topic.number}
                className="border border-ink px-3 py-2 font-mono text-[11px] uppercase tracking-[0.07em]"
              >
                {topic.title}
              </span>
            ))}
          </div>
        </section>

        <section className="grid items-center gap-10 py-20 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.13em] text-blue">
              Current status
            </p>
            <h2 className="mt-5 max-w-lg font-display text-[clamp(2.4rem,5vw,3.65rem)] font-normal leading-none tracking-[-0.045em]">
              The first packet arrived.
            </h2>
            <p className="mt-6 max-w-md leading-7 text-muted">
              The site structure is live in source control. Next comes the
              delivery system that validates, packages, and deploys every
              change.
            </p>
          </div>

          <div className="grid gap-6 bg-ink p-8 font-mono text-sm text-[#dce7ed] [box-shadow:12px_12px_0_#f06424]">
            <code>$ npm run build</code>
            <code className="text-[#70d6a8]">
              200 OK — static export generated
            </code>
          </div>
        </section>

        <section id="topics" className="border-t border-ink/20 py-20">
          <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.13em] text-blue">
                02 &nbsp; Topics
              </p>
              <h2 className="mt-5 font-display text-5xl font-normal leading-none tracking-[-0.045em]">
                Working systems,
                <br />
                carefully recorded.
              </h2>
            </div>

            <div className="border-t border-ink/20">
              {topics.map((topic) => (
                <article
                  key={topic.number}
                  className="grid gap-4 border-b border-ink/20 py-7 sm:grid-cols-[3rem_1fr]"
                >
                  <span className="font-mono text-xs font-bold text-orange">
                    {topic.number}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl">{topic.title}</h3>
                    <p className="mt-2 max-w-2xl leading-7 text-muted">
                      {topic.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="articles" className="border-t border-ink/20 py-20">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.13em] text-blue">
                03 &nbsp; Field notes
              </p>
              <h2 className="mt-5 font-display text-5xl font-normal leading-none tracking-[-0.045em]">
                Latest from the build.
              </h2>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.09em] text-muted">
              One system at a time
            </p>
          </div>

          <div className="mt-12 border-y border-ink/20">
            {featuredArticles.map((article) => (
              <article
                key={article.href}
                className="grid gap-8 py-10 md:grid-cols-[0.55fr_1.45fr]"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.09em]">
                  <p className="font-bold text-blue">{article.number}</p>
                  <p className="mt-2 text-muted">{article.category}</p>
                  <p className="mt-2 text-orange">{article.status}</p>
                </div>

                <div>
                  <h3 className="max-w-2xl font-display text-4xl leading-none tracking-[-0.035em]">
                    {article.title}
                  </h3>
                  <p className="mt-5 max-w-2xl leading-7 text-muted">
                    {article.description}
                  </p>
                  <Link
                    href={article.href}
                    className="mt-7 inline-flex border-b border-ink pb-1 font-mono text-xs font-bold uppercase tracking-[0.08em] hover:border-orange hover:text-orange"
                  >
                    Read field note &nbsp;→
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
