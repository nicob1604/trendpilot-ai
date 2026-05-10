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
- Aktuell werden 37 Trends aus Google Sheets geladen.
- Dashboard zeigt aktuell 37 Signale.
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

## n8n YouTube-RSS-Testworkflow

Der separate n8n-Workflow `TrendPilot AI – YouTube RSS Test Branch` wurde zum YouTube-Multi-Source-Teststand mit 6 Quellen erweitert und erfolgreich manuell getestet.

- YouTube-RSS ist als Multi-Source-Quellenart erfolgreich getestet.
- YouTube wurde nicht über die YouTube Data API angebunden.
- Stattdessen wird YouTube per Channel-RSS genutzt.
- Es werden keine neuen API-Keys benötigt.
- Es wurden keine neuen Secrets angelegt.
- Keine kostenpflichtigen Dienste wurden aktiviert.
- Kein Schedule Trigger ist aktiv.
- Der Workflow läuft weiterhin nur manuell.
- Integrierte Quellen:
  - YouTube – OpenAI
  - YouTube – Google DeepMind
  - YouTube – NVIDIA Developer
  - YouTube – Everlast AI
  - YouTube – Christoph Magnussen
  - YouTube – Niklas Steenfatt
- YouTube-Quellen werden im Workflow konfiguriert.
- Technischer Ablauf: Manual Trigger -> YouTube-Quellen konfigurieren -> RSS Feed per HTTP lesen -> XML zu JSON -> YouTube-Daten in Trend-Kandidaten umwandeln -> Trend-Daten normalisieren -> Bestehende Trends lesen -> Nur neue Trends filtern -> Neue Trends in Google Sheets schreiben.
- RSS Feeds werden per HTTP gelesen.
- Feed-XML wird über XML to JSON umgewandelt.
- YouTube-Daten werden in Trend-Kandidaten umgewandelt und normalisiert.
- Pro Quelle werden maximal 5 Videos verarbeitet.
- 6 Quellen ergeben maximal 30 YouTube-Kandidaten pro manuellem Lauf.
- Source-Mapping funktioniert:
  - OpenAI -> YouTube – OpenAI
  - Google DeepMind -> YouTube – Google DeepMind
  - NVIDIA Developer -> YouTube – NVIDIA Developer
  - Everlast AI -> YouTube – Everlast AI
  - Christoph Magnussen -> YouTube – Christoph Magnussen
  - Niklas Steenfatt -> YouTube – Niklas Steenfatt
- Die alten `YouTube – Unknown` Einträge wurden bereinigt.
- Duplikate werden über `id` geprüft.
- Google Sheet zeigt YouTube-Trends korrekt an.
- `/api/trends` liest die neuen YouTube-Trends aus Google Sheets.
- Dashboard zeigt jetzt 37 Signale.
- `signalType`: `YouTube`
- `source`: korrekt gemappte YouTube-Quelle
- Gesicherte Exportdatei: `n8n-trendpilot-youtube-current.json`
- Die Exportdatei wurde auf `private_key` geprüft.
- Es wurde kein `private_key` gefunden.
- Die Datei wurde committed und gepusht.

Weitere mögliche YouTube-Quellen für später:

- Microsoft Developer
- Hugging Face
- AI at Meta

## Kostenstatus

Das Projekt bleibt kostenlos.

- GitHub Free bleibt aktiv.
- Vercel Hobby/Free bleibt aktiv.
- Keine kostenpflichtigen Dienste sind aktiv.
- Keine kostenpflichtige Domain ist aktiv.
- Keine kostenpflichtigen Datenbanken oder APIs sind aktiv.
- Keine Vercel-Pro- oder Vercel-Agent-Funktionen aktivieren.
- Keine YouTube API Keys nötig.

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
- Weitere YouTube-Quellen ergänzen.
- Optional später einen Schedule Trigger in n8n aktivieren.
- Schedule Trigger nur aktivieren, wenn ausdrücklich gewünscht.
- Datenqualität im Google Sheet weiter verbessern.
