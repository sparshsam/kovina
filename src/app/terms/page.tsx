import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms — Kovina",
};

export default function TermsPage() {
  return (
    <main className="px-6 pt-28 sm:px-10 sm:pt-40">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-black sm:text-4xl">Terms of Use</h1>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-text-secondary sm:text-base">
          <p>
            Kovina tools are provided as free and open-source software. You are
            free to use, modify, and distribute them in accordance with their
            respective licenses.
          </p>
          <p>
            Each project is licensed under the GNU Affero General Public License
            (AGPL) unless otherwise noted. Source code is available on GitHub.
          </p>
          <p>
            No warranty is expressed or implied. The authors are not liable for
            any damages arising from the use of these tools.
          </p>
          <p>
            By using any Kovina tool, you accept these terms. For questions,
            contact{" "}
            <a
              href="mailto:sparshsam@gmail.com"
              className="text-accent hover:underline"
            >
              sparshsam@gmail.com
            </a>
            .
          </p>
          <p className="pt-6 text-xs text-text-muted">
            Last updated: June 2026
          </p>
        </div>
        <div className="mt-16 pb-20">
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center rounded-full bg-bg-surface-muted px-7 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:bg-[#252525]"
          >
            &larr; Back to Kovina
          </a>
        </div>
      </div>
    </main>
  );
}
