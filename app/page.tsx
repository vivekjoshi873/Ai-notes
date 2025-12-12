import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  Tag,
  Wand2,
} from "lucide-react";

export const metadata = {
  title: "AI Notes – Capture, Organize, Summarize",
  description:
    "A modern AI-powered notepad for fast note-taking and instant summaries.",
};

const features = [
  {
    title: "AI summaries in one tap",
    description:
      "Send any note to Groq-powered AI and get a concise, 2-4 sentence summary instantly.",
    icon: Sparkles,
  },
  {
    title: "Organize with tags",
    description:
      "Tag, search, and filter notes without breaking your flow. Everything stays in sync.",
    icon: Tag,
  },
  {
    title: "Focus-ready editor",
    description:
      "Distraction-free writing with markdown preview, autosave, and keyboard-friendly UI.",
    icon: NotebookPen,
  },
  {
    title: "Your data stays yours",
    description:
      "Keys live on the server. Notes are local to your browser unless you export them.",
    icon: ShieldCheck,
  },
];

const steps = [
  "Create a note or paste existing text.",
  "Add tags so you can filter later.",
  "Click “Summarize with AI” to get the key points.",
  "Keep writing—everything auto-saves.",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-2 shadow-lg shadow-purple-500/30">
              <Wand2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-slate-300">
                AI Notes
              </p>
              <p className="text-sm text-slate-400">
                Capture. Organize. Summarize.
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
            <Link href="#features" className="hover:text-white">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-white">
              How it works
            </Link>
            <Link href="#cta" className="hover:text-white">
              Get started
            </Link>
          </nav>
          <Link
            href="/notepad"
            className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:shadow-purple-500/50 sm:gap-2 sm:px-4 sm:text-sm"
          >
            Open the app
            <ArrowRight className="hidden h-4 w-4 transition-transform sm:inline-block group-hover:translate-x-1" />
          </Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent_45%),_radial-gradient(circle_at_center,_rgba(56,189,248,0.15),_transparent_35%)]" />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 shadow-inner shadow-white/10">
                Built on Groq • Lightning-fast AI summaries
              </p>
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Your fastest way to get from messy notes to clear takeaways.
              </h1>
              <p className="text-lg text-slate-200/80 sm:text-xl">
                Write freely, tag instantly, and let AI deliver crisp summaries
                whenever you need them. No setup headaches—just add your Groq
                key on the server and start creating.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/notepad"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:shadow-purple-500/50"
                >
                  Start writing
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-base font-semibold text-slate-100 hover:border-white/30 hover:text-white"
                >
                  See features
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  No accounts required
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-indigo-300" />
                  Autosave enabled
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-blue-500/10 to-cyan-400/10 blur-3xl" />
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-purple-500/20 backdrop-blur">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-slate-300">
                      AI Notepad
                    </p>
                    <p className="text-xl font-semibold text-white">
                      Live preview
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Instant AI
                  </div>
                </div>
                <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="rounded-lg border border-white/5 bg-slate-900/70 p-4">
                    <p className="text-sm text-slate-200">Today&apos;s ideas</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      Meeting prep: launch checklist
                    </p>
                    <p className="mt-3 text-sm text-slate-300">
                      – Define success metrics
                      <br />
                      – Assign owners for QA, docs, launch comms
                      <br />– Risk review: API limits, onboarding friction
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-gradient-to-r from-purple-600/30 to-blue-600/30 p-4">
                    <p className="text-sm font-semibold text-white">
                      AI Summary
                    </p>
                    <p className="mt-2 text-sm text-slate-100">
                      Clear launch checklist with metrics, owners for QA/docs
                      comms, and risks to monitor around API limits and
                      onboarding.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                      Keys stay on server
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                      <NotebookPen className="h-3.5 w-3.5 text-blue-200" />
                      Markdown-friendly
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                      <Tag className="h-3.5 w-3.5 text-purple-200" />
                      Tag & filter fast
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-t border-white/5 bg-slate-950/40"
        >
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-purple-200">
                Features
              </p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Built for writers who move fast
              </h2>
              <p className="max-w-3xl text-lg text-slate-200/80">
                Everything you need to capture ideas, keep them organized, and
                turn them into action—backed by lightning-fast AI summaries
                powered by Groq.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {features.map(({ title, description, icon: Icon }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-purple-500/10 transition hover:-translate-y-1 hover:border-white/20 hover:shadow-purple-500/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-3 text-purple-200">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-3 text-slate-200/80">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-t border-white/5 bg-slate-900/50"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-purple-200">
                How it works
              </p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                From draft to AI summary in under a minute.
              </h2>
              <p className="text-lg text-slate-200/80">
                Minimal setup: your Groq key lives on the server; everything
                else runs in the browser. Summaries stay snappy and your notes
                stay private.
              </p>
            </div>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/30"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-purple-500 to-blue-500 text-lg font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="flex-1 text-slate-100">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-slate-950/50" id="cta">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-600/40 via-blue-600/30 to-cyan-500/30 p-10 shadow-2xl shadow-purple-500/30">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
                    Ready to write?
                  </p>
                  <h3 className="text-3xl font-bold text-white sm:text-4xl">
                    Open the AI Notepad and start capturing ideas now.
                  </h3>
                  <p className="text-lg text-slate-100/80">
                    Create notes, add tags, and generate summaries in seconds.
                    Zero learning curve.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/notepad"
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-white/30 transition hover:-translate-y-0.5 hover:shadow-white/50"
                  >
                    Launch AI Notepad
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="text-center text-sm text-white/80">
                    <CheckCircle2 className="mr-2 inline h-4 w-4 text-emerald-300" />
                    Works on desktop & mobile • Autosave always on
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
