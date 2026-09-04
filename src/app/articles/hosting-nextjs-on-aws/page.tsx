import type { Metadata } from "next";
import {
  ArticleLayout,
  ArticleNote,
  ArticleSection,
} from "@/components/article-layout";

export const metadata: Metadata = {
  title: "Hosting a Static Next.js Site on AWS",
  description:
    "A practical walkthrough of exporting a Next.js site and hosting it with Amazon S3 and CloudFront.",
};

const architecture = [
  {
    service: "Next.js",
    purpose: "Builds the application and exports deployable static files.",
  },
  {
    service: "Amazon S3",
    purpose: "Stores the generated HTML, CSS, JavaScript, and image files.",
  },
  {
    service: "Amazon CloudFront",
    purpose: "Delivers the site globally and provides its HTTPS entry point.",
  },
  {
    service: "AWS Certificate Manager",
    purpose: "Provides the TLS certificate used for the custom domain.",
  },
  {
    service: "Route 53",
    purpose: "Directs the site’s DNS name to the CloudFront distribution.",
  },
];

export default function HostingNextjsOnAwsPage() {
  return (
    <ArticleLayout
      category="AWS / DELIVERY"
      title="Hosting a Static Next.js Site on AWS"
      description="Follow the ByteTrove build from a local Next.js project to a statically exported site delivered through Amazon S3 and CloudFront."
      readingTime="8 minute read"
    >
      <ArticleSection id="goal" title="What we are building">
        <p>
          ByteTrove is a statically exported Next.js application. The finished
          build does not require a continuously running Node.js server because
          Next.js generates the deployable website files ahead of time.
        </p>
        <p>
          This keeps the hosting architecture small, inexpensive, and
          appropriate for documentation and articles that do not require
          server-side processing on every request.
        </p>
      </ArticleSection>

      <ArticleSection id="architecture" title="Architecture">
        <div className="border-t border-ink/20">
          {architecture.map((item, index) => (
            <div
              key={item.service}
              className="grid gap-3 border-b border-ink/20 py-5 sm:grid-cols-[3rem_1fr]"
            >
              <div className="font-mono text-xs font-bold text-orange">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-display text-2xl text-ink">
                  {item.service}
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted">
                  {item.purpose}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ArticleSection>

      <ArticleSection id="static-export" title="Why use static export?">
        <p>
          The Next.js configuration uses{" "}
          <code className="bg-ink px-2 py-1 font-mono text-sm text-paper">
            output: &quot;export&quot;
          </code>
          . Running the production build then creates an{" "}
          <code className="bg-ink px-2 py-1 font-mono text-sm text-paper">
            out/
          </code>{" "}
          directory.
        </p>
        <p>
          That directory is the deployment artifact. S3 needs the generated
          files from <code className="font-mono text-blue">out/</code>, not the
          TypeScript source, Git history, or{" "}
          <code className="font-mono text-blue">node_modules</code>.
        </p>
        <ArticleNote>
          <strong>Important:</strong> The generated{" "}
          <code className="font-mono">out/</code> directory is intentionally
          ignored by Git. CI rebuilds the artifact from the versioned source
          during every validated delivery.
        </ArticleNote>
      </ArticleSection>

      <ArticleSection id="progress" title="Current build progress">
        <ol className="space-y-3 font-mono text-sm">
          <li>01 — Next.js project and GitHub repository established.</li>
          <li>02 — Static export enabled and locally validated.</li>
          <li>03 — ByteTrove homepage and article structure built.</li>
          <li>04 — CI will independently lint, build, and package the site.</li>
          <li>05 — The validated artifact will be uploaded to Amazon S3.</li>
          <li>06 — GitHub Actions and AWS OIDC will automate deployment.</li>
          <li>07 — The AWS foundation will be represented with Terraform.</li>
        </ol>
      </ArticleSection>

      <ArticleSection id="rollback" title="Protecting the rollback point">
        <p>
          The existing working S3 index page remains in place while development
          and validation continue. Production files will only be replaced after
          the generated export has been tested independently.
        </p>
        <p>
          Before the first deployment, the current S3 objects will be preserved
          as a recoverable version. This makes the deployment a controlled
          change instead of an irreversible replacement.
        </p>
      </ArticleSection>
    </ArticleLayout>
  );
}
