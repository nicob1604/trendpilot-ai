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
   - Optional werden zusätzlich Artikel- und Quellenfelder vorbereitet:
     - `sourceUrl`
     - `publishedAt`
     - `articleTitle`
     - `articleSummary`
     - `articleBody`
     - `sourceName`

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

## Optionale Artikel- und Quellenfelder

Das Google Sheet unterstützt zusätzlich zu den Pflichtfeldern jetzt optionale Artikel- und Quellenfelder in den Spalten L bis Q:

| Spalte | Feld | Bedeutung |
| --- | --- | --- |
| L | `sourceUrl` | Direkter Link zur Originalquelle, zum Beispiel RSS-Artikel oder YouTube-Video. |
| M | `publishedAt` | Veröffentlichungszeitpunkt aus RSS- oder YouTube-RSS-Daten, falls vorhanden. |
| N | `articleTitle` | Titel für die Detailseite, bevorzugt aus RSS- oder YouTube-Titel. |
| O | `articleSummary` | Kurze Einordnung aus vorhandenen Feed-Beschreibungen. |
| P | `articleBody` | Längere Artikelansicht aus vorhandenen Feed-Feldern, ohne externe Anreicherung. |
| Q | `sourceName` | Lesbarer Quellenname, zum Beispiel `The Verge RSS` oder `YouTube – OpenAI`. |

Wenn `sourceUrl` vorhanden ist, zeigt die Trend-Detailseite automatisch den Button `Originalquelle öffnen`. Der Link wird in einem neuen Tab geöffnet. Wenn `sourceUrl` fehlt, bleibt die Detailseite funktionsfähig und zeigt nur den Quellennamen.

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

## RSS-Testworkflow

Der RSS-Testworkflow `TrendPilot AI – RSS Test Branch` funktioniert manuell.

Testdetails:

- RSS Read funktioniert mit `https://www.theverge.com/rss/index.xml`.
- RSS-Daten werden in Trend-Kandidaten umgewandelt.
- Die Trend-Daten werden normalisiert.
- Google Sheets wird über den Google Service Account gelesen und beschrieben.
- Neue RSS-Trends wurden erfolgreich ins Google Sheet geschrieben.
- Ein zweiter Lauf hat keine Duplikate geschrieben.
- Der Duplikat-Schutz funktioniert über das Feld `id`.

Aktueller Betriebsstatus:

- Der Workflow läuft weiterhin nur manuell.
- Es ist kein Schedule Trigger aktiv.
- Es sind keine kostenpflichtigen Dienste aktiviert.
- Der sichere Workflow-Export heißt `n8n-trendpilot-rss-current.json`.
- Die Datei wurde auf `private_key` geprüft und enthält keinen Google-Service-Account-Private-Key.
- Das Dashboard nutzt weiterhin Mock-Daten über `/api/trends`.
- Keine Secrets, Private Keys oder Google-Service-Account-JSON-Dateien committen.

Der nächste große Schritt nach dieser Dokumentation ist die Umstellung von `/api/trends` auf echte Google-Sheet-Daten mit Mock-Daten als Fallback.

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
