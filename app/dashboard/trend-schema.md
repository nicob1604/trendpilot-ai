# TrendPilot AI Trend Schema

Diese Datei dokumentiert das erwartete Datenformat für Trends im Dashboard.
Aktuell kommen die Daten aus Mock-Daten in `data.ts`. Diese Struktur soll später
von n8n, Google Sheets, Supabase oder einer API geliefert werden, damit
`app/dashboard/page.tsx` möglichst unverändert bleiben kann.

## TypeScript-Struktur

Die folgenden Felder beschreiben einen einzelnen Trend innerhalb des `trends`-Arrays.

```ts
export type Trend = {
  id: string;
  name: string;
  category: string;
  status: string;
  score: number;
  businessImpact: string;
  summary: string;
  recommendation: string;
  source: string;
  timeframe: string;
  signalType: string;
};
```

Die API liefert zusätzlich Metadaten auf Root-Ebene:

```json
{
  "source": "mock",
  "updatedAt": "2026-05-05T19:24:00.000Z",
  "count": 6,
  "trends": []
}
```

- `source`: Aktuelle Datenquelle, z. B. `mock`, `n8n`, `google-sheets`, `supabase` oder `api`.
- `updatedAt`: ISO-Zeitstempel der letzten Aktualisierung.
- `count`: Anzahl der gelieferten Trends.
- `trends`: Array der Trend-Objekte in der unten dokumentierten Struktur.

## Felder

- `id`: Stabile eindeutige Kennung für den Trend, z. B. für Keys, Detailansicht oder spätere URLs.
- `name`: Sichtbarer Trendname.
- `category`: Thematische Kategorie, z. B. `AI Tools`, `Workflows`, `Compliance` oder `Research`.
- `status`: Kurzer Status für Filter und Orientierung, z. B. `Neu`, `Hohe Relevanz` oder `Beobachten`.
- `score`: Numerischer Relevanzwert von 0 bis 100.
- `businessImpact`: Kurzer Text zum erwarteten geschäftlichen Einfluss.
- `summary`: Kompakte Zusammenfassung, warum der Trend relevant ist.
- `recommendation`: Handlungsempfehlung für Teams.
- `source`: Ursprung oder Signalquelle, z. B. Produktlaunches, Tool-Updates oder regulatorische Signale.
- `timeframe`: Zeitliche Einordnung, z. B. `Heute` oder `Diese Woche`.
- `signalType`: Signalart, z. B. `Workflow`, `Research`, `Compliance`, `AI Tools` oder `Operations`.

## Beispiel-Datensatz

```json
{
  "id": "agentic-workflows",
  "name": "Agentic Workflows",
  "category": "Workflows",
  "status": "Hohe Relevanz",
  "score": 94,
  "businessImpact": "Enterprise-Teams verlagern repetitive Aufgaben zunehmend in KI-gestützte Prozessketten. Der Einfluss auf Produktivität, Tool-Auswahl und operative Abläufe ist hoch.",
  "summary": "Agentic Workflows zeigen starkes Momentum, weil Unternehmen wiederkehrende Aufgaben zunehmend durch KI-gestützte Prozessketten automatisieren.",
  "recommendation": "Für Produktivitäts-, Operations- und Marketingteams beobachten und erste interne Use Cases systematisch sammeln.",
  "source": "Launches & Tool-Updates",
  "timeframe": "Diese Woche",
  "signalType": "Workflow"
}
```

## Hinweise für spätere Datenquellen

- Jede Datenquelle sollte ein Array von Trend-Objekten in dieser Struktur liefern.
- `id` sollte stabil bleiben, auch wenn sich Texte oder Scores ändern.
- `score` sollte als Zahl geliefert werden, nicht als String.
- `status` sollte mit den Dashboard-Filtern kompatibel bleiben.
- Fehlende Felder sollten in der Datenquelle normalisiert werden, bevor sie im Dashboard verwendet werden.
- Die Anbindung sollte bevorzugt in `trend-source.ts` erfolgen, damit die Dashboard-UI möglichst unverändert bleibt.
