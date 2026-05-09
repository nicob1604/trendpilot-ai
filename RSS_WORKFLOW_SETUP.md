# TrendPilot AI RSS Workflow Setup

## 1. Ziel des RSS-Testzweigs

Der RSS-Testzweig soll vorbereiten, wie TrendPilot AI später echte KI-Trends, Tool-Updates und Marktsignale aus RSS-Feeds lesen, in das bestehende Trend-Datenformat umwandeln und ins Google Sheet schreiben kann.

Der RSS-Testworkflow `TrendPilot AI – RSS Test Branch` funktioniert inzwischen manuell. Es ist weiterhin kein produktiver automatischer RSS-Import aktiv.

Aktueller MVP-Stand:

- Landingpage und Dashboard funktionieren live auf Vercel.
- `/api/trends` liest echte Google-Sheet-Daten.
- Datenquelle im Dashboard ist `google_sheets`.
- Aktuell werden 7 Trends geladen.
- Nach dem YouTube-RSS-Test zeigt das Dashboard aktuell 12 Signale.
- Dashboard-Statistiken werden dynamisch aus echten Trends berechnet.
- Vercel Environment Variables sind gesetzt.
- Google Sheet wurde bereinigt und ein Backup-Tab wurde erstellt.

## 2. Geplanter Ablauf

Manual Trigger -> RSS Feed lesen -> RSS-Daten in Trend-Kandidaten umwandeln -> Trend-Daten normalisieren -> Bestehende Trends lesen -> Nur neue Trends filtern -> Neue Trends in Google Sheets schreiben

## 3. Enthaltene Nodes

1. Manual Trigger
   - Startet den RSS-Testzweig manuell.

2. RSS Feed per HTTP lesen
   - Liest einen RSS-Feed.
   - Erfolgreich getestet mit:
     `https://www.theverge.com/rss/index.xml`

3. RSS-Daten in Trend-Kandidaten umwandeln
   - Extrahiert RSS-Titel, Link, Beschreibung und Veröffentlichungsdatum.
   - Erstellt daraus erste Trend-Kandidaten.

4. Trend-Daten normalisieren
   - Stellt sicher, dass alle benötigten Trend-Felder vorhanden sind.
   - Bereinigt `id`, `name`, `category`, `status` und `score`.

5. Bestehende Trends lesen
   - Liest vorhandene Zeilen aus dem Google Sheet.

6. Nur neue Trends filtern
   - Vergleicht neue Trend-Kandidaten mit bestehenden Sheet-Zeilen.
   - Verwendet dafür die `id`.

7. Neue Trends in Google Sheets schreiben
   - Schreibt nur neue Trends in das Tabellenblatt `trends`.

## 4. RSS-Feed-URLs eintragen

Die RSS-URL wird im Node `RSS Feed per HTTP lesen` eingetragen.

Erfolgreich getestete RSS-URL:

`https://www.theverge.com/rss/index.xml`

Später kann dieser Wert durch weitere echte RSS-Feed-URLs ersetzt oder ergänzt werden, zum Beispiel von AI-News-Seiten, Produktblogs oder Tool-Webseiten.

## 5. Umwandlung von RSS-Items in Trend-Felder

Der Code Node `RSS-Daten in Trend-Kandidaten umwandeln` bildet RSS-Daten auf diese Trend-Felder ab:

- `id`: wird aus dem RSS-Titel, Link oder Veröffentlichungsdatum erzeugt
- `name`: RSS-Titel
- `category`: Standardwert `AI News`
- `status`: Standardwert `Neu`
- `score`: Standardwert `70`
- `businessImpact`: Kurzfassung aus der RSS-Beschreibung
- `summary`: Zusammenfassung aus der RSS-Beschreibung
- `recommendation`: Standardempfehlung zur fachlichen Prüfung
- `source`: RSS-Link oder `RSS Feed`
- `timeframe`: Standardwert `Heute`
- `signalType`: Standardwert `RSS`

Diese Werte sind Startwerte. Sie sollen später durch eine bessere Bewertungslogik ergänzt oder manuell überprüft werden.

## 6. Duplikate über `id` verhindern

Der Workflow liest vor dem Schreiben bestehende Trends aus dem Google Sheet.

Der Node `Nur neue Trends filtern` erstellt eine Liste vorhandener IDs. Nur Trend-Kandidaten mit einer neuen `id` werden an den Google-Sheets-Append-Node weitergegeben.

Wenn eine `id` bereits im Sheet vorhanden ist, wird sie nicht erneut geschrieben.

Der manuelle Test hat bestätigt:

- Neue RSS-Trends wurden erfolgreich ins Google Sheet geschrieben.
- Ein zweiter Lauf hat keine Duplikate geschrieben.
- Der Duplikat-Schutz funktioniert über das Feld `id`.

## 6.1 Aktueller RSS-Teststatus

- Der Workflow `TrendPilot AI – RSS Test Branch` funktioniert manuell.
- RSS Read funktioniert mit `https://www.theverge.com/rss/index.xml`.
- RSS-Daten werden in Trend-Kandidaten umgewandelt.
- Die Trend-Daten werden normalisiert.
- Google Sheets wird über den Google Service Account gelesen und beschrieben.
- RSS-Filterlogik und Scoring wurden verbessert.
- Neue RSS-Trends wurden erfolgreich ins Google Sheet geschrieben.
- Ein zweiter Lauf hat keine Duplikate geschrieben.
- Duplikat-Schutz funktioniert über `id`.
- Der aktuelle Workflow läuft weiterhin nur manuell.
- Es ist kein Schedule Trigger aktiv.
- Der sichere Workflow-Export heißt `n8n-trendpilot-rss-current.json`.
- Die Datei wurde auf `private_key` geprüft und enthält keinen Google-Service-Account-Private-Key.
- Das Dashboard nutzt echte Google-Sheet-Daten über `/api/trends`.

## 7. Hinweise

- Der Workflow ist noch nicht automatisch aktiv.
- Es ist kein Schedule Trigger aktiv.
- Es werden keine kostenpflichtigen Dienste genutzt.
- Es ist noch kein produktiver automatischer RSS-Import aktiv.
- Keine Secrets, Private Keys oder Google-Service-Account-JSON-Dateien committen.
- Die bestehende App nutzt echte Google-Sheet-Daten über `/api/trends`.
- Es gibt keine Änderung an `/api/trends`.
- Es gibt keine Änderung am Dashboard.
- Es gibt keine Änderung an der Landingpage.
- Keine kostenpflichtigen Dienste sind aktiv.
- Ein Schedule Trigger soll erst aktiviert werden, wenn das ausdrücklich gewünscht ist.

Der nächste mögliche Schritt nach dieser Dokumentation ist, weitere RSS-Quellen zu ergänzen oder optional später einen Schedule Trigger zu aktivieren.

## 7.1 YouTube-RSS-Testworkflow

Der separate Workflow `TrendPilot AI – YouTube RSS Test Branch` wurde erfolgreich manuell getestet.

YouTube-RSS ist als neue Quellenart erfolgreich getestet.

Testdetails:

- YouTube wurde nicht über die YouTube Data API angebunden.
- Stattdessen wird YouTube per Channel-RSS genutzt.
- Es werden keine neuen API-Keys benötigt.
- Es wurden keine neuen Secrets angelegt.
- OpenAI wurde als erste offizielle YouTube-Quelle getestet.
- Feed wird per HTTP gelesen.
- Feed-XML wird über XML to JSON umgewandelt.
- Danach werden YouTube-Daten in Trend-Kandidaten umgewandelt.
- Die Ausgabe ist bewusst auf die 5 neuesten Videos begrenzt.
- Die Daten werden normalisiert.
- Duplikate werden über `id` geprüft.
- 5 neue YouTube-Trends wurden erfolgreich ins Google Sheet geschrieben.
- `/api/trends` liest die neuen YouTube-Trends aus Google Sheets.
- Dashboard zeigt jetzt 12 Signale.
- `signalType`: `YouTube`
- `source`: `YouTube – OpenAI`

Sicherheits- und Betriebsstatus:

- Der YouTube-Test ist aktuell manuell.
- Keine YouTube API wird genutzt.
- Keine zusätzlichen Kosten.
- Kein Schedule Trigger ist aktiv.
- Keine kostenpflichtigen Dienste wurden aktiviert.
- Der Workflow ist als separater Test-Branch gespeichert.
- Gesicherte Exportdatei: `n8n-trendpilot-youtube-current.json`
- Die Datei wurde auf `private_key` geprüft.
- Es wurde kein `private_key` gefunden.
- Die Datei wurde committed und gepusht.
- Keine Secrets, Private Keys oder geheimen Environment-Variable-Werte dokumentieren.

Weitere mögliche YouTube-Quellen für später:

- Google DeepMind
- Microsoft Developer
- NVIDIA Developer
- Hugging Face
- AI at Meta
- Niklas Steenfatt
- Christoph Magnussen
- Everlast AI

## 8. Google-Sheet-Ziel

- Spreadsheet-ID: `1Gt8Lv1VY5CXRdqBYTDw8KPRSU-yMnXRI4IoB7bh6oLo`
- Tabellenblatt: `trends`
- gid: `29451432`

Google-Sheet-Link:

https://docs.google.com/spreadsheets/d/1Gt8Lv1VY5CXRdqBYTDw8KPRSU-yMnXRI4IoB7bh6oLo/edit?gid=29451432#gid=29451432

## 9. Benötigte Trend-Felder

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
