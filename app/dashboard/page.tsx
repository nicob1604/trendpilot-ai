"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { Trend } from "./data";

const filters = ["Alle", "Hohe Relevanz", "Neu", "Beobachten"];

const allSourcesFilter = "all-sources";
const rssSourceFilter = "signal:RSS";
const youtubeSourceFilter = "signal:YouTube";

const sortOptions = [
  { label: "Score absteigend", value: "score-desc" },
  { label: "Score aufsteigend", value: "score-asc" },
  { label: "Name A-Z", value: "name-asc" },
];

type TrendsApiResponse = {
  source?: unknown;
  updatedAt?: unknown;
  count?: unknown;
  trends?: unknown;
};

function ScoreBadge({ score }: { score: number }) {
  return (
    <span className="inline-flex w-fit shrink-0 items-center justify-center self-start rounded-full border border-[#A4C400]/30 bg-[#A4C400]/10 px-3 py-1 text-sm font-bold leading-none text-[#A4C400]">
      {score}%
    </span>
  );
}

function formatDataSource(source: string | null) {
  if (source === "mock") {
    return "Mock-Daten";
  }

  return source ?? "Wird geladen";
}

function formatLastUpdated(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function DashboardPage() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [dataSource, setDataSource] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [activeSourceFilter, setActiveSourceFilter] = useState(allSourcesFilter);
  const [sortOrder, setSortOrder] = useState("score-desc");
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);

  const stats = useMemo(() => {
    const highPriorityCount = trends.filter(
      (trend) => trend.status.trim() === "Hohe Relevanz" || trend.score >= 80,
    ).length;
    const watchCount = trends.filter(
      (trend) => trend.status.trim() === "Beobachten" || trend.score < 80,
    ).length;

    return [
      {
        label: "Neue Signale",
        value: String(trends.length),
        detail: "geladen",
      },
      {
        label: "Hohe Priorität",
        value: String(highPriorityCount),
        detail: "direkt prüfen",
      },
      {
        label: "Beobachten",
        value: String(watchCount),
        detail: "weiter im Radar",
      },
    ];
  }, [trends]);

  const sourceFilters = useMemo(() => {
    const signalTypes = new Set(
      trends.map((trend) => trend.signalType.trim()).filter(Boolean),
    );
    const sources = Array.from(
      new Set(trends.map((trend) => trend.source.trim()).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b));

    return [
      { label: "Alle Quellen", value: allSourcesFilter },
      ...(signalTypes.has("RSS") ? [{ label: "RSS", value: rssSourceFilter }] : []),
      ...(signalTypes.has("YouTube")
        ? [{ label: "YouTube", value: youtubeSourceFilter }]
        : []),
      ...sources.map((source) => ({
        label: source,
        value: `source:${source}`,
      })),
    ];
  }, [trends]);

  const loadTrends = useCallback(async () => {
    try {
      setIsLoading(true);
      setLoadError(false);

      const response = await fetch("/api/trends");

      if (!response.ok) {
        throw new Error("Failed to load trends");
      }

      const data = (await response.json()) as TrendsApiResponse;

      if (!Array.isArray(data.trends)) {
        throw new Error("Invalid trends response");
      }

      setTrends(data.trends as Trend[]);
      setDataSource(typeof data.source === "string" ? data.source : null);
      const apiUpdatedAt =
        typeof data.updatedAt === "string" ? new Date(data.updatedAt) : null;
      setLastUpdated(
        apiUpdatedAt && !Number.isNaN(apiUpdatedAt.getTime())
          ? apiUpdatedAt
          : new Date(),
      );
    } catch {
      setLoadError(true);
      setTrends([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrends();
  }, [loadTrends]);

  useEffect(() => {
    if (!selectedTrend) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedTrend(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTrend]);

  const filteredTrends = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const visibleTrends = trends.filter((trend) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        [
          trend.name,
          trend.category,
          trend.status,
          trend.businessImpact,
          trend.source,
          trend.signalType,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesFilter =
        activeFilter === "Alle" ||
        (activeFilter === "Hohe Relevanz" && trend.score >= 80) ||
        (activeFilter === "Neu" && trend.status === "Neu") ||
        (activeFilter === "Beobachten" && trend.status === "Beobachten");

      const matchesSourceFilter =
        activeSourceFilter === allSourcesFilter ||
        (activeSourceFilter === rssSourceFilter && trend.signalType === "RSS") ||
        (activeSourceFilter === youtubeSourceFilter &&
          trend.signalType === "YouTube") ||
        activeSourceFilter === `source:${trend.source}`;

      return matchesSearch && matchesFilter && matchesSourceFilter;
    });

    return [...visibleTrends].sort((a, b) => {
      if (sortOrder === "score-asc") {
        return a.score - b.score;
      }

      if (sortOrder === "name-asc") {
        return a.name.localeCompare(b.name);
      }

      return b.score - a.score;
    });
  }, [activeFilter, activeSourceFilter, searchQuery, sortOrder, trends]);

  return (
    <main className="min-h-screen bg-[#0B0F14] bg-[radial-gradient(circle_at_50%_0%,rgba(164,196,0,0.12),transparent_34%),linear-gradient(180deg,#0B0F14_0%,#101722_58%,#0B0F14_100%)] px-4 py-6 text-white sm:px-8 sm:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <a
          href="/"
          className="mb-6 inline-flex text-sm font-medium text-[#AEB7C2] transition hover:text-white"
        >
          ← Zur Startseite
        </a>

        <header className="flex flex-col gap-6 border-b border-white/8 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <a href="/" className="mb-6 inline-flex items-center gap-3 sm:mb-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#A4C400]/35 bg-[#A4C400]/10 text-sm font-black text-[#A4C400]">
                TP
              </span>
              <span className="text-sm font-semibold tracking-wide text-[#AEB7C2]">
                TrendPilot AI
              </span>
            </a>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A4C400]">
              Live Trend Radar
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-5xl">
              TrendPilot AI Dashboard
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#AEB7C2] sm:text-lg sm:leading-8">
              Priorisierte KI-Updates, Tools und Marktsignale für Teams, die schneller erkennen wollen, was jetzt relevant wird.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            <label htmlFor="trend-search" className="sr-only">
              Trends suchen
            </label>
            <input
              id="trend-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Trends, Kategorien oder Signale suchen..."
              className="h-12 w-full rounded-full border border-white/10 bg-[#0B0F14]/80 px-5 text-sm text-white caret-[#A4C400] outline-none transition placeholder:text-[#AEB7C2]/55 focus:border-[#A4C400] focus:bg-[#0B0F14] focus:ring-2 focus:ring-[#A4C400]/20 [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_#0B0F14_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#ffffff]"
            />
          </div>
        </header>

        <section className="grid gap-4 py-6 sm:py-8 md:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-white/8 bg-[#121826] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.22)]"
            >
              <p className="text-sm text-[#AEB7C2]">{stat.label}</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <p className="text-4xl font-semibold text-white">{stat.value}</p>
                <p className="text-sm text-[#A4C400]">{stat.detail}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/8 bg-[#121826]/70 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-[#AEB7C2]">
            <p>
              Datenquelle:{" "}
              <span className="font-semibold text-white">
                {formatDataSource(dataSource)}
              </span>
            </p>
            {lastUpdated ? (
              <p className="mt-1 text-xs text-[#AEB7C2]/70">
                Zuletzt aktualisiert: {formatLastUpdated(lastUpdated)} Uhr
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={loadTrends}
            disabled={isLoading}
            className="inline-flex min-h-10 w-full items-center justify-center rounded-full border border-[#A4C400]/30 bg-[#A4C400]/10 px-4 text-sm font-semibold text-[#A4C400] transition hover:border-[#A4C400]/55 hover:bg-[#A4C400]/15 focus:outline-none focus:ring-2 focus:ring-[#A4C400]/25 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isLoading ? "Aktualisieren..." : "Aktualisieren"}
          </button>
        </section>

        <section className="mb-6 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter
                  ? "border-[#A4C400]/35 bg-[#A4C400] text-[#0B0F14]"
                  : "border-white/10 bg-white/[0.035] text-[#AEB7C2] hover:border-[#A4C400]/45 hover:text-white"
              }`}
              type="button"
            >
              {filter}
            </button>
          ))}
        </section>

        <section className="mb-6 rounded-2xl border border-white/8 bg-[#121826]/60 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#AEB7C2]/70">
            Quellen
          </p>
          <div className="flex flex-wrap gap-2">
            {sourceFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveSourceFilter(filter.value)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  activeSourceFilter === filter.value
                    ? "border-[#A4C400]/35 bg-[#A4C400] text-[#0B0F14]"
                    : "border-white/10 bg-white/[0.035] text-[#AEB7C2] hover:border-[#A4C400]/45 hover:text-white"
                }`}
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {!isLoading && !loadError ? (
          <section className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-[#AEB7C2]">
              {filteredTrends.length} Trends angezeigt
            </p>
            <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#AEB7C2]/70 sm:flex-row sm:items-center">
              Sortieren
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="h-10 w-full rounded-full border border-white/10 bg-[#0B0F14]/80 px-4 text-sm font-medium normal-case tracking-normal text-white outline-none transition focus:border-[#A4C400] focus:bg-[#0B0F14] focus:ring-2 focus:ring-[#A4C400]/20 sm:w-auto"
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-[#0B0F14] text-white"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </section>
        ) : null}

        {isLoading ? (
          <section className="rounded-2xl border border-white/8 bg-[#121826] p-8 text-center shadow-[0_18px_55px_rgba(0,0,0,0.24)]">
            <p className="text-sm font-medium text-[#AEB7C2]">
              Trends werden geladen...
            </p>
          </section>
        ) : loadError ? (
          <section className="rounded-2xl border border-white/8 bg-[#121826] p-8 text-center shadow-[0_18px_55px_rgba(0,0,0,0.24)]">
            <p className="text-sm font-medium text-[#AEB7C2]">
              Trends konnten nicht geladen werden.
            </p>
          </section>
        ) : filteredTrends.length > 0 ? (
          <section className="grid gap-4 lg:grid-cols-2">
            {filteredTrends.map((trend) => (
              <button
                key={trend.id}
                type="button"
                onClick={() => setSelectedTrend(trend)}
                className="group rounded-2xl border border-white/8 bg-[#121826] p-5 text-left shadow-[0_18px_55px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-[#A4C400]/35 hover:bg-[#151D2B] focus:outline-none focus:ring-2 focus:ring-[#A4C400]/50 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-[#AEB7C2]">
                        {trend.category}
                      </span>
                      <span className="rounded-full border border-[#A4C400]/25 bg-[#A4C400]/10 px-3 py-1 text-xs font-semibold text-[#A4C400]">
                        {trend.status}
                      </span>
                    </div>
                    <h2 className="mt-5 text-xl font-semibold text-white sm:text-2xl">
                      {trend.name}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#AEB7C2]">
                      {[
                        ["Quelle", trend.source],
                        ["Zeitraum", trend.timeframe],
                        ["Signaltyp", trend.signalType],
                      ].map(([label, value]) => (
                        <span
                          key={label}
                          className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.035] px-3 py-1.5 leading-none"
                        >
                          <span className="shrink-0 text-white/50">{label}</span>
                          <span className="min-w-0 truncate text-[#AEB7C2]">{value}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <ScoreBadge score={trend.score} />
                </div>

                <div className="mt-5 h-2 rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#A4C400,#d8ef49)]"
                    style={{ width: `${trend.score}%` }}
                  />
                </div>

                <div className="mt-6 rounded-2xl border border-white/8 bg-[#0B0F14]/65 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A4C400]">
                    Business Impact
                  </p>
                  <p className="mt-3 leading-7 text-[#AEB7C2]">
                    {trend.businessImpact}
                  </p>
                </div>
              </button>
            ))}
          </section>
        ) : (
          <section className="rounded-2xl border border-white/8 bg-[#121826] p-8 text-center shadow-[0_18px_55px_rgba(0,0,0,0.24)]">
            <p className="text-lg font-semibold text-white">
              Keine passenden Trends gefunden.
            </p>
            <p className="mt-2 text-sm text-[#AEB7C2]">
              Passe Suche oder Filter an, um weitere Signale zu sehen.
            </p>
          </section>
        )}
      </div>

      {selectedTrend ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-4 backdrop-blur-sm sm:px-5 sm:py-8"
          onClick={() => setSelectedTrend(null)}
        >
          <div
            className="max-h-[calc(100vh-2rem)] w-full max-w-3xl overflow-y-auto rounded-[1.5rem] border border-white/10 bg-[#121826] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:max-h-[calc(100vh-4rem)] sm:rounded-[2rem] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="rounded-[1.2rem] border border-white/8 bg-[#0B0F14]/80 p-4 sm:rounded-[1.4rem] sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-[#AEB7C2]">
                      {selectedTrend.category}
                    </span>
                    <span className="rounded-full border border-[#A4C400]/25 bg-[#A4C400]/10 px-3 py-1 text-xs font-semibold text-[#A4C400]">
                      {selectedTrend.status}
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold text-white sm:text-3xl">
                    {selectedTrend.name}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#AEB7C2]">
                    {[
                      ["Quelle", selectedTrend.source],
                      ["Zeitraum", selectedTrend.timeframe],
                      ["Signaltyp", selectedTrend.signalType],
                    ].map(([label, value]) => (
                      <span
                        key={label}
                        className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.035] px-3 py-1.5 leading-none"
                      >
                        <span className="shrink-0 text-white/50">{label}</span>
                        <span className="min-w-0 truncate text-[#AEB7C2]">{value}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <ScoreBadge score={selectedTrend.score} />
              </div>

              <div className="mt-6 h-2 rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#A4C400,#d8ef49)]"
                  style={{ width: `${selectedTrend.score}%` }}
                />
              </div>

              <div className="mt-6 grid gap-4">
                {[
                  ["Business Impact", selectedTrend.businessImpact],
                  ["Zusammenfassung", selectedTrend.summary],
                  ["Handlungsempfehlung", selectedTrend.recommendation],
                ].map(([label, text]) => (
                  <section
                    key={label}
                    className="rounded-2xl border border-white/8 bg-white/[0.035] p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A4C400]">
                      {label}
                    </p>
                    <p className="mt-3 leading-7 text-[#AEB7C2]">{text}</p>
                  </section>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSelectedTrend(null)}
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#A4C400] px-5 text-sm font-bold text-[#0B0F14] transition hover:bg-[#b4d600] sm:w-auto"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
