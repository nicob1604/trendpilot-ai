# `/api/trends`

Diese Datei dokumentiert die bestehende interne API-Route für TrendPilot AI.
Es wird noch keine echte externe Datenanbindung umgesetzt.

## Zweck

Die Route stellt Trend-Daten für das Dashboard bereit. Das Dashboard lädt seine
Daten clientseitig über:

```ts
fetch("/api/trends")
```

## Aktuelle Route

- Route: `/api/trends`
- Methode: `GET`
- Datenstatus: Mock-Daten

## Aktuelles Rückgabeformat

```json
{
  "source": "mock",
  "updatedAt": "2026-05-05T19:24:00.000Z",
  "count": 6,
  "trends": []
}
```

`trends` enthält ein Array von Trend-Objekten im Format, das in
`app/dashboard/data.ts` und `app/dashboard/trend-schema.md` dokumentiert ist.
`source` beschreibt die aktuelle Datenquelle. `updatedAt` ist ein ISO-Zeitstempel
der letzten Aktualisierung. `count` enthält die Anzahl der gelieferten Trends.

## Aktueller Datenfluss

1. `app/dashboard/page.tsx` ruft `fetch("/api/trends")` auf.
2. `app/api/trends/route.ts` verarbeitet die `GET`-Anfrage.
3. Die Route nutzt aktuell `getTrends()`.
4. `getTrends()` gibt aktuell Mock-Daten aus `app/dashboard/data.ts` zurück.
5. Das Dashboard nutzt die geladenen Trends für Suche, Filter, Sortierung,
   Ergebnisanzahl, Trend Cards und Detail-Modal.

## Spätere Datenquellen

Später kann entweder `getTrends()` oder die Route selbst auf echte Datenquellen
umgestellt werden, zum Beispiel:

- n8n Webhook
- Google Sheets
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
