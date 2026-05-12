"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
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

function isValidSourceUrl(value: string | undefined) {
  return Boolean(value && /^https?:\/\//i.test(value));
}

function getText(value: string | undefined, fallback = "Nicht angegeben") {
  if (!value || !value.trim()) {
    return fallback;
  }

  return value.trim();
}

function formatPublishedAt(value: string | undefined) {
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

function cleanArticleText(value: string | undefined) {
  if (!value) {
    return "";
  }

  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => {
      if (!line) {
        return false;
      }

      if (/^(quelle|source|originalquelle)\s*:/i.test(line)) {
        return false;
      }

      if (/^https?:\/\//i.test(line)) {
        return false;
      }

      return true;
    })
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function splitIntoParagraphs(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function ScoreBadge({ score }: { score: number }) {
  const scoreLabel = Number.isFinite(score) ? `${score}%` : "0%";

  return (
    <span className="inline-flex w-fit shrink-0 items-center justify-center rounded-full border border-[#A4C400]/30 bg-[#A4C400]/10 px-3 py-1 text-sm font-bold leading-none text-[#A4C400]">
      Score {scoreLabel}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded-full border border-[#A4C400]/25 bg-[#A4C400]/10 px-3 py-1 text-xs font-semibold text-[#A4C400]">
      {getText(status)}
    </span>
  );
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.035] px-3 py-1.5 text-xs leading-none text-[#AEB7C2]">
      <span className="shrink-0 text-white/50">{label}</span>
      <span className="min-w-0 truncate">{value}</span>
    </span>
  );
}

function ArticleSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.5rem] border border-white/8 bg-white/[0.035] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.16)] sm:p-6">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A4C400]">
          {eyebrow}
        </p>
      ) : null}

      <h2 className={eyebrow ? "mt-2 text-2xl font-semibold text-white" : "text-2xl font-semibold text-white"}>
        {title}
      </h2>

      <div className="mt-4 space-y-4 leading-7 text-[#AEB7C2]">{children}</div>
    </section>
  );
}

function TextBlock({ text }: { text: string }) {
  const paragraphs = splitIntoParagraphs(text);

  if (paragraphs.length === 0) {
    return <p>Für diesen Abschnitt liegen noch keine ausführlichen Informationen vor.</p>;
  }

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={`${paragraph.slice(0, 24)}-${index}`}>{paragraph}</p>
      ))}
    </>
  );
}

function InsightCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0B0F14]/55 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
        {label}
      </p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
    </div>
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
    return <ErrorState message="Trend-Artikel wird geladen..." />;
  }

  if (loadError) {
    return <ErrorState message="Trend-Daten konnten nicht geladen werden." />;
  }

  if (!trend) {
    return <ErrorState message="Für diese Trend-ID wurde kein Eintrag gefunden." />;
  }

  const title = getText(trend.articleTitle, trend.name);
  const intro = getText(trend.articleSummary, trend.summary);
  const sourceName = getText(trend.sourceName, trend.source);
  const sourceUrl = isValidSourceUrl(trend.sourceUrl) ? trend.sourceUrl : undefined;
  const readablePublishedAt = formatPublishedAt(trend.publishedAt);
  const timeframe = readablePublishedAt || getText(trend.timeframe);
  const happenedText =
    cleanArticleText(trend.articleBody) ||
    cleanArticleText(trend.summary) ||
    intro;

  const businessImpact = getText(
    trend.businessImpact,
    "Dieses Signal sollte geprüft werden, weil es auf eine relevante Entwicklung im Bereich KI, Automatisierung oder digitale Produktivität hinweisen kann.",
  );

  const recommendation = getText(
    trend.recommendation,
    "Das Signal sollte beobachtet und bei passender Relevanz in bestehende KI-, Automatisierungs- oder Produktivitätsprozesse eingeordnet werden.",
  );

  return (
    <main className="min-h-screen bg-[#0B0F14] bg-[radial-gradient(circle_at_50%_0%,rgba(164,196,0,0.12),transparent_34%),linear-gradient(180deg,#0B0F14_0%,#101722_58%,#0B0F14_100%)] px-4 py-8 text-white sm:px-8 lg:px-10">
      <article className="mx-auto max-w-5xl">
        <a
          href="/dashboard"
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#A4C400]/30 bg-[#A4C400]/10 px-4 text-sm font-semibold text-[#A4C400] transition hover:border-[#A4C400]/55 hover:bg-[#A4C400]/15"
        >
          Zurück zum Dashboard
        </a>

        <header className="mt-8 overflow-hidden rounded-[2rem] border border-white/8 bg-[#121826] shadow-[0_28px_90px_rgba(0,0,0,0.34)]">
          <div className="border-b border-white/8 bg-white/[0.025] px-6 py-5 sm:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-[#AEB7C2]">
                {getText(trend.category)}
              </span>
              <StatusBadge status={trend.status} />
              <ScoreBadge score={trend.score} />
            </div>
          </div>

          <div className="px-6 py-7 sm:px-8 sm:py-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A4C400]">
              TrendPilot AI Analyse
            </p>

            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
              {title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#AEB7C2]">
              {intro}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <MetaPill label="Quelle" value={sourceName} />
              <MetaPill label="Zeitraum" value={timeframe} />
              <MetaPill label="Signaltyp" value={getText(trend.signalType)} />
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <InsightCard label="Status" value={getText(trend.status)} />
          <InsightCard label="Score" value={`${trend.score}%`} />
          <InsightCard label="Signaltyp" value={getText(trend.signalType)} />
        </section>

        <div className="mt-6 grid gap-5">
          <ArticleSection eyebrow="Überblick" title="Was ist passiert?">
            <TextBlock text={happenedText} />
          </ArticleSection>

          <ArticleSection eyebrow="Relevanz" title="Warum ist das relevant?">
            <TextBlock text={businessImpact} />
          </ArticleSection>

          <ArticleSection eyebrow="Einordnung" title="Einordnung für Unternehmen">
            <p>
              Dieses Signal wurde als{" "}
              <span className="font-semibold text-white">{getText(trend.signalType)}</span>{" "}
              mit dem Status{" "}
              <span className="font-semibold text-white">{getText(trend.status)}</span>{" "}
              und einem Score von{" "}
              <span className="font-semibold text-white">{trend.score}%</span>{" "}
              eingeordnet.
            </p>
            <p>
              Für Unternehmen ist vor allem relevant, ob die Entwicklung
              Auswirkungen auf Automatisierung, interne Prozesse,
              Produktivität, Content-Erstellung, Recherche, Kundenkommunikation
              oder bestehende KI-Workflows haben kann.
            </p>
          </ArticleSection>

          <ArticleSection eyebrow="Empfehlung" title="Empfohlene nächste Schritte">
            <TextBlock text={recommendation} />

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/8 bg-[#0B0F14]/55 p-4">
                <p className="font-semibold text-white">1. Prüfen</p>
                <p className="mt-2 text-sm leading-6 text-[#AEB7C2]">
                  Passt das Signal zu aktuellen Projekten, Kundenfällen oder
                  internen Workflows?
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-[#0B0F14]/55 p-4">
                <p className="font-semibold text-white">2. Bewerten</p>
                <p className="mt-2 text-sm leading-6 text-[#AEB7C2]">
                  Ist daraus kurzfristig ein Test, ein Prozessvorteil oder eine
                  neue Idee ableitbar?
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-[#0B0F14]/55 p-4">
                <p className="font-semibold text-white">3. Umsetzen</p>
                <p className="mt-2 text-sm leading-6 text-[#AEB7C2]">
                  Relevante Signale können als Aufgabe, Recherchepunkt oder
                  Automatisierungs-Idee weiterverarbeitet werden.
                </p>
              </div>
            </div>
          </ArticleSection>

          <ArticleSection eyebrow="Original" title="Quelle">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-white">{sourceName}</p>
                <p className="mt-1 text-sm text-[#AEB7C2]">
                  {timeframe} · {getText(trend.signalType)}
                </p>
              </div>

              {sourceUrl ? (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-fit items-center justify-center rounded-full bg-[#A4C400] px-5 text-sm font-bold text-[#0B0F14] transition hover:bg-[#b4d600] focus:outline-none focus:ring-2 focus:ring-[#A4C400]/30"
                >
                  Originalquelle öffnen
                </a>
              ) : (
                <p>Keine direkte Quellen-URL hinterlegt.</p>
              )}
            </div>
          </ArticleSection>

          <div className="flex justify-start pt-2">
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