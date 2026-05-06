# TrendPilot AI

## Aktueller Stand

- Landingpage vorhanden
- Dashboard vorhanden
- Interne API vorhanden
- Mock-Daten über `/api/trends`
- Build erfolgreich getestet

## Wichtige Routen

- `/`
- `/dashboard`
- `/api/trends`

## Wichtige Dateien

- `app/page.tsx`
- `app/dashboard/page.tsx`
- `app/dashboard/data.ts`
- `app/dashboard/trend-source.ts`
- `app/api/trends/route.ts`
- `DEPLOYMENT.md`

## Dashboard-Funktionen

- Suche
- Filter
- Sortierung
- Ergebnisanzahl
- Trend Cards
- Detail-Modal
- Escape-Schließen
- Klick außerhalb schließt Modal
- Datenquelle-Anzeige
- Zuletzt aktualisiert
- Aktualisieren-Button
- Responsive Layout

## Datenstatus

Aktuell Mock-Daten.
Später vorbereitet für n8n, Google Sheets, Supabase oder externe API.

## Build-Status

`npm.cmd run build` wurde erfolgreich ausgeführt.

## Nächste mögliche Schritte

- GitHub Repository erstellen
- Code pushen
- Vercel oder Netlify verbinden
- Domain vorbereiten
- echte Datenquelle anbinden
