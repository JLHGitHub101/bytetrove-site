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
      category="AWS"
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
          This approach keeps the hosting architecture small, inexpensive, and
          appropriate for documentation, articles, and other content that does
          not require server-side processing on every request.
        </p>
      </ArticleSection>

      <ArticleSection id="architecture" title="Architecture">
        <div className="grid gap-4">
          {architecture.map((item, index) => (
            <div
              key={item.service}
              className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900 p-5 sm:grid-cols-[3rem_1fr]"
            >
              <div className="font-mono text-cyan-400">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-semibold text-white">{item.service}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
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
          <code className="rounded bg-slate-800 px-2 py-1 font-mono text-sm text-cyan-300">
            output: &quot;export&quot;
          </code>
          . Running the production build then creates an{" "}
          <code className="rounded bg-slate-800 px-2 py-1 font-mono text-sm text-cyan-300">
            out/
          </code>{" "}
          directory.
        </p>

        <p>
          That directory is the deployment artifact. S3 needs the generated
          files from <code className="font-mono text-cyan-300">out/</code>, not
          the TypeScript source code, Git history, or{" "}
          <code className="font-mono text-cyan-300">node_modules</code>.
        </p>

        <ArticleNote>
          <strong className="text-cyan-300">Important:</strong> The generated{" "}
          <code className="font-mono">out/</code> directory is intentionally
          ignored by Git. GitHub stores the source needed to reproduce the
          build, while the deployment process generates the artifact.
        </ArticleNote>
      </ArticleSection>

      <ArticleSection id="progress" title="Current build progress">
        <ol className="space-y-3">
          <li>1. The Next.js project and GitHub repository are established.</li>
          <li>2. Static export is enabled and locally validated.</li>
          <li>3. The ByteTrove homepage and article structure are being built.</li>
          <li>4. The exported site will be tested using a local static server.</li>
          <li>5. The validated files will be uploaded manually to Amazon S3.</li>
          <li>6. GitHub Actions and AWS OIDC will automate deployment.</li>
          <li>7. The AWS foundation will be represented with Terraform.</li>
        </ol>
      </ArticleSection>

      <ArticleSection id="rollback" title="Protecting the rollback point">
        <p>
          The existing working S3 index page remains in place while development
          and local validation continue. Production files will only be replaced
          after the generated export has been tested independently.
        </p>

        <p>
          Before the first deployment, the current S3 objects will be preserved
          as a recoverable version. This makes the initial website deployment a
          controlled change instead of an irreversible replacement.
        </p>
      </ArticleSection>
    </ArticleLayout>
  );
}