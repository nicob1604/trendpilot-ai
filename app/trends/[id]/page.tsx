"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import type { Trend } from "../../dashboard/data";

type TrendsApiResponse = {
  trends?: unknown;
};

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function ScoreBadge({ score }: { score: number }) {
  return (
    <span className="inline-flex w-fit shrink-0 items-center justify-center rounded-full border border-[#A4C400]/30 bg-[#A4C400]/10 px-3 py-1 text-sm font-bold leading-none text-[#A4C400]">
      {score}%
    </span>
  );
}

function isValidSourceUrl(value: string | undefined) {
  return Boolean(value && /^https?:\/\//i.test(value));
}

function ArticleSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/8 bg-white/[0.035] p-5 sm:p-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A4C400]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-7 text-[#AEB7C2]">{children}</div>
    </section>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <main className="min-h-screen bg-[#0B0F14] bg-[radial-gradient(circle_at_50%_0%,rgba(164,196,0,0.12),transparent_34%),linear-gradient(180deg,#0B0F14_0%,#101722_58%,#0B0F14_100%)] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <a
          href="/dashboard"
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#A4C400]/30 bg-[#A4C400]/10 px-4 text-sm font-semibold text-[#A4C400] transition hover:border-[#A4C400]/55 hover:bg-[#A4C400]/15"
        >
          Zurück zum Dashboard
        </a>
        <section className="mt-8 rounded-2xl border border-white/8 bg-[#121826] p-8 shadow-[0_18px_55px_rgba(0,0,0,0.24)]">
          <p className="text-lg font-semibold text-white">{message}</p>
          <p className="mt-3 text-[#AEB7C2]">
            Bitte kehre zum Dashboard zurück und öffne den Artikel erneut.
          </p>
        </section>
      </div>
    </main>
  );
}

export default function TrendArticlePage() {
  const params = useParams<{ id: string }>();
  const trendId = useMemo(
    () => safeDecodeURIComponent(String(params.id || "")),
    [params.id],
  );
  const [trends, setTrends] = useState<Trend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    async function loadTrendData() {
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
      } catch {
        setLoadError(true);
        setTrends([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadTrendData();
  }, []);

  const trend = useMemo(
    () => trends.find((item) => item.id === trendId),
    [trendId, trends],
  );

  if (isLoading) {
    return (
      <ErrorState message="Trend-Artikel wird geladen..." />
    );
  }

  if (loadError) {
    return (
      <ErrorState message="Trend-Daten konnten nicht geladen werden." />
    );
  }

  if (!trend) {
    return (
      <ErrorState message="Für diese Trend-ID wurde kein Eintrag gefunden." />
    );
  }

  const title = trend.articleTitle || trend.name;
  const intro = trend.articleSummary || trend.summary;
  const sourceName = trend.sourceName || trend.source;
  const sourceUrl = isValidSourceUrl(trend.sourceUrl) ? trend.sourceUrl : undefined;
  const happenedText = trend.articleBody || trend.summary;

  return (
    <main className="min-h-screen bg-[#0B0F14] bg-[radial-gradient(circle_at_50%_0%,rgba(164,196,0,0.12),transparent_34%),linear-gradient(180deg,#0B0F14_0%,#101722_58%,#0B0F14_100%)] px-4 py-8 text-white sm:px-8 lg:px-10">
      <article className="mx-auto max-w-4xl">
        <a
          href="/dashboard"
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#A4C400]/30 bg-[#A4C400]/10 px-4 text-sm font-semibold text-[#A4C400] transition hover:border-[#A4C400]/55 hover:bg-[#A4C400]/15"
        >
          Zurück zum Dashboard
        </a>

        <header className="mt-8 rounded-[2rem] border border-white/8 bg-[#121826] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.34)] sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-[#AEB7C2]">
              {trend.category}
            </span>
            <span className="rounded-full border border-[#A4C400]/25 bg-[#A4C400]/10 px-3 py-1 text-xs font-semibold text-[#A4C400]">
              {trend.status}
            </span>
            <ScoreBadge score={trend.score} />
          </div>

          <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-[#AEB7C2]">{intro}</p>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-[#AEB7C2]">
            {[
              ["Quelle", sourceName],
              ["Zeitraum", trend.publishedAt || trend.timeframe],
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
        </header>

        <div className="mt-6 grid gap-5">
          <ArticleSection title="Was ist passiert?">
            <p>{happenedText}</p>
            <p>Quelle: {sourceName}</p>
          </ArticleSection>

          <ArticleSection title="Warum ist das relevant?">
            <p>{trend.businessImpact}</p>
          </ArticleSection>

          <ArticleSection title="Empfohlene Einschätzung">
            <p>{trend.recommendation}</p>
          </ArticleSection>

          <ArticleSection title="Einordnung für Unternehmen">
            <p>
              Dieses Signal ist als {trend.signalType}-Quelle mit dem Status{" "}
              {trend.status} und einem Score von {trend.score}% eingeordnet. Für
              Teams ist vor allem relevant, ob die beschriebene Entwicklung zum
              eigenen Aufgabenbereich, zur aktuellen Roadmap oder zu bestehenden
              KI-Initiativen passt.
            </p>
          </ArticleSection>

          <ArticleSection title="Quelle">
            <p className="font-semibold text-white">{sourceName}</p>
            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#A4C400] px-5 text-sm font-bold text-[#0B0F14] transition hover:bg-[#b4d600]"
              >
                Originalquelle öffnen
              </a>
            ) : (
              <p>Keine direkte Quellen-URL hinterlegt.</p>
            )}
          </ArticleSection>

          <div className="flex justify-start">
            <a
              href="/dashboard"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#A4C400]/30 bg-[#A4C400]/10 px-5 text-sm font-semibold text-[#A4C400] transition hover:border-[#A4C400]/55 hover:bg-[#A4C400]/15 focus:outline-none focus:ring-2 focus:ring-[#A4C400]/25"
            >
              Zurück zum Dashboard
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
