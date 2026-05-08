# TrendPilot AI Trend Sources Plan

## 1. Ziel

TrendPilot AI soll später echte KI-Trends, Tool-Updates, Produktlaunches, GitHub-Signale, RSS-News und manuelle Signale sammeln, bewerten und ins Google Sheet schreiben.

## 2. Aktueller Stand

- Dashboard läuft live
- `/api/trends` läuft live
- Google Sheet ist vorbereitet
- n8n-Workflow ist importiert
- Google-Sheets-Append funktioniert
- Duplikat-Schutz über `id` funktioniert
- Der RSS-Testworkflow `TrendPilot AI – RSS Test Branch` funktioniert manuell
- RSS Read funktioniert mit `https://www.theverge.com/rss/index.xml`
- RSS-Daten werden in Trend-Kandidaten umgewandelt und normalisiert
- Google Sheets wird über den Google Service Account gelesen und beschrieben
- Neue RSS-Trends wurden erfolgreich ins Google Sheet geschrieben
- Ein zweiter Lauf hat keine Duplikate geschrieben
- Der Duplikat-Schutz funktioniert über das Feld `id`
- Der aktuelle Workflow läuft weiterhin nur manuell
- Es ist kein Schedule Trigger aktiv
- Der sichere Workflow-Export heißt `n8n-trendpilot-rss-current.json`
- Die Datei wurde auf `private_key` geprüft und enthält keinen Google-Service-Account-Private-Key
- Das Dashboard nutzt weiterhin Mock-Daten über `/api/trends`

## 3. Empfohlene erste kostenlose Quellen

| Quelle | Typ | Kostenstatus | Schwierigkeit | Nutzen | Priorität |
| --- | --- | --- | --- | --- | --- |
| Manuelle Google-Sheets-Einträge | manuell | kostenlos | niedrig | direkte Kontrolle über erste echte Trend-Daten | sehr hoch |
| RSS-Feeds von AI-News-Seiten | RSS | meist kostenlos | niedrig bis mittel | gut strukturierte News- und Trend-Signale | sehr hoch |
| GitHub-Repositories / GitHub-Suche | Entwickler-Signale | kostenlos nutzbar | mittel | frühe technische Momentum-Signale | hoch |
| Tool-Webseiten / Produktseiten | Produkt-Signale | kostenlos prüfbar | mittel | direkte Hinweise auf neue Features und Launches | mittel |
| Product-Launch-Seiten | Launch-Signale | kostenlos prüfbar | mittel | erkennt neue Tools und Marktaktivität | mittel |
| Newsletter-Inhalte, falls manuell kopiert | manuell / kuratiert | kostenlos, falls vorhanden | niedrig | gute kuratierte Signale ohne direkte Integration | mittel |
| eigene Recherche-Ergebnisse, manuell eingefügt | manuell | kostenlos | niedrig | schnelle Ergänzung relevanter Beobachtungen | hoch |

## 4. Empfohlene Startstrategie

Stufe 1:
Manuelle Einträge + n8n-Testworkflow

Stufe 2:
RSS-Feeds ergänzen

Stufe 3:
GitHub-Signale ergänzen

Stufe 4:
Tool-Webseiten / Produktseiten prüfen

Stufe 5:
Bewertungslogik verbessern

## 5. Warum RSS zuerst sinnvoll ist

RSS ist für den Start gut, weil:

- oft kostenlos
- gut automatisierbar
- strukturierte Daten liefert
- mit n8n relativ einfach testbar
- keine komplexe API nötig ist

## 6. Datenverarbeitung in n8n

Geplanter Ablauf:

Quelle lesen -> Rohdaten extrahieren -> Trend-Kandidaten erzeugen -> Daten normalisieren -> Score berechnen -> Duplikate prüfen -> neue Trends ins Google Sheet schreiben

Aktueller RSS-Testablauf:

RSS Read -> RSS-Daten in Trend-Kandidaten umwandeln -> Trend-Daten normalisieren -> Google Sheets lesen -> Nur neue Trends über `id` filtern -> neue RSS-Trends ins Google Sheet schreiben

## 7. Trend-Bewertung

Erste Bewertungslogik:

- Aktualität
- Business Impact
- Momentum
- Relevanz für Marketing, Produkt und Innovation
- Signalstärke
- Umsetzbarkeit
- Tool- oder Marktbezug

## 8. Kostenlos bleiben

- keine kostenpflichtigen APIs nutzen
- keine kostenpflichtigen Datenbanken nutzen
- keine kostenpflichtigen Vercel-Funktionen aktivieren
- keine kostenpflichtige Domain aktivieren
- keine bezahlten Scraping-Dienste nutzen
- keine Vercel-Agent-Funktionen aktivieren
- keine Secrets, Private Keys oder Google-Service-Account-JSON-Dateien committen
- keine automatische Ausführung ohne bewusste Freigabe aktivieren

## 9. Nächster technischer Schritt nach dieser Datei

Der nächste große Schritt nach dieser Dokumentation ist:

`/api/trends` auf echte Google-Sheet-Daten umstellen, mit Mock-Daten als Fallback.

## 10. Noch nicht umsetzen

- Keine echte RSS-Anbindung in der App
- Keine Änderung an `/api/trends`
- Keine Änderung am Dashboard
- Keine externe Datenquelle aktivieren
- Keine kostenpflichtigen Dienste aktivieren
- Kein Schedule Trigger aktivieren
- Keine Secrets oder Private Keys committen
