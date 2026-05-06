const features = [
  {
    title: "KI-Updates bündeln",
    description:
      "TrendPilot AI sammelt relevante Produkt-Launches, Modell-Updates und Tool-Neuheiten an einem Ort.",
  },
  {
    title: "Relevanz bewerten",
    description:
      "Jedes Signal wird nach Tempo, Marktpotenzial und strategischer Bedeutung priorisiert.",
  },
  {
    title: "Schneller entscheiden",
    description:
      "Teams erkennen schneller, welche KI-Entwicklungen echte Chancen schaffen und welche warten können.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0F14] text-white">
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(164,196,0,0.18),transparent_34%),linear-gradient(180deg,#0B0F14_0%,#101722_55%,#0B0F14_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#A4C400]/50 to-transparent" />

        <div className="mx-auto flex w-full max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3" aria-label="TrendPilot AI home">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#A4C400]/35 bg-[#A4C400]/10 text-sm font-black text-[#A4C400] shadow-[0_0_40px_rgba(164,196,0,0.12)]">
                TP
              </span>
              <span className="text-sm font-semibold tracking-wide">TrendPilot AI</span>
            </a>
            <a
              href="#features"
              className="hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-[#AEB7C2] transition hover:border-[#A4C400]/50 hover:text-white sm:inline-flex"
            >
              Dashboard
            </a>
          </header>

          <div className="grid items-center gap-12 pb-12 pt-16 sm:pb-14 sm:pt-18 lg:grid-cols-[1.05fr_0.95fr] lg:pb-16 lg:pt-20">
            <div className="max-w-3xl">
              <p className="mb-6 inline-flex rounded-full border border-[#A4C400]/25 bg-[#A4C400]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#A4C400]">
                KI-Trendradar für Wachstums- und Innovationsteams
              </p>
              <h1 className="text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
                Erkenne KI-Trends, bevor sie zum Wettbewerbsvorteil werden.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#AEB7C2] sm:text-xl">
                TrendPilot AI sammelt, bewertet und priorisiert KI-Updates, Tools und Marktsignale, damit Teams schneller entscheiden können, was wirklich relevant ist.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#AEB7C2]/85">
                Für Marketing-, Produkt- und Innovationsteams, die KI-Entwicklungen frühzeitig einordnen wollen.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/dashboard"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#A4C400] px-7 text-sm font-bold text-[#0B0F14] shadow-[0_18px_45px_rgba(164,196,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#b4d600]"
                >
                  Dashboard ansehen
                </a>
                <a
                  href="mailto:hello@trendpilot.ai?subject=Early%20Access%20Request"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#A4C400]/55 hover:bg-[#A4C400]/10"
                >
                  Early Access sichern
                </a>
              </div>

              <div className="mt-6 flex flex-col gap-3 text-sm text-[#AEB7C2] sm:flex-row sm:flex-wrap sm:items-center">
                {[
                  "KI-Updates bündeln",
                  "Relevanz automatisch bewerten",
                  "Strategische Entscheidungen beschleunigen",
                ].map((benefit) => (
                  <span key={benefit} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A4C400]" />
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-5 rounded-[2rem] bg-[#A4C400]/8 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-[#121826]/90 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur">
                <div className="rounded-[1.4rem] border border-white/8 bg-[#0B0F14] p-5">
                  <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-white/8 pb-4 text-xs text-[#AEB7C2]">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#A4C400]/25 bg-[#A4C400]/10 px-3 py-1 font-semibold text-[#A4C400]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#A4C400]" />
                      Live Radar
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1">
                      12 neue Signale
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1">
                      Heute aktualisiert
                    </span>
                  </div>

                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[#AEB7C2]/60">
                        TrendPilot AI Dashboard
                      </p>
                      <h2 className="mt-1 text-xl font-semibold">TrendPilot AI Pulse</h2>
                    </div>
                    <span className="rounded-full border border-[#A4C400]/30 bg-[#A4C400]/10 px-3 py-1 text-xs font-bold text-[#A4C400]">
                      Score 94
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      ["Agentic Workflows", "Starkes Momentum", "94%"],
                      ["Synthetic Research", "Wachsendes Signal", "87%"],
                      ["KI-Compliance Ops", "Hohe Relevanz", "81%"],
                    ].map(([name, status, score]) => (
                      <div
                        key={name}
                        className="rounded-2xl border border-white/8 bg-white/[0.035] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.18)] transition hover:border-[#A4C400]/35 hover:bg-white/[0.055]"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-white">{name}</p>
                            <p className="mt-1 text-sm text-[#AEB7C2]">{status}</p>
                          </div>
                          <span className="rounded-full border border-[#A4C400]/25 bg-[#A4C400]/10 px-3 py-1 text-sm font-bold text-[#A4C400]">
                            {score}
                          </span>
                        </div>
                        <div className="mt-4 h-2 rounded-full bg-white/8">
                          <div
                            className="h-full rounded-full bg-[linear-gradient(90deg,#A4C400,#d8ef49)]"
                            style={{ width: score }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-[#A4C400]/20 bg-[#A4C400]/10 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-semibold text-white">Business Impact: Hoch</span>
                    <span className="text-[#AEB7C2]">Priorität: Beobachten</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-white/8 px-6 pb-20 pt-12 sm:px-8 sm:pt-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A4C400]">
              Plattform
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-5xl">
              Gemacht für Teams, die KI-Signale in klare Prioritäten verwandeln.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-2xl border border-white/8 bg-[#121826] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-[#A4C400]/35 hover:bg-[#151D2B]"
              >
                <div className="mb-6 h-1.5 w-12 rounded-full bg-[#A4C400] transition group-hover:w-16" />
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-4 leading-7 text-[#AEB7C2]">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
