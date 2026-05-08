# TrendPilot AI

## Aktueller Status

TrendPilot AI ist öffentlich deployed und funktionsfähig.
Deployment ist live und funktionsfähig.
Startseite, Dashboard und API wurden online geprüft.

## GitHub Repository

https://github.com/nicob1604/trendpilot-ai

## Vercel Deployment

Das Projekt wurde erfolgreich über Vercel deployed.

## Öffentliche Vercel-URL

https://trendpilot-ai-two.vercel.app

## Aktueller Stand

- Landingpage vorhanden
- Dashboard vorhanden
- Interne API vorhanden
- Mock-Daten über `/api/trends`
- Build erfolgreich getestet
- Startseite funktioniert online
- Dashboard funktioniert online
- API funktioniert online

## Wichtige Routen

- `/`
- `/dashboard`
- `/api/trends`

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

## Wichtige Dateien

- `app/page.tsx`
- `app/dashboard/page.tsx`
- `app/dashboard/data.ts`
- `app/dashboard/trend-source.ts`
- `app/api/trends/route.ts`
- `DEPLOYMENT.md`
- `PROJECT_STATUS.md`

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

## Geplante Google-Sheet-Datenquelle

Dieses Google Sheet ist die geplante kostenlose Start-Datenquelle für echte Trend-Daten:

https://docs.google.com/spreadsheets/d/1Gt8Lv1VY5CXRdqBYTDw8KPRSU-yMnXRI4IoB7bh6oLo/edit?gid=29451432#gid=29451432

- Spreadsheet-ID: `1Gt8Lv1VY5CXRdqBYTDw8KPRSU-yMnXRI4IoB7bh6oLo`
- Tabellenblatt: `trends`
- gid: `29451432`
- Status: Das Google Sheet wurde erstellt und enthält bereits die Header-Zeile mit allen benötigten Trend-Feldern.
- Erster Test-Trend: `Agentic Workflows`

Die App nutzt aktuell noch Mock-Daten über `/api/trends`. Es wurde noch keine echte Google-Sheets-Anbindung umgesetzt. Später soll `/api/trends` die Daten aus diesem Sheet oder über n8n beziehen.

## n8n-Workflow-Status

Der Workflow `TrendPilot AI – Google Sheets Blueprint` wurde in n8n importiert, mit dem Google Sheet verbunden und manuell getestet.

Aktuelle Node-Kette:

Manual Trigger -> Beispiel-Trends erzeugen -> Trend-Daten normalisieren -> Bestehende Trends lesen -> Nur neue Trends filtern -> In Google Sheets schreiben

Google Sheet:

https://docs.google.com/spreadsheets/d/1Gt8Lv1VY5CXRdqBYTDw8KPRSU-yMnXRI4IoB7bh6oLo/edit?gid=29451432#gid=29451432

Teststatus:

- Der Workflow wurde manuell getestet.
- Google Sheets Append funktioniert.
- Duplikat-Schutz funktioniert über die `id`.
- Wenn eine `id` bereits im Sheet vorhanden ist, wird sie nicht erneut geschrieben.

Aktueller Inhalt im Sheet:

- Agentic Workflows
- KI-Compliance Ops

Wichtig:

- Der Workflow nutzt aktuell einen Manual Trigger.
- Er läuft nicht automatisch.
- Publish ist aktuell nicht zwingend nötig, weil noch kein Schedule-, Webhook- oder App-Trigger verwendet wird.
- Die App nutzt weiterhin Mock-Daten über `/api/trends`.

## n8n-RSS-Testworkflow-Status

Der RSS-Testworkflow `TrendPilot AI – RSS Test Branch` funktioniert manuell.

Testdetails:

- RSS Read funktioniert mit `https://www.theverge.com/rss/index.xml`.
- RSS-Daten werden in Trend-Kandidaten umgewandelt.
- Die Trend-Daten werden normalisiert.
- Google Sheets wird über den Google Service Account gelesen und beschrieben.
- Neue RSS-Trends wurden erfolgreich ins Google Sheet geschrieben.
- Ein zweiter Lauf hat keine Duplikate geschrieben.
- Der Duplikat-Schutz funktioniert über das Feld `id`.

Sicherheits- und Betriebsstatus:

- Der aktuelle Workflow läuft weiterhin nur manuell.
- Es ist kein Schedule Trigger aktiv.
- Es sind keine kostenpflichtigen Dienste aktiviert.
- Der sichere Workflow-Export heißt `n8n-trendpilot-rss-current.json`.
- Die Datei wurde auf `private_key` geprüft und enthält keinen Google-Service-Account-Private-Key.
- Keine Secrets, Private Keys oder Google-Service-Account-JSON-Dateien committen.
- Das Dashboard nutzt weiterhin Mock-Daten über `/api/trends`.

Nächster großer Schritt:

`/api/trends` auf echte Google-Sheet-Daten umstellen, mit Mock-Daten als Fallback.

## Build-Status

`npm.cmd run build` wurde erfolgreich ausgeführt.

## Kostenstatus

Weiterhin GitHub Free + Vercel Hobby/Free.
Aktuell wird der kostenlose GitHub-Free- und Vercel-Hobby/Free-Workflow genutzt.
Keine kostenpflichtigen Zusatzfunktionen wurden aktiviert.
Keine kostenpflichtigen Dienste aktivieren.
n8n-Test läuft nur manuell.
RSS-Testworkflow läuft nur manuell.
Es ist kein Schedule Trigger aktiv.

Nicht aktivieren:

- Vercel Pro
- Vercel Agent
- kostenpflichtige Domain
- kostenpflichtige Datenbank
- kostenpflichtige Add-ons

## Nächste mögliche Schritte

- Vercel-Projekt weiter beobachten
- Domain vorbereiten, aber keine kostenpflichtige Domain aktivieren
- echte Datenquelle anbinden
