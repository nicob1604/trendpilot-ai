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

5. Bestehende Trends lesen
   - Liest bestehende Trend-Zeilen aus dem Google Sheet, damit vorhandene IDs erkannt werden können.

6. Nur neue Trends filtern
   - Filtert Trends heraus, deren `id` bereits im Sheet vorhanden ist.

## Aktuelle Node-Kette

Manual Trigger -> Beispiel-Trends erzeugen -> Trend-Daten normalisieren -> Bestehende Trends lesen -> Nur neue Trends filtern -> In Google Sheets schreiben

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

- GitHub Free + Vercel Hobby/Free bleiben aktiv
- n8n-Test läuft nur manuell
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

Der Workflow `TrendPilot AI – Google Sheets Blueprint` wurde in n8n importiert, mit dem Google Sheet verbunden und manuell getestet.

Teststatus:

- Google Sheets Append funktioniert.
- Duplikat-Schutz funktioniert über die `id`.
- Wenn eine `id` bereits im Sheet vorhanden ist, wird sie nicht erneut geschrieben.

Aktueller Inhalt im Sheet:

- Agentic Workflows
- KI-Compliance Ops

Der Workflow nutzt aktuell einen Manual Trigger. Er läuft nicht automatisch. Publish ist aktuell nicht zwingend nötig, weil noch kein Schedule-, Webhook- oder App-Trigger verwendet wird.

Die bestehende TrendPilot AI App nutzt aktuell weiterhin Mock-Daten über `/api/trends`.
