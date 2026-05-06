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

Diese Datei ist nur die Planung. Es wird noch keine echte n8n- oder Google-Sheets-Anbindung umgesetzt.
