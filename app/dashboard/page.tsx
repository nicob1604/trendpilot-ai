"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { Trend } from "./data";

const filters = ["Alle", "Hohe Relevanz", "Neu", "Beobachten"];

const defaultStatusFilter = "Alle";
const allSourcesFilter = "all-sources";
const rssSourceFilter = "signal:RSS";
const youtubeSourceFilter = "signal:YouTube";
const defaultSortOrder = "score-desc";

const sortOptions = [
  { label: "Score absteigend", value: "score-desc" },
  { label: "Score aufsteigend", value: "score-asc" },
  { label: "Name A-Z", value: "name-asc" },
  { label: "Datum neueste zuerst", value: "date-desc" },
  { label: "Datum älteste zuerst", value: "date-asc" },
];

type TrendsApiResponse = {
  source?: unknown;
  updatedAt?: unknown;
  count?: unknown;
  trends?: unknown;
};

function toText(value: unknown, fallback = "") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function ScoreBadge({ score }: { score: number }) {
  const safeScore = Number.isFinite(Number(score)) ? Number(score) : 0;

  return (
    <span className="inline-flex w-fit shrink-0 items-center justify-center self-start rounded-full border border-[#A4C400]/30 bg-[#A4C400]/10 px-3 py-1 text-sm font-bold leading-none text-[#A4C400]">
      {safeScore}%
    </span>
  );
}

function formatDataSource(source: string | null) {
  if (source === "mock") {
    return "Mock-Daten";
  }

  if (source === "google_sheets") {
    return "google sheets";
  }

  return source ?? "Wird geladen";
}

function formatLastUpdated(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatTrendDate(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function isTechnicalTimeframe(value: string | undefined) {
  const normalized = toText(value).toLowerCase();

  return [
    "",
    "youtube upload",
    "rss update",
    "rss feed",
    "rss",
    "unbekannt",
    "unknown",
  ].includes(normalized);
}

function getTrendTimeframe(trend: Trend) {
  const publishedAt = formatTrendDate(trend.publishedAt);

  if (publishedAt) {
    return publishedAt;
  }

  const timeframeAsDate = formatTrendDate(trend.timeframe);

  if (timeframeAsDate) {
    return timeframeAsDate;
  }

  if (!isTechnicalTimeframe(trend.timeframe)) {
    return toText(trend.timeframe);
  }

  return "Datum nicht hinterlegt";
}

function getTrendDateTimestamp(trend: Trend) {
  const publishedAtDate = new Date(trend.publishedAt || "");
  const timeframeDate = new Date(trend.timeframe || "");

  if (!Number.isNaN(publishedAtDate.getTime())) {
    return publishedAtDate.getTime();
  }

  if (!Number.isNaN(timeframeDate.getTime())) {
    return timeframeDate.getTime();
  }

  return 0;
}

function normalizeSearchText(value: unknown) {
  return String(value ?? "")
    .toLocaleLowerCase("de-DE")
    .replace(/\s+/g, " ")
    .trim();
}

function getSearchTerms(query: string) {
  return normalizeSearchText(query).split(/\s+/).filter(Boolean);
}

function getTrendSearchText(trend: Trend) {
  return normalizeSearchText(
    [
      trend.name,
      trend.category,
      trend.status,
      trend.source,
      trend.signalType,
      trend.summary,
      trend.businessImpact,
      trend.recommendation,
      trend.articleTitle,
      trend.articleSummary,
      trend.articleBody,
      trend.sourceName,
      trend.sourceUrl,
      trend.publishedAt,
      trend.timeframe,
    ].join(" "),
  );
}

function getTrendTitle(trend: Trend) {
  return toText(trend.articleTitle, trend.name);
}

function getTrendSource(trend: Trend) {
  return toText(trend.sourceName, trend.source || "Unbekannte Quelle");
}

function getTrendArticleUrl(trend: Trend) {
  return `/trends/${encodeURIComponent(trend.id)}`;
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.035] px-3 py-1.5 text-xs leading-none text-[#AEB7C2]">
      <span className="shrink-0 text-white/50">{label}</span>
      <span className="min-w-0 truncate">{value}</span>
    </span>
  );
}

function TrendCard({
  trend,
  onOpen,
}: {
  trend: Trend;
  onOpen: (trend: Trend) => void;
}) {
  const score = Number.isFinite(Number(trend.score)) ? Number(trend.score) : 0;
  const articleUrl = getTrendArticleUrl(trend);

  return (
    <article className="group rounded-[1.6rem] border border-white/8 bg-[#121826]/95 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.2)] transition hover:border-[#A4C400]/25 hover:bg-[#151D2C] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-[#AEB7C2]">
            {toText(trend.category, "AI News")}
          </span>
          <span className="rounded-full border border-[#A4C400]/25 bg-[#A4C400]/10 px-3 py-1 text-xs font-semibold text-[#A4C400]">
            {toText(trend.status, "Neu")}
          </span>
        </div>

        <ScoreBadge score={score} />
      </div>

      <button
        type="button"
        onClick={() => onOpen(trend)}
        className="mt-6 block w-full rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-[#A4C400]/45"
      >
        <h2 className="text-2xl font-semibold leading-tight tracking-normal text-white sm:text-3xl">
          {getTrendTitle(trend)}
        </h2>
      </button>

      <div className="mt-5 flex flex-wrap gap-2">
        <MetaPill label="Quelle" value={getTrendSource(trend)} />
        <MetaPill label="Zeitraum" value={getTrendTimeframe(trend)} />
        <MetaPill label="Signaltyp" value={toText(trend.signalType, "Signal")} />
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-[#A4C400]"
          style={{ width: `${Math.max(0, Math.min(100, score))}%` }}
        />
      </div>

      <section className="mt-6 rounded-2xl border border-white/8 bg-[#0B0F14]/55 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A4C400]">
          Business Impact
        </p>
        <p className="mt-3 leading-7 text-[#AEB7C2]">
          {toText(
            trend.businessImpact,
            "Für diesen Trend liegt noch keine Business-Einordnung vor.",
          )}
        </p>
      </section>

      <div className="mt-6 flex justify-end">
        <a
          href={articleUrl}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#A4C400]/30 bg-[#A4C400]/10 px-5 text-sm font-semibold text-[#A4C400] transition hover:border-[#A4C400]/55 hover:bg-[#A4C400]/15 focus:outline-none focus:ring-2 focus:ring-[#A4C400]/25"
        >
          Artikel lesen
        </a>
      </div>
    </article>
  );
}

function DetailModal({
  trend,
  onClose,
}: {
  trend: Trend;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-[#101722] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.5)] sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-[#AEB7C2]">
              {toText(trend.category, "AI News")}
            </span>
            <span className="rounded-full border border-[#A4C400]/25 bg-[#A4C400]/10 px-3 py-1 text-xs font-semibold text-[#A4C400]">
              {toText(trend.status, "Neu")}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg text-[#AEB7C2] transition hover:border-[#A4C400]/40 hover:text-white"
            aria-label="Modal schließen"
          >
            ×
          </button>
        </div>

        <h2 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-5xl">
          {getTrendTitle(trend)}
        </h2>

        <div className="mt-5 flex flex-wrap gap-2">
          <MetaPill label="Quelle" value={getTrendSource(trend)} />
          <MetaPill label="Zeitraum" value={getTrendTimeframe(trend)} />
          <MetaPill label="Signaltyp" value={toText(trend.signalType, "Signal")} />
        </div>

        <div className="mt-7 grid gap-5">
          {[
            [
              "Business Impact",
              toText(
                trend.businessImpact,
                "Für diesen Trend liegt noch keine Business-Einordnung vor.",
              ),
            ],
            [
              "Zusammenfassung",
              toText(
                trend.articleSummary || trend.summary,
                "Für diesen Trend liegt noch keine Zusammenfassung vor.",
              ),
            ],
            [
              "Handlungsempfehlung",
              toText(
                trend.recommendation,
                "Für diesen Trend liegt noch keine Handlungsempfehlung vor.",
              ),
            ],
          ].map(([label, text]) => (
            <section
              key={label}
              className="rounded-2xl border border-white/8 bg-[#0B0F14]/55 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A4C400]">
                {label}
              </p>
              <p className="mt-3 leading-7 text-[#AEB7C2]">{text}</p>
            </section>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href={getTrendArticleUrl(trend)}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#A4C400] px-5 text-sm font-bold text-[#0B0F14] transition hover:bg-[#b4d600]"
          >
            Artikel lesen
          </a>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-[#AEB7C2] transition hover:border-[#A4C400]/40 hover:text-white"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [dataSource, setDataSource] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(defaultStatusFilter);
  const [activeSourceFilter, setActiveSourceFilter] = useState(allSourcesFilter);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);

  const stats = useMemo(() => {
    const highPriorityCount = trends.filter(
      (trend) => trend.status.trim() === "Hohe Relevanz" || Number(trend.score) >= 80,
    ).length;

    const watchCount = trends.filter(
      (trend) => trend.status.trim() === "Beobachten" || Number(trend.score) < 80,
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

  const activeFilterChips = useMemo(() => {
    const trimmedSearchQuery = searchQuery.trim();

    const sourceFilterLabel =
      sourceFilters.find((filter) => filter.value === activeSourceFilter)?.label ||
      "Ausgewählte Quelle";

    const sortLabel =
      sortOptions.find((option) => option.value === sortOrder)?.label || sortOrder;

    return [
      ...(trimmedSearchQuery
        ? [
            {
              key: "search",
              label: `Suche: ${trimmedSearchQuery}`,
              onRemove: () => setSearchQuery(""),
            },
          ]
        : []),
      ...(activeFilter !== defaultStatusFilter
        ? [
            {
              key: "status",
              label: `Status: ${activeFilter}`,
              onRemove: () => setActiveFilter(defaultStatusFilter),
            },
          ]
        : []),
      ...(activeSourceFilter !== allSourcesFilter
        ? [
            {
              key: "source",
              label: `Quelle: ${sourceFilterLabel}`,
              onRemove: () => setActiveSourceFilter(allSourcesFilter),
            },
          ]
        : []),
      ...(sortOrder !== defaultSortOrder
        ? [
            {
              key: "sort",
              label: `Sortierung: ${sortLabel}`,
              onRemove: () => setSortOrder(defaultSortOrder),
            },
          ]
        : []),
    ];
  }, [activeFilter, activeSourceFilter, searchQuery, sortOrder, sourceFilters]);

  const hasActiveFilters = activeFilterChips.length > 0;

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setActiveFilter(defaultStatusFilter);
    setActiveSourceFilter(allSourcesFilter);
    setSortOrder(defaultSortOrder);
  }, []);

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

  const visibleTrends = useMemo(() => {
    const searchTokens = getSearchTerms(searchQuery);

    const filtered = trends.filter((trend) => {
      const matchesSearch =
        searchTokens.length === 0 ||
        searchTokens.every((token) => getTrendSearchText(trend).includes(token));

      const matchesFilter =
        activeFilter === "Alle" ||
        (activeFilter === "Hohe Relevanz" && Number(trend.score) >= 80) ||
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

    return [...filtered].sort((a, b) => {
      if (sortOrder === "score-asc") {
        return Number(a.score || 0) - Number(b.score || 0);
      }

      if (sortOrder === "name-asc") {
        return a.name.localeCompare(b.name);
      }

      if (sortOrder === "date-desc") {
        return getTrendDateTimestamp(b) - getTrendDateTimestamp(a);
      }

      if (sortOrder === "date-asc") {
        return getTrendDateTimestamp(a) - getTrendDateTimestamp(b);
      }

      return Number(b.score || 0) - Number(a.score || 0);
    });
  }, [activeFilter, activeSourceFilter, searchQuery, sortOrder, trends]);

  const cardTrends = useMemo(() => {
    const tokens = getSearchTerms(searchQuery);

    if (tokens.length === 0) {
      return visibleTrends;
    }

    return visibleTrends.filter((trend) => {
      const searchText = getTrendSearchText(trend);
      return tokens.every((token) => searchText.includes(token));
    });
  }, [searchQuery, visibleTrends]);

  const trendGridKey = `trend-grid-${searchQuery}-${activeFilter}-${activeSourceFilter}-${sortOrder}-${cardTrends
    .map((trend) => trend.id)
    .join("-")}`;

  return (
    <main className="min-h-screen bg-[#0B0F14] bg-[radial-gradient(circle_at_50%_0%,rgba(164,196,0,0.13),transparent_34%),linear-gradient(180deg,#0B0F14_0%,#101722_58%,#0B0F14_100%)] px-4 py-8 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <a
          href="/"
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#A4C400]/25 bg-[#A4C400]/10 px-4 text-sm font-semibold text-[#A4C400] transition hover:border-[#A4C400]/55 hover:bg-[#A4C400]/15"
        >
          ← Zur Startseite
        </a>

        <header className="mt-8 rounded-[2rem] border border-white/8 bg-[#121826] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.34)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A4C400]">
            TP TrendPilot AI
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
            TrendPilot AI Dashboard
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#AEB7C2]">
            Priorisierte KI-Updates, Tools und Marktsignale für Teams, die
            schneller erkennen wollen, was jetzt relevant wird.
          </p>

          <label className="mt-8 block max-w-3xl">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#AEB7C2]">
              Trends suchen
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Trends, Kategorien oder Signale suchen..."
              className="h-12 w-full rounded-full border border-white/10 bg-[#0B0F14]/80 px-5 text-sm text-white caret-[#A4C400] outline-none transition placeholder:text-[#AEB7C2]/55 focus:border-[#A4C400] focus:bg-[#0B0F14] focus:ring-2 focus:ring-[#A4C400]/20 [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_#0B0F14_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#ffffff]"
            />
          </label>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/8 bg-white/[0.035] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#AEB7C2]">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-[#AEB7C2]">{stat.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-white/8 bg-white/[0.035] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[#AEB7C2]">
                Datenquelle:{" "}
                <span className="font-bold text-white">
                  {formatDataSource(dataSource)}
                </span>
              </p>

              {lastUpdated ? (
                <p className="mt-1 text-sm text-[#AEB7C2]">
                  Zuletzt aktualisiert: {formatLastUpdated(lastUpdated)} Uhr
                </p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={loadTrends}
              disabled={isLoading}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#A4C400]/30 bg-[#A4C400]/10 px-5 text-sm font-semibold text-[#A4C400] transition hover:border-[#A4C400]/55 hover:bg-[#A4C400]/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Aktualisieren..." : "Aktualisieren"}
            </button>
          </div>
        </section>

        <section className="mt-6 flex flex-wrap gap-3">
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

        <section className="mt-6 rounded-2xl border border-white/8 bg-white/[0.035] p-5">
          <label className="block">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-[#AEB7C2]">
              Quellen
            </span>
            <select
              value={activeSourceFilter}
              onChange={(event) => setActiveSourceFilter(event.target.value)}
              className="h-11 w-full rounded-full border border-white/10 bg-[#0B0F14]/80 px-4 text-sm font-semibold text-white outline-none transition focus:border-[#A4C400] focus:bg-[#0B0F14] focus:ring-2 focus:ring-[#A4C400]/20 sm:max-w-md"
            >
              {sourceFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </label>
        </section>

        {hasActiveFilters ? (
          <section className="mt-6 rounded-2xl border border-[#A4C400]/20 bg-[#A4C400]/5 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A4C400]">
                  Aktive Filter
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {activeFilterChips.map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      onClick={chip.onRemove}
                      className="rounded-full border border-[#A4C400]/25 bg-[#A4C400]/10 px-3 py-1.5 text-xs font-semibold text-[#A4C400] transition hover:bg-[#A4C400]/15"
                    >
                      {chip.label} ×
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#A4C400]/30 bg-[#A4C400]/10 px-4 text-sm font-semibold text-[#A4C400] transition hover:border-[#A4C400]/55 hover:bg-[#A4C400]/15"
              >
                Filter zurücksetzen
              </button>
            </div>
          </section>
        ) : null}

        {!isLoading && !loadError ? (
          <section className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[#AEB7C2]">{cardTrends.length} Trends angezeigt</p>

            <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#AEB7C2]">
                Sortieren
              </span>
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="h-10 w-full rounded-full border border-white/10 bg-[#0B0F14]/80 px-4 text-sm font-medium normal-case tracking-normal text-white outline-none transition focus:border-[#A4C400] focus:bg-[#0B0F14] focus:ring-2 focus:ring-[#A4C400]/20 sm:w-auto"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </section>
        ) : null}

        {isLoading ? (
          <section className="mt-8 rounded-2xl border border-white/8 bg-white/[0.035] p-8 text-[#AEB7C2]">
            Trends werden geladen...
          </section>
        ) : loadError ? (
          <section className="mt-8 rounded-2xl border border-red-500/25 bg-red-500/10 p-8 text-red-200">
            Trends konnten nicht geladen werden.
          </section>
        ) : cardTrends.length > 0 ? (
          <section
            key={trendGridKey}
            className="mt-6 grid gap-5 lg:grid-cols-2"
          >
            {cardTrends.map((trend) => (
              <TrendCard
                key={trend.id}
                trend={trend}
                onOpen={setSelectedTrend}
              />
            ))}
          </section>
        ) : (
          <section className="mt-8 rounded-2xl border border-white/8 bg-white/[0.035] p-8">
            <p className="text-lg font-semibold text-white">
              Keine passenden Trends gefunden.
            </p>
            <p className="mt-2 text-[#AEB7C2]">
              Passe Suche oder Filter an, um weitere Signale zu sehen.
            </p>
          </section>
        )}

        {selectedTrend ? (
          <DetailModal
            trend={selectedTrend}
            onClose={() => setSelectedTrend(null)}
          />
        ) : null}
      </div>
    </main>
  );
}