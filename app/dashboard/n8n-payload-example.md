# n8n Payload Example for TrendPilot AI

Diese Datei dokumentiert ein mögliches JSON-Format, das n8n später per Webhook oder API an TrendPilot AI liefern kann.

Diese Datei ist nur eine Vorbereitung. Es wird noch keine echte n8n-Anbindung umgesetzt.

## Erwartetes Payload-Format

Der Payload soll ein Objekt mit Metadaten und einem `trends`-Array enthalten.
`trends` enthält weiterhin das Array der eigentlichen Trend-Daten. Jeder Trend
muss dieselben Feldnamen verwenden wie das Dashboard-Datenmodell.

```json
{
  "source": "n8n",
  "updatedAt": "2026-05-05T19:24:00.000Z",
  "count": 2,
  "trends": [
    {
      "id": "agentic-workflows",
      "name": "Agentic Workflows",
      "category": "Workflows",
      "status": "Hohe Relevanz",
      "score": 94,
      "businessImpact": "Enterprise-Teams verlagern repetitive Aufgaben zunehmend in KI-gestützte Prozessketten. Der Einfluss auf Produktivität, Tool-Auswahl und operative Abläufe ist hoch.",
      "summary": "Agentic Workflows zeigen starkes Momentum, weil Unternehmen wiederkehrende Aufgaben zunehmend durch KI-gestützte Prozessketten automatisieren.",
      "recommendation": "Für Produktivitäts-, Operations- und Marketingteams beobachten und erste interne Use Cases systematisch sammeln.",
      "source": "Launches & Tool-Updates",
      "timeframe": "Diese Woche",
      "signalType": "Workflow"
    },
    {
      "id": "ki-compliance-ops",
      "name": "KI-Compliance Ops",
      "category": "Compliance",
      "status": "Hohe Relevanz",
      "score": 83,
      "businessImpact": "Regulatorische Anforderungen erhöhen den Bedarf an Tools für Monitoring, Dokumentation und interne KI-Governance.",
      "summary": "KI-Compliance wird wichtiger, weil Unternehmen Governance, Dokumentation und Monitoring für KI-Nutzung strukturierter abbilden müssen.",
      "recommendation": "Für regulierte Branchen priorisieren und mögliche Tool-Kategorien für Monitoring, Dokumentation und Freigabeprozesse prüfen.",
      "source": "Regulatorische Signale",
      "timeframe": "Diese Woche",
      "signalType": "Compliance"
    }
  ]
}
```

## Hinweise für n8n

- Die spätere API- oder Webhook-Ausgabe soll dieses Format liefern.
- `source` beschreibt die Datenquelle, z. B. `n8n`.
- `updatedAt` soll ein ISO-Zeitstempel der Aktualisierung sein.
- `count` soll der Anzahl der gelieferten Trends entsprechen.
- `trends` enthält das Array der Trend-Daten.
- `score` muss als Zahl geliefert werden, nicht als String und nicht mit Prozentzeichen.
- `id` muss eindeutig und stabil sein.
- Leere Pflichtfelder sollten vermieden werden.
- Feldnamen müssen exakt gleich bleiben, inklusive Groß- und Kleinschreibung.
- Jeder Trend sollte alle Felder enthalten:
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

## Spätere Integration

Wenn TrendPilot AI später echte Daten nutzt, sollte `trend-source.ts` den n8n Payload abrufen oder entgegennehmen, validieren und in dieses Trend-Format normalisieren. Dadurch kann `app/dashboard/page.tsx` möglichst unverändert bleiben.
