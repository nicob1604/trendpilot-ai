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
- `/api/trends` liest echte Daten aus Google Sheets
- Build erfolgreich getestet
- Startseite funktioniert online
- Dashboard funktioniert online
- API funktioniert online
- Der obere Dashboard-Button auf der Landingpage führt korrekt zu `/dashboard`
- Datenquelle im Dashboard ist `google_sheets`
- Aktuell werden 7 Trends aus Google Sheets geladen
- Nach dem YouTube-RSS-Test zeigt das Dashboard aktuell 12 Signale
- Dashboard-Statistiken werden dynamisch aus echten Trends berechnet
- Google Sheet wurde bereinigt und ein Backup-Tab wurde erstellt
- Icon/Favicon und Metadata wurden ergänzt
- GitHub und Vercel sind aktuell

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

Aktueller Live-Status:

- `source`: `google_sheets`
- `count`: 7 Trends
- YouTube-RSS-Testdaten erhöhen den sichtbaren Dashboard-Stand aktuell auf 12 Signale
- Google Sheets ist live angebunden
- Vercel Environment Variables sind gesetzt

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

Aktuell echte Google-Sheet-Daten über `/api/trends`.
Mock-Daten bleiben als Fallback im Code erhalten.
Später vorbereitet für weitere RSS-Quellen, n8n-Erweiterungen, Supabase oder externe APIs.

## Geplante Google-Sheet-Datenquelle

Dieses Google Sheet ist die geplante kostenlose Start-Datenquelle für echte Trend-Daten:

https://docs.google.com/spreadsheets/d/1Gt8Lv1VY5CXRdqBYTDw8KPRSU-yMnXRI4IoB7bh6oLo/edit?gid=29451432#gid=29451432

- Spreadsheet-ID: `1Gt8Lv1VY5CXRdqBYTDw8KPRSU-yMnXRI4IoB7bh6oLo`
- Tabellenblatt: `trends`
- gid: `29451432`
- Status: Das Google Sheet ist live angebunden, bereinigt und enthält aktuell 7 Trends.
- Backup-Tab: erstellt.

Die App nutzt aktuell echte Google-Sheet-Daten über `/api/trends`. Vercel Environment Variables sind gesetzt. Es dürfen keine Secrets, Private Keys oder Google-Service-Account-JSON-Dateien ins Repository geschrieben werden.

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
- RSS-Filterlogik und Scoring wurden verbessert.
- Das Dashboard nutzt echte Google-Sheet-Daten über `/api/trends`.

Nächster großer Schritt:

Weitere RSS-Quellen ergänzen oder optional später einen Schedule Trigger aktivieren.
Ein Schedule Trigger soll erst aktiviert werden, wenn das ausdrücklich gewünscht ist.

## n8n-YouTube-RSS-Testworkflow-Status

Der separate Workflow `TrendPilot AI – YouTube RSS Test Branch` wurde zum YouTube-Multi-Source-Teststand erweitert und erfolgreich manuell getestet.

Testdetails:

- YouTube wurde nicht über die YouTube Data API angebunden.
- YouTube wird per Channel-RSS genutzt.
- Es werden keine neuen API-Keys benötigt.
- Es wurden keine neuen Secrets angelegt.
- Integrierte Quellen:
  - YouTube – OpenAI
  - YouTube – Google DeepMind
  - YouTube – NVIDIA Developer
- YouTube-Quellen werden im Workflow konfiguriert.
- RSS Feeds werden per HTTP gelesen.
- Feed-XML wird über XML to JSON umgewandelt.
- Danach werden YouTube-Daten in Trend-Kandidaten umgewandelt.
- Pro Quelle werden maximal 5 neue Videos verarbeitet.
- Die Daten werden normalisiert.
- Bestehende Trends werden gelesen.
- Nur neue Trends werden gefiltert.
- Neue Trends werden in Google Sheets geschrieben.
- Duplikate werden über `id` geprüft.
- Source-Mapping funktioniert:
  - OpenAI -> YouTube – OpenAI
  - Google DeepMind -> YouTube – Google DeepMind
  - NVIDIA Developer -> YouTube – NVIDIA Developer
- Google Sheet zeigt YouTube-Trends korrekt an.
- `/api/trends` liest die neuen YouTube-Trends aus Google Sheets.
- Dashboard zeigt jetzt 12 Signale.
- `signalType`: `YouTube`
- `source`: `YouTube – OpenAI`, `YouTube – Google DeepMind` oder `YouTube – NVIDIA Developer`

Sicherheits- und Betriebsstatus:

- Der YouTube-Test ist aktuell manuell.
- Kein Schedule Trigger ist aktiv.
- Keine YouTube API wird genutzt.
- Keine zusätzlichen Kosten.
- Keine kostenpflichtigen Dienste wurden aktiviert.
- Der Workflow ist als separater Test-Branch gespeichert.
- Gesicherte Exportdatei: `n8n-trendpilot-youtube-current.json`
- Die Datei wurde auf `private_key` geprüft.
- Es wurde kein `private_key` gefunden.
- Die Datei wurde committed und gepusht.
- Keine Secrets, Private Keys oder geheimen Environment-Variable-Werte dokumentieren.

Weitere mögliche YouTube-Quellen für später:

- Microsoft Developer
- Hugging Face
- AI at Meta
- Everlast AI
- Christoph Magnussen
- Niklas Steenfatt

## Build-Status

`npm.cmd run build` wurde erfolgreich ausgeführt.

## Kostenstatus

Weiterhin GitHub Free + Vercel Hobby/Free.
Aktuell wird der kostenlose GitHub-Free- und Vercel-Hobby/Free-Workflow genutzt.
Keine kostenpflichtigen Zusatzfunktionen wurden aktiviert.
Keine kostenpflichtigen Dienste aktivieren.
n8n-Test läuft nur manuell.
RSS-Testworkflow läuft nur manuell.
YouTube-RSS-Testworkflow läuft nur manuell.
Es ist kein Schedule Trigger aktiv.
Keine kostenpflichtigen Dienste sind aktiv.

Nicht aktivieren:

- Vercel Pro
- Vercel Agent
- kostenpflichtige Domain
- kostenpflichtige Datenbank
- kostenpflichtige Add-ons

## Nächste mögliche Schritte

- Vercel-Projekt weiter beobachten
- Weitere RSS-Quellen ergänzen
- Weitere YouTube-Quellen ergänzen
- Optional später einen Schedule Trigger aktivieren
- Schedule Trigger nur aktivieren, wenn ausdrücklich gewünscht
- Domain vorbereiten, aber keine kostenpflichtige Domain aktivieren
