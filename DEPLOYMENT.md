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

Nicht aktivieren:

- Vercel Pro
- Vercel Agent
- kostenpflichtige Domain
- kostenpflichtige Datenbank
- kostenpflichtige Add-ons

## Datenstatus

Das Dashboard lädt aktuell Mock-Daten über die interne API `/api/trends`.
Später können n8n, Google Sheets, Supabase oder eine externe API angebunden werden.

## Deployment-Ablauf

Code → GitHub → Vercel → öffentliche URL
