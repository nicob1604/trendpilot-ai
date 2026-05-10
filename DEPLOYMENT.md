# TrendPilot AI

## GitHub Repository

https://github.com/nicob1604/trendpilot-ai

## Vercel Deployment

Das Projekt wurde erfolgreich über Vercel deployed.

TrendPilot AI ist öffentlich deployed und funktionsfähig.

Öffentliche Vercel-URL:

https://trendpilot-ai-two.vercel.app

Deployment ist live und funktionsfähig.
Startseite, Dashboard und API wurden online geprüft.

## Öffentliche Seiten

- Startseite funktioniert online.
- Dashboard funktioniert online.
- API funktioniert online.

## Online-Routen

- https://trendpilot-ai-two.vercel.app/
- https://trendpilot-ai-two.vercel.app/dashboard
- https://trendpilot-ai-two.vercel.app/api/trends

## API-Status

Die Online-API `/api/trends` liefert erfolgreich:

- `source`
- `updatedAt`
- `count`
- `trends`

Aktueller Live-Status:

- `source`: `google_sheets`
- `count`: 37 Trends
- Dashboard zeigt aktuell 37 Signale.
- Google Sheets ist live angebunden.
- Vercel Environment Variables sind gesetzt.
- Mock-Daten bleiben als Fallback im Code erhalten.
- Keine Secrets, Private Keys oder Google-Service-Account-JSON-Dateien ins Repository schreiben.

## Lokale Entwicklung

```powershell
cd C:\Users\NicoBrandt\trendpilot-ai
npm.cmd run dev
```

Lokale URL:

```text
http://localhost:3000
```

## Production Build

```powershell
npm.cmd run build
```

## Build-Status

Build erfolgreich getestet.

Routen:

- `/`
- `/dashboard`
- `/api/trends`

## Kostenstatus

Aktuell wird der kostenlose GitHub-Free- und Vercel-Hobby/Free-Workflow genutzt.
Keine kostenpflichtigen Zusatzfunktionen wurden aktiviert.
Weiterhin GitHub Free + Vercel Hobby/Free.
Keine kostenpflichtigen Dienste sind aktiv.
Kein Schedule Trigger ist aktiv.

Nicht aktivieren:

- Vercel Pro
- Vercel Agent
- kostenpflichtige Domain
- kostenpflichtige Datenbank
- kostenpflichtige Add-ons

## Datenstatus

Das Dashboard lädt aktuell echte Google-Sheet-Daten über die interne API `/api/trends`.
Die Datenquelle im Dashboard ist `google_sheets`.
Aktuell werden 37 Trends geladen.
Dashboard zeigt aktuell 37 Signale.
Dashboard-Statistiken werden dynamisch aus den echten Trends berechnet.
Das Google Sheet wurde bereinigt und ein Backup-Tab wurde erstellt.

Der n8n RSS-Testworkflow funktioniert manuell. RSS-Filterlogik, Scoring und Duplikat-Schutz über `id` funktionieren. Die aktuelle sichere Exportdatei heißt `n8n-trendpilot-rss-current.json` und wurde auf `private_key` geprüft. Es wurde kein `private_key` gefunden.

Der separate YouTube-RSS-Testworkflow `TrendPilot AI – YouTube RSS Test Branch` funktioniert manuell und ist jetzt als Multi-Source-Teststand mit 6 Quellen vorhanden. YouTube wurde nicht über die YouTube Data API angebunden, sondern kostenlos per Channel-RSS. Integriert sind `YouTube – OpenAI`, `YouTube – Google DeepMind`, `YouTube – NVIDIA Developer`, `YouTube – Everlast AI`, `YouTube – Christoph Magnussen` und `YouTube – Niklas Steenfatt`. Technischer Ablauf: Manual Trigger -> YouTube-Quellen konfigurieren -> RSS Feed per HTTP lesen -> XML zu JSON -> YouTube-Daten in Trend-Kandidaten umwandeln -> Trend-Daten normalisieren -> Bestehende Trends lesen -> Nur neue Trends filtern -> Neue Trends in Google Sheets schreiben. Pro Quelle werden maximal 5 Videos verarbeitet; 6 Quellen ergeben maximal 30 YouTube-Kandidaten pro manuellem Lauf. Source-Mapping funktioniert für OpenAI, Google DeepMind, NVIDIA Developer, Everlast AI, Christoph Magnussen und Niklas Steenfatt. Die alten `YouTube – Unknown` Einträge wurden bereinigt. Google Sheet zeigt YouTube-Trends korrekt an. `/api/trends` liest die neuen YouTube-Trends aus Google Sheets. `signalType` ist `YouTube`.

Gesicherte YouTube-Exportdatei: `n8n-trendpilot-youtube-current.json`. Die Datei wurde auf `private_key` geprüft. Es wurde kein `private_key` gefunden. Die Datei wurde committed und gepusht.

Für YouTube-RSS werden keine neuen API-Keys, keine neuen Secrets und keine kostenpflichtigen Dienste benötigt. Kein Schedule Trigger ist aktiv.

Später können weitere RSS- oder YouTube-Quellen ergänzt werden. Ein Schedule Trigger soll erst aktiviert werden, wenn das ausdrücklich gewünscht ist.

Mögliche spätere YouTube-Quellen:

- Microsoft Developer
- Hugging Face
- AI at Meta

## Deployment-Ablauf

Code → GitHub → Vercel → öffentliche URL
