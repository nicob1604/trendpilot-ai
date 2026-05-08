# `/api/trends`

Diese Datei dokumentiert die bestehende interne API-Route für TrendPilot AI.
Die Route kann echte Trend-Daten aus Google Sheets laden und fällt bei fehlender
Konfiguration oder Fehlern automatisch auf Mock-Daten zurück.

## Zweck

Die Route stellt Trend-Daten für das Dashboard bereit. Das Dashboard lädt seine
Daten clientseitig über:

```ts
fetch("/api/trends")
```

## Aktuelle Route

- Route: `/api/trends`
- Methode: `GET`
- Datenstatus: Google Sheets mit Mock-Daten als Fallback

## Aktuelles Rückgabeformat

```json
{
  "source": "google_sheets",
  "updatedAt": "2026-05-05T19:24:00.000Z",
  "count": 6,
  "trends": []
}
```

`trends` enthält ein Array von Trend-Objekten im Format, das in
`app/dashboard/data.ts` und `app/dashboard/trend-schema.md` dokumentiert ist.
`source` beschreibt die aktuelle Datenquelle. Mögliche Werte sind:

- `google_sheets`: Daten wurden erfolgreich aus Google Sheets geladen.
- `mock`: Google-Sheets-Env-Vars fehlen, daher werden Mock-Daten genutzt.
- `fallback`: Beim Laden aus Google Sheets ist ein Fehler aufgetreten, daher
  werden Mock-Daten genutzt.

`updatedAt` ist ein ISO-Zeitstempel der letzten Aktualisierung. `count` enthält
die Anzahl der gelieferten Trends.

## Aktueller Datenfluss

1. `app/dashboard/page.tsx` ruft `fetch("/api/trends")` auf.
2. `app/api/trends/route.ts` verarbeitet die `GET`-Anfrage.
3. Die Route versucht, Daten aus Google Sheets zu laden.
4. Wenn die Google-Sheets-Konfiguration fehlt oder ein Fehler auftritt, nutzt die
   Route `getTrends()` als Mock-Daten-Fallback.
5. Das Dashboard nutzt die geladenen Trends für Suche, Filter, Sortierung,
   Ergebnisanzahl, Trend Cards und Detail-Modal.

## Environment Variables

Für Google Sheets werden diese Environment Variables benötigt:

- `GOOGLE_SHEET_ID`
- `GOOGLE_SHEET_TAB`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

Der private Key darf nur als Environment Variable gespeichert werden. Wenn
`GOOGLE_PRIVATE_KEY` mit escaped line breaks gespeichert wird, ersetzt die Route
`\\n` automatisch durch echte Zeilenumbrüche.

Es dürfen keine Secrets, Private Keys oder Google-Service-Account-JSON-Dateien
ins Repository geschrieben werden.

## Spätere Datenquellen

Später kann die Route auch auf weitere echte Datenquellen erweitert werden, zum
Beispiel:

- n8n Webhook
- Supabase
- externe API

Idealerweise bleibt das Rückgabeformat gleich:

```json
{
  "source": "mock | n8n | google-sheets | supabase | api",
  "updatedAt": "2026-05-05T19:24:00.000Z",
  "count": 0,
  "trends": []
}
```

Dadurch kann `app/dashboard/page.tsx` möglichst unverändert bleiben.
