# Google-Sheets-Struktur für TrendPilot AI Trends

Diese Struktur ist noch keine echte Anbindung, sondern nur die Vorbereitung für eine spätere Google-Sheets- oder n8n-Integration.

Jede Tabellenzeile entspricht einem Trend. Die Spaltennamen sollten exakt wie unten beschrieben verwendet werden, damit n8n, Google Sheets, Supabase oder eine API die Daten später sauber in das Dashboard-Format übertragen können.

## Empfohlene Spalten

| Spalte | Beschreibung | Beispielwert | Pflichtfeld |
| --- | --- | --- | --- |
| `id` | Eindeutige stabile Kennung für den Trend. | `agentic-workflows` | Ja |
| `name` | Sichtbarer Name des Trends. | `Agentic Workflows` | Ja |
| `category` | Thematische Kategorie des Trends. | `Workflows` | Ja |
| `status` | Status für Filter und Priorisierung. | `Hohe Relevanz` | Ja |
| `score` | Numerischer Relevanzwert von 0 bis 100. | `94` | Ja |
| `businessImpact` | Kurzer geschäftlicher Einfluss des Trends. | `Enterprise-Teams verlagern repetitive Aufgaben zunehmend in KI-gestützte Prozessketten.` | Ja |
| `summary` | Kurze Zusammenfassung, warum der Trend relevant ist. | `Agentic Workflows zeigen starkes Momentum.` | Ja |
| `recommendation` | Handlungsempfehlung für Teams. | `Erste interne Use Cases sammeln.` | Ja |
| `source` | Quelle oder Ursprung des Signals. | `Launches & Tool-Updates` | Ja |
| `timeframe` | Zeitliche Einordnung des Signals. | `Diese Woche` | Ja |
| `signalType` | Art des Signals. | `Workflow` | Ja |

## Beispielzeile

| id | name | category | status | score | businessImpact | summary | recommendation | source | timeframe | signalType |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `agentic-workflows` | `Agentic Workflows` | `Workflows` | `Hohe Relevanz` | `94` | `Enterprise-Teams verlagern repetitive Aufgaben zunehmend in KI-gestützte Prozessketten. Der Einfluss auf Produktivität, Tool-Auswahl und operative Abläufe ist hoch.` | `Agentic Workflows zeigen starkes Momentum, weil Unternehmen wiederkehrende Aufgaben zunehmend durch KI-gestützte Prozessketten automatisieren.` | `Für Produktivitäts-, Operations- und Marketingteams beobachten und erste interne Use Cases systematisch sammeln.` | `Launches & Tool-Updates` | `Diese Woche` | `Workflow` |

## Hinweise für n8n

- Jede Zeile entspricht genau einem Trend.
- Spaltennamen sollen exakt gleich bleiben, inklusive Groß- und Kleinschreibung.
- `score` soll als Zahl gespeichert werden, nicht als Text mit Prozentzeichen.
- `id` soll eindeutig und stabil sein.
- Leere Pflichtfelder sollen vermieden werden.
- n8n kann diese Zeilen später aus Google Sheets lesen, normalisieren und an eine API oder direkt an die TrendPilot AI Datenquelle übergeben.
- Die technische Anbindung sollte später in `trend-source.ts` erfolgen, damit die Dashboard-Komponente möglichst unverändert bleiben kann.
