# TrendPilot AI n8n Workflow Setup

## Zweck des Workflows

Dieser Blueprint bereitet einen kostenlosen n8n-Workflow vor, der später echte Trend-Daten für TrendPilot AI in ein Google Sheet schreiben kann.

Aktuell ist das nur eine Vorlage. Es ist noch keine echte Automation aktiv und es werden keine Credentials mitgeliefert.

## Enthaltene Nodes

1. Manual Trigger
   - Startet den Workflow manuell in n8n.

2. Beispiel-Trends erzeugen
   - Erstellt Testdaten für:
     - Agentic Workflows
     - KI-Compliance Ops

3. Trend-Daten normalisieren
   - Stellt sicher, dass jedes Item diese Felder enthält:
     - `id`
     - `name`
     - `category`
     - `status`
     - `score`
     - `businessImpact`
     - `summary`
     - `recommendation`
     - `source`
     - `timeframe`
     - `signalType`

4. In Google Sheets schreiben
   - Schreibt die normalisierten Trend-Daten als neue Zeilen in das geplante Google Sheet.

## Google-Sheet-Ziel

- Spreadsheet-ID: `1Gt8Lv1VY5CXRdqBYTDw8KPRSU-yMnXRI4IoB7bh6oLo`
- Tabellenblatt: `trends`
- gid: `29451432`

Google-Sheet-Link:

https://docs.google.com/spreadsheets/d/1Gt8Lv1VY5CXRdqBYTDw8KPRSU-yMnXRI4IoB7bh6oLo/edit?gid=29451432#gid=29451432

## Benötigte Credentials in n8n

Für den Google-Sheets-Node müssen später in n8n passende Google-Credentials gesetzt werden.

Die Blueprint-Datei enthält bewusst keine echten Credentials. Nach dem Import in n8n muss der Node `In Google Sheets schreiben` mit einem Google-Account verbunden werden, der Schreibzugriff auf das Sheet hat.

## Google-Sheets-Node verbinden

Nach dem Import in n8n:

1. Den Node `In Google Sheets schreiben` öffnen.
2. Google-Sheets-Credentials auswählen oder neu verbinden.
3. Spreadsheet-ID prüfen:
   `1Gt8Lv1VY5CXRdqBYTDw8KPRSU-yMnXRI4IoB7bh6oLo`
4. Tabellenblatt prüfen:
   `trends`
5. Sicherstellen, dass die Spalten exakt den dokumentierten Feldnamen entsprechen.
6. Workflow manuell testen.

## Kostenstatus

Die Datei ist kostenlos vorbereitet.

Es wurden keine kostenpflichtigen Dienste aktiviert:

- keine kostenpflichtige Domain
- keine kostenpflichtige Datenbank
- keine kostenpflichtigen APIs
- keine Vercel-Pro-Funktionen
- kein Vercel Agent

## Spätere Erweiterungen

Später können vor dem Normalisierungs-Node echte Quellen ergänzt werden, zum Beispiel:

- RSS-Feeds
- GitHub Repositories
- Tool-Webseiten
- AI-News-Seiten
- Product-Hunt-ähnliche Quellen
- externe APIs
- manuelle Review-Schritte

## Aktueller Status

Diese Datei und der JSON-Blueprint sind nur eine Vorbereitung. Es wurde noch keine echte n8n- oder Google-Sheets-Automation aktiviert.

Die bestehende TrendPilot AI App nutzt aktuell weiterhin Mock-Daten über `/api/trends`.
