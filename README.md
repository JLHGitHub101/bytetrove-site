# ByteTrove

ByteTrove is a field journal for practical AWS architecture, network engineering, infrastructure as code, and homelab work. It is a statically exported Next.js site delivered from Amazon S3 through Amazon CloudFront.

- Production site: [labs.aws.bytetrove.xyz](https://labs.aws.bytetrove.xyz)
- Framework: Next.js App Router with TypeScript and Tailwind CSS
- Delivery: GitHub Actions to AWS using OpenID Connect (OIDC)
- Hosting region: `us-west-2`

## How the site is organized

```text
src/
├── app/
│   ├── articles/
│   │   └── hosting-nextjs-on-aws/
│   │       └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── article-layout.tsx
    ├── site-footer.tsx
    └── site-header.tsx
```

Each article is a Next.js route under `src/app/articles/`. The directory name becomes the URL slug:

| Source file | Published URL |
|---|---|
| `src/app/articles/hosting-nextjs-on-aws/page.tsx` | `/articles/hosting-nextjs-on-aws/` |
| `src/app/articles/my-new-finding/page.tsx` | `/articles/my-new-finding/` |

The static-export settings in `next.config.ts` generate one `index.html` per route. For example, the second route above becomes `out/articles/my-new-finding/index.html`.

## Creating an article

### 1. Create a branch

Start from an up-to-date `main` branch:

```powershell
git switch main
git pull --ff-only origin main
git switch -c article/short-description
```

Use a short, lowercase, hyphen-separated slug. The slug should describe the finding, not the date it was written.

### 2. Create the route

Create a directory and `page.tsx` beneath `src/app/articles/`:

```powershell
New-Item -ItemType Directory `
    -Path .\src\app\articles\my-new-finding `
    -Force

New-Item -ItemType File `
    -Path .\src\app\articles\my-new-finding\page.tsx
```

The easiest starting point is to copy the existing article and then replace its content:

```powershell
Copy-Item `
    .\src\app\articles\hosting-nextjs-on-aws\page.tsx `
    .\src\app\articles\my-new-finding\page.tsx
```

### 3. Use the article template

Every article supplies page metadata and uses the shared components from `src/components/article-layout.tsx`:

```tsx
import type { Metadata } from "next";
import {
  ArticleLayout,
  ArticleNote,
  ArticleSection,
} from "@/components/article-layout";

export const metadata: Metadata = {
  title: "My Article Title",
  description: "A concise summary for browsers and search results.",
};

export default function MyArticlePage() {
  return (
    <ArticleLayout
      category="AWS / DELIVERY"
      title="My Article Title"
      description="What was investigated, built, or learned."
      readingTime="6 minute read"
    >
      <ArticleSection id="problem" title="The problem">
        <p>Describe the situation and why it mattered.</p>
      </ArticleSection>

      <ArticleSection id="finding" title="What I found">
        <p>Record the evidence, commands, behavior, and conclusion.</p>
        <ArticleNote>
          <strong>Key point:</strong> Capture the detail you will want later.
        </ArticleNote>
      </ArticleSection>

      <ArticleSection id="result" title="The result">
        <p>Explain what changed and how the result was verified.</p>
      </ArticleSection>
    </ArticleLayout>
  );
}
```

The shared components have distinct jobs:

| Component | Purpose |
|---|---|
| `ArticleLayout` | Creates the breadcrumb, article heading, category, description, and reading time. |
| `ArticleSection` | Creates a titled, linkable section. Its `id` must be unique within the page. |
| `ArticleNote` | Highlights an important warning, conclusion, or operational note. |

The current `ArticleLayout` displays `Build in progress` on every article. That label is defined once in `src/components/article-layout.tsx`; it is not currently an article-level property.

### 4. Add the article to the homepage

Creating the route makes the article build and deploy, but it does not automatically add a homepage card. Add an object to the `featuredArticles` array in `src/app/page.tsx`:

```tsx
{
  category: "AWS / DELIVERY",
  number: "FIELD NOTE 002",
  title: "My Article Title",
  description: "A short reason someone should read this field note.",
  href: "/articles/my-new-finding/",
  status: "BUILD IN PROGRESS",
},
```

Keep the `href` synchronized with the directory name and include both the leading and trailing slash.

### 5. Validate locally

```powershell
npm run lint
npm run build
Test-Path .\out\articles\my-new-finding\index.html
```

The final command must return `True`. To review the page interactively, run `npm run dev` and open `http://localhost:3000/articles/my-new-finding/`.

Do not commit `out/`; it is generated and intentionally excluded by `.gitignore`.

### 6. Open and merge a pull request

```powershell
git add src/app/articles/my-new-finding/page.tsx src/app/page.tsx
git commit -m "Add field note about my new finding"
git push -u origin article/short-description
gh pr create --base main --fill
```

The pull request CI job installs the locked dependencies, runs ESLint, builds the complete static export, and archives the build artifact. Merge only after the required `Lint and build static site` check passes.

Merging to `main` starts the production deployment automatically. The deployment rebuilds the site, uploads it to S3, invalidates CloudFront, and verifies every exported page. Page verification is dynamic: each `out/**/index.html` is converted to its public URL, requested through CloudFront, and compared byte-for-byte with the build artifact. A newly added article is therefore included without editing the deployment workflow.

## GitHub configuration so far

| Area | Configuration | Why it exists |
|---|---|---|
| Repository | Public repository `JLHGitHub101/bytetrove-site`; default branch `main` | Stores the site and provides an auditable change history. |
| Branch protection | Pull requests and the required `Lint and build static site` check protect `main`; force pushes and deletion are blocked | Prevents unvalidated changes from becoming deployable production source. |
| CI | `.github/workflows/ci.yml` runs for pull requests to `main` and can also be started manually | Independently lints and builds proposed changes before merge. |
| Production environment | GitHub environment named `production`, limited to protected branches | Adds a deployment boundary and forms part of the AWS trust identity. |
| OIDC verification | `.github/workflows/aws-oidc.yml` manually tests the AWS identity exchange | Separates authentication troubleshooting from a real deployment. |
| Continuous deployment | `.github/workflows/deploy.yml` runs on pushes to `main` and by manual dispatch | Makes an accepted merge the production release event while retaining a recovery trigger. |
| Workflow permissions | `contents: read` and, for AWS workflows, `id-token: write` | Gives workflows only the GitHub permissions they require. |
| Concurrency | Production deployments use one non-cancelling concurrency group | Prevents two releases from writing to the production bucket simultaneously. |
| Artifacts | PR exports are retained for 7 days; production exports for 30 days | Preserves the exact generated output for inspection and recovery. |

No long-lived AWS access key is stored in GitHub. GitHub Actions requests a short-lived OIDC token for each eligible workflow run.

## AWS configuration so far

| Service | Configuration | Why it exists |
|---|---|---|
| Amazon S3 | A dedicated private bucket in `us-west-2` stores the generated `out/` files; versioning and server-side encryption are enabled | Provides durable static object storage and recoverable object versions. |
| Amazon CloudFront | A distribution serves the private S3 REST origin | Provides the public HTTPS edge, caching, and controlled access to S3. |
| CloudFront Function | `ByteTroveDirectoryIndexRewrite` is associated with the default behavior on viewer request | Rewrites clean routes such as `/articles/example/` to `/articles/example/index.html`, which an S3 REST origin does not do automatically. |
| Custom domain | `labs.aws.bytetrove.xyz` points to the CloudFront distribution | Gives the site a stable, readable address. |
| AWS Certificate Manager | A TLS certificate is attached to CloudFront for the custom domain | Enables trusted HTTPS. |
| Route 53 | DNS routes `labs.aws.bytetrove.xyz` to CloudFront | Connects the custom hostname to the distribution. |
| IAM OIDC provider | `token.actions.githubusercontent.com` trusts the audience `sts.amazonaws.com` | Allows AWS to validate GitHub-issued workflow identity tokens. |
| IAM deployment role | A dedicated role trusts only this repository's immutable identity in the `production` environment | Acts as the pipeline service identity without a stored password or access key. |
| IAM deployment policy | A least-privilege policy allows bucket inspection, S3 object publish/delete, and invalidation of only the production distribution | Gives the pipeline the minimum deployment permissions it currently needs. |

The role trust uses GitHub's immutable repository subject rather than only the repository name. Its shape is:

```text
repo:OWNER@OWNER_ID/REPOSITORY@REPOSITORY_ID:environment:production
```

Exact deployment resource identifiers are configuration values in `.github/workflows/deploy.yml`; they are not repeated in this overview.

The deployment publishes `_next/static/` with a one-year immutable cache policy because those filenames are content-hashed. HTML and other site files use `max-age=0,must-revalidate`, after which the workflow creates and waits for a CloudFront invalidation.

## Delivery flow

1. Create an article on a feature branch.
2. Open a pull request to `main`.
3. GitHub Actions lints and statically exports the site.
4. Branch protection permits the merge after the required check passes.
5. The merge pushes a commit to `main` and starts the production workflow.
6. GitHub OIDC exchanges the workflow identity for temporary AWS role credentials.
7. The workflow uploads `out/` to S3 and invalidates CloudFront.
8. The workflow verifies every exported page through the production domain.

## Useful commands

Run these from the repository root—the directory containing `package.json`:

```powershell
npm ci          # Install exactly what package-lock.json specifies
npm run dev     # Start the local development server
npm run lint    # Run ESLint
npm run build   # Create the static export in out/
git status      # Review local source changes
gh run list     # Review recent GitHub Actions runs
```

## Next infrastructure milestone

The running AWS foundation was created and validated before automation. The next milestone is to represent the existing resources in Terraform through a deliberate import process. Terraform must manage the infrastructure configuration—not the generated site objects inside the deployment bucket.
