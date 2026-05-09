# TrendPilot AI

TrendPilot AI ist ein Next.js MVP für eine moderne AI-Trend-Radar-Landingpage mit Dashboard und interner Trend-API.

## Live-URLs

- Startseite: https://trendpilot-ai-two.vercel.app/
- Dashboard: https://trendpilot-ai-two.vercel.app/dashboard
- API: https://trendpilot-ai-two.vercel.app/api/trends

## Aktueller MVP-Status

- Landingpage funktioniert live auf Vercel.
- Dashboard funktioniert live.
- Der obere Dashboard-Button auf der Landingpage führt korrekt zu `/dashboard`.
- `/api/trends` liest echte Daten aus Google Sheets.
- Datenquelle im Dashboard ist `google_sheets`.
- Aktuell werden 7 Trends aus Google Sheets geladen.
- Dashboard-Statistiken werden dynamisch aus den echten Trends berechnet.
- Google Sheet wurde bereinigt und ein Backup-Tab wurde erstellt.
- Icon/Favicon und Metadata sind ergänzt.
- GitHub und Vercel sind aktuell.

## Datenquelle

Das Dashboard lädt seine Daten über:

```ts
fetch("/api/trends")
```

Die API liefert weiterhin dieses Format:

```json
{
  "source": "google_sheets",
  "updatedAt": "2026-05-09T00:00:00.000Z",
  "count": 7,
  "trends": []
}
```

Google Sheets ist live angebunden. Die Vercel Environment Variables sind gesetzt. Es dürfen keine Secrets, Private Keys oder Google-Service-Account-JSON-Dateien ins Repository geschrieben werden.

Öffentliche Sheet-ID:

```text
1Gt8Lv1VY5CXRdqBYTDw8KPRSU-yMnXRI4IoB7bh6oLo
```

Tabellenblatt:

```text
trends
```

## n8n RSS-Testworkflow

Der n8n RSS-Testworkflow `TrendPilot AI – RSS Test Branch` funktioniert manuell.

- RSS-Filterlogik und Scoring wurden verbessert.
- Duplikat-Schutz funktioniert über `id`.
- Neue Workflow-Exportdatei: `n8n-trendpilot-rss-current.json`
- Die Exportdatei wurde auf `private_key` geprüft.
- Es wurde kein `private_key` gefunden.
- Der Workflow läuft aktuell nur manuell.
- Es ist kein Schedule Trigger aktiv.

Ein Schedule Trigger soll erst aktiviert werden, wenn das ausdrücklich gewünscht ist.

## Kostenstatus

Das Projekt bleibt kostenlos.

- GitHub Free bleibt aktiv.
- Vercel Hobby/Free bleibt aktiv.
- Keine kostenpflichtigen Dienste sind aktiv.
- Keine kostenpflichtige Domain ist aktiv.
- Keine kostenpflichtigen Datenbanken oder APIs sind aktiv.
- Keine Vercel-Pro- oder Vercel-Agent-Funktionen aktivieren.

## Lokale Entwicklung

```powershell
cd C:\Users\NicoBrandt\trendpilot-ai
npm.cmd run dev
```

Lokale URL:

```text
http://localhost:3000
```

## Build

```powershell
npm.cmd run build
```

## Nächste mögliche Schritte

- Weitere RSS-Quellen ergänzen.
- Optional später einen Schedule Trigger in n8n aktivieren.
- Schedule Trigger nur aktivieren, wenn ausdrücklich gewünscht.
- Datenqualität im Google Sheet weiter verbessern.
