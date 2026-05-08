import { createSign } from "node:crypto";

import type { Trend } from "../../dashboard/data";
import { getTrends } from "../../dashboard/trend-source";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";
const DEFAULT_SHEET_ID = "1Gt8Lv1VY5CXRdqBYTDw8KPRSU-yMnXRI4IoB7bh6oLo";
const DEFAULT_SHEET_TAB = "trends";

type TrendsResponse = {
  source: "google_sheets" | "mock" | "fallback";
  updatedAt: string;
  count: number;
  trends: Trend[];
};

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
};

type SheetsValuesResponse = {
  values?: string[][];
};

const trendFields = [
  "id",
  "name",
  "category",
  "status",
  "score",
  "businessImpact",
  "summary",
  "recommendation",
  "source",
  "timeframe",
  "signalType",
] as const;

const namedHtmlEntities: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  ldquo: "\"",
  lsquo: "'",
  lt: "<",
  nbsp: " ",
  quot: "\"",
  rdquo: "\"",
  rsquo: "'",
};

function decodeHtmlEntities(value: string) {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
    const normalizedEntity = entity.toLowerCase();

    if (normalizedEntity.startsWith("#x")) {
      const codePoint = Number.parseInt(normalizedEntity.slice(2), 16);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }

    if (normalizedEntity.startsWith("#")) {
      const codePoint = Number.parseInt(normalizedEntity.slice(1), 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }

    return namedHtmlEntities[normalizedEntity] || match;
  });
}

function cleanText(value: string | undefined) {
  return decodeHtmlEntities(String(value || ""))
    .replace(/\s+/g, " ")
    .trim();
}

function improveGenericRssCopy(trend: Trend): Trend {
  const isRssSignal = trend.signalType.toLowerCase() === "rss";
  const hasGenericBusinessImpact =
    trend.businessImpact.toLowerCase().includes("neues rss-signal") ||
    trend.businessImpact.toLowerCase().includes("möglicher relevanz");
  const hasGenericRecommendation =
    trend.recommendation.toLowerCase().includes("signal prüfen") ||
    trend.recommendation.toLowerCase().includes("manuell schärfen");

  if (!isRssSignal && !hasGenericBusinessImpact && !hasGenericRecommendation) {
    return trend;
  }

  return {
    ...trend,
    businessImpact: hasGenericBusinessImpact
      ? `${trend.name} sollte auf Auswirkungen für KI-Roadmaps, Produktpositionierung und Marktkommunikation geprüft werden.`
      : trend.businessImpact,
    recommendation: hasGenericRecommendation
      ? "Für Marketing-, Produkt- und Innovationsteams einordnen: Relevanz prüfen, Quelle bewerten und bei belastbarem Signal priorisieren."
      : trend.recommendation,
  };
}

function sanitizeTrend(trend: Trend): Trend {
  const sanitizedTrend: Trend = {
    id: trend.id.trim(),
    name: cleanText(trend.name),
    category: cleanText(trend.category),
    status: cleanText(trend.status),
    score: trend.score,
    businessImpact: cleanText(trend.businessImpact),
    summary: cleanText(trend.summary),
    recommendation: cleanText(trend.recommendation),
    source: cleanText(trend.source),
    timeframe: cleanText(trend.timeframe),
    signalType: cleanText(trend.signalType),
  };

  return improveGenericRssCopy(sanitizedTrend);
}

function sanitizeTrends(trends: Trend[]) {
  return trends.map(sanitizeTrend);
}

function createFallbackResponse(source: "mock" | "fallback" = "fallback"): TrendsResponse {
  const trends = sanitizeTrends(getTrends());

  return {
    source,
    updatedAt: new Date().toISOString(),
    count: trends.length,
    trends,
  };
}

function base64UrlEncode(value: string) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function getPrivateKeyFromEnv() {
  return process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
}

function getGoogleConfig() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = getPrivateKeyFromEnv();
  const sheetId = process.env.GOOGLE_SHEET_ID || DEFAULT_SHEET_ID;
  const sheetTab = process.env.GOOGLE_SHEET_TAB || DEFAULT_SHEET_TAB;

  if (!serviceAccountEmail || !privateKey) {
    return null;
  }

  return {
    privateKey,
    serviceAccountEmail,
    sheetId,
    sheetTab,
  };
}

async function getGoogleAccessToken() {
  const config = getGoogleConfig();

  if (!config) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(
    JSON.stringify({
      alg: "RS256",
      typ: "JWT",
    }),
  );
  const payload = base64UrlEncode(
    JSON.stringify({
      iss: config.serviceAccountEmail,
      scope: GOOGLE_SHEETS_SCOPE,
      aud: GOOGLE_TOKEN_URL,
      exp: now + 3600,
      iat: now,
    }),
  );
  const unsignedToken = `${header}.${payload}`;
  const signature = createSign("RSA-SHA256")
    .update(unsignedToken)
    .sign(config.privateKey, "base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const assertion = `${unsignedToken}.${signature}`;

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google token request failed with status ${response.status}`);
  }

  const data = (await response.json()) as GoogleTokenResponse;

  if (!data.access_token) {
    throw new Error(data.error || "Google token response did not include an access token");
  }

  return {
    accessToken: data.access_token,
    sheetId: config.sheetId,
    sheetTab: config.sheetTab,
  };
}

function normalizeScore(value: string | undefined) {
  const score = Number(String(value || "").replace(",", "."));

  if (!Number.isFinite(score)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

function normalizeTrendRow(row: string[], headerIndex: Map<string, number>): Trend | null {
  const getValue = (field: (typeof trendFields)[number]) => {
    const index = headerIndex.get(field);
    return index === undefined ? "" : String(row[index] || "").trim();
  };

  const trend: Trend = {
    id: getValue("id"),
    name: getValue("name"),
    category: getValue("category") || "Unkategorisiert",
    status: getValue("status") || "Neu",
    score: normalizeScore(getValue("score")),
    businessImpact: getValue("businessImpact"),
    summary: getValue("summary"),
    recommendation: getValue("recommendation"),
    source: getValue("source") || "Google Sheets",
    timeframe: getValue("timeframe") || "Aktuell",
    signalType: getValue("signalType") || "Signal",
  };

  if (!trend.id || !trend.name) {
    return null;
  }

  return sanitizeTrend(trend);
}

function normalizeSheetValues(values: string[][] | undefined) {
  if (!values || values.length < 2) {
    return [];
  }

  const [headerRow, ...rows] = values;
  const headerIndex = new Map<string, number>();

  headerRow.forEach((field, index) => {
    headerIndex.set(String(field || "").trim(), index);
  });

  return rows
    .map((row) => normalizeTrendRow(row, headerIndex))
    .filter((trend): trend is Trend => Boolean(trend));
}

async function getGoogleSheetTrends() {
  const tokenData = await getGoogleAccessToken();

  if (!tokenData) {
    return null;
  }

  const range = encodeURIComponent(`${tokenData.sheetTab}!A:K`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${tokenData.sheetId}/values/${range}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${tokenData.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Google Sheets request failed with status ${response.status}`);
  }

  const data = (await response.json()) as SheetsValuesResponse;
  return sanitizeTrends(normalizeSheetValues(data.values));
}

export async function GET() {
  try {
    const googleSheetTrends = await getGoogleSheetTrends();

    if (!googleSheetTrends) {
      return Response.json(createFallbackResponse("mock"));
    }

    return Response.json({
      source: "google_sheets",
      updatedAt: new Date().toISOString(),
      count: googleSheetTrends.length,
      trends: googleSheetTrends,
    } satisfies TrendsResponse);
  } catch (error) {
    console.error("Failed to load Google Sheets trends. Falling back to mock data.", error);
    return Response.json(createFallbackResponse("fallback"));
  }
}
