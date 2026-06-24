import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — Kovina",
};

export default function PrivacyPage() {
  return (
    <main className="px-6 pt-28 sm:px-10 sm:pt-40">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-black sm:text-4xl">Privacy</h1>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-text-secondary sm:text-base">
          <p>
            Kovina tools are designed to respect your privacy. We collect as
            little data as possible, and we never sell or share personal
            information.
          </p>
          <p>
            Most Kovina applications run entirely on your device. When data is
            processed remotely, it is encrypted and anonymised where possible.
          </p>
          <p>
            If you have questions about how a specific tool handles your data,
            refer to that project&apos;s documentation or source code.
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
