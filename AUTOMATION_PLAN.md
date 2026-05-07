# TrendPilot AI Automation Plan

## 1. Ziel der Automation

TrendPilot AI soll relevante KI-Trends, Tools, Produktupdates und Marktsignale sammeln, bewerten, strukturieren und dem Dashboard bereitstellen.

## 2. Aktueller Stand

- Dashboard funktioniert live
- API `/api/trends` funktioniert live
- Aktuell werden Mock-Daten genutzt
- Datenformat ist bereits dokumentiert
- n8n-Payload-Beispiel ist vorhanden
- Google-Sheets-Struktur ist vorhanden

## 3. Empfohlener kostenloser Start-Aufbau

Google Sheets + n8n + bestehende API

## 3.1 Geplante Google-Sheet-Datenquelle

Das folgende Google Sheet ist die geplante kostenlose Start-Datenquelle für echte Trend-Daten:

https://docs.google.com/spreadsheets/d/1Gt8Lv1VY5CXRdqBYTDw8KPRSU-yMnXRI4IoB7bh6oLo/edit?gid=29451432#gid=29451432

- Spreadsheet-ID: `1Gt8Lv1VY5CXRdqBYTDw8KPRSU-yMnXRI4IoB7bh6oLo`
- Tabellenblatt: `trends`
- gid: `29451432`
- Status: Das Sheet wurde erstellt und enthält bereits die Header-Zeile mit allen benötigten Trend-Feldern.
- Erster Test-Trend: `Agentic Workflows`

Die App nutzt aktuell noch Mock-Daten über `/api/trends`. Es wurde noch keine echte Google-Sheets-Anbindung umgesetzt. Später soll `/api/trends` die Daten aus diesem Sheet oder über n8n beziehen.

## 3.2 n8n-Teststatus

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

## 4. Geplanter Datenfluss

Quellen -> n8n Workflow -> Bewertung/Normalisierung -> Google Sheets -> API `/api/trends` -> Dashboard

## 5. Mögliche Quellen

- AI-News-Seiten
- Tool-Webseiten
- GitHub Repositories
- Product-Hunt-ähnliche Quellen
- RSS-Feeds
- manuelle Einträge in Google Sheets

## 6. Trend-Datenfelder

Die Automation soll das bestehende Datenformat nutzen:

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

## 7. Bewertungslogik

Eine erste einfache Bewertungslogik kann diese Faktoren berücksichtigen:

- Relevanz
- Aktualität
- Business Impact
- Momentum
- Zielgruppen-Fit
- Signalstärke

## 8. Score-Idee

Score von 0 bis 100:

- 80-100 = Hohe Relevanz
- 60-79 = Beobachten
- 0-59 = Niedrige Priorität oder Archiv

## 9. Statuslogik

Mögliche Statuswerte:

- Neu
- Hohe Relevanz
- Beobachten
- Archiv

## 10. Kostenlos bleiben

Der aktuelle kostenlose Workflow soll erhalten bleiben:

- GitHub Free bleibt aktiv
- Vercel Hobby/Free bleibt aktiv
- n8n-Test läuft nur manuell
- keine kostenpflichtige Domain
- keine kostenpflichtige Datenbank
- keine kostenpflichtigen APIs
- keine Vercel-Pro-Funktionen
- kein Vercel Agent
- keine kostenpflichtigen Dienste aktivieren

## 11. Nächste technische Schritte

- Google Sheet für echte Trend-Daten weiter pflegen
- Spalten exakt nach `google-sheets-structure.md` erstellen
- n8n Workflow planen
- ersten manuellen Testdatensatz in Google Sheets eintragen
- später API von Mock-Daten auf echte Datenquelle umstellen

## 12. Noch nicht umsetzen

Diese Datei ist nur die Planung. Der n8n-Workflow wurde manuell getestet, aber es wird noch keine automatische n8n- oder Google-Sheets-Anbindung in der App genutzt.
