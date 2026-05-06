# TrendPilot AI

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

## Aktueller Build-Status

Build erfolgreich getestet.

Routen:

- `/`
- `/dashboard`
- `/api/trends`

## Hinweis

PowerShell / `npm.cmd run dev` ist nur für lokale Entwicklung.
Später läuft die Seite online über Vercel, Netlify oder eine eigene Domain.

## Geplanter späterer Ablauf

Code → GitHub → Vercel oder Netlify → öffentliche URL

## Aktueller Datenstatus

Das Dashboard lädt aktuell Mock-Daten über die interne API `/api/trends`.
Später können n8n, Google Sheets, Supabase oder eine externe API angebunden werden.
