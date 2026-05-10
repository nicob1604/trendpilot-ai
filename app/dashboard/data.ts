export type Trend = {
  id: string;
  name: string;
  category: string;
  status: string;
  score: number;
  businessImpact: string;
  summary: string;
  recommendation: string;
  source: string;
  timeframe: string;
  signalType: string;
  sourceUrl?: string;
  publishedAt?: string;
  articleTitle?: string;
  articleSummary?: string;
  articleBody?: string;
  sourceName?: string;
};

export const trends: Trend[] = [
  {
    id: "agentic-workflows",
    name: "Agentic Workflows",
    category: "Workflows",
    status: "Hohe Relevanz",
    score: 94,
    source: "Launches & Tool-Updates",
    timeframe: "Diese Woche",
    signalType: "Workflow",
    businessImpact:
      "Enterprise-Teams verlagern repetitive Aufgaben zunehmend in KI-gestützte Prozessketten. Der Einfluss auf Produktivität, Tool-Auswahl und operative Abläufe ist hoch.",
    summary:
      "Agentic Workflows zeigen starkes Momentum, weil Unternehmen wiederkehrende Aufgaben zunehmend durch KI-gestützte Prozessketten automatisieren.",
    recommendation:
      "Für Produktivitäts-, Operations- und Marketingteams beobachten und erste interne Use Cases systematisch sammeln.",
  },
  {
    id: "synthetic-research",
    name: "Synthetic Research",
    category: "Research",
    status: "Neu",
    score: 87,
    source: "Research & Marktfeedback",
    timeframe: "Heute",
    signalType: "Research",
    businessImpact:
      "KI-generierte Research-Panels beschleunigen frühe Marktvalidierung, Zielgruppenverständnis und Content-Planung.",
    summary:
      "Synthetic Research gewinnt an Bedeutung, weil Teams Hypothesen schneller testen und Marktfeedback strukturiert simulieren wollen.",
    recommendation:
      "Für Produkt-, Content- und Research-Teams pilotieren und klare Qualitätskriterien für synthetische Insights festlegen.",
  },
  {
    id: "ki-compliance-ops",
    name: "KI-Compliance Ops",
    category: "Compliance",
    status: "Hohe Relevanz",
    score: 83,
    source: "Regulatorische Signale",
    timeframe: "Diese Woche",
    signalType: "Compliance",
    businessImpact:
      "Regulatorische Anforderungen erhöhen den Bedarf an Tools für Monitoring, Dokumentation und interne KI-Governance.",
    summary:
      "KI-Compliance wird wichtiger, weil Unternehmen Governance, Dokumentation und Monitoring für KI-Nutzung strukturierter abbilden müssen.",
    recommendation:
      "Für regulierte Branchen priorisieren und mögliche Tool-Kategorien für Monitoring, Dokumentation und Freigabeprozesse prüfen.",
  },
  {
    id: "ai-video-agents",
    name: "AI Video Agents",
    category: "AI Tools",
    status: "Beobachten",
    score: 78,
    source: "Tool-Neuheiten",
    timeframe: "Heute",
    signalType: "AI Tools",
    businessImpact:
      "Video-Workflows werden zunehmend automatisiert. Der Markt ist noch fragmentiert, aber relevant für Marketing- und Enablement-Teams.",
    summary:
      "AI Video Agents automatisieren immer mehr Schritte von Skript, Schnitt, Lokalisierung und Distribution.",
    recommendation:
      "Für Marketing- und Sales-Enablement-Teams beobachten und erste Workflows für wiederkehrende Videoformate testen.",
  },
  {
    id: "enterprise-prompt-systems",
    name: "Enterprise Prompt Systems",
    category: "Workflows",
    status: "Hohe Relevanz",
    score: 81,
    source: "Enterprise Use Cases",
    timeframe: "Diese Woche",
    signalType: "Operations",
    businessImpact:
      "Unternehmen standardisieren Prompts, Rollen und Freigaben, um KI-Nutzung konsistenter, sicherer und besser messbar zu machen.",
    summary:
      "Enterprise Prompt Systems entstehen, weil Teams wiederholbare, geprüfte und rollenbasierte KI-Interaktionen benötigen.",
    recommendation:
      "Für größere Organisationen priorisieren und Prompt-Bibliotheken, Rollenmodelle sowie Review-Prozesse vorbereiten.",
  },
  {
    id: "autonomous-research-tools",
    name: "Autonomous Research Tools",
    category: "Research",
    status: "Neu",
    score: 89,
    source: "GitHub & Produktupdates",
    timeframe: "Heute",
    signalType: "Research",
    businessImpact:
      "Autonome Recherche-Agenten verkürzen Analysezyklen und verändern, wie Strategie- und Innovationsteams Wissen sammeln und bewerten.",
    summary:
      "Autonomous Research Tools kombinieren Suche, Quellenbewertung und Synthese zu längeren, eigenständigen Analyseabläufen.",
    recommendation:
      "Für Strategie- und Innovationsteams evaluieren und besonders Quellenqualität, Nachvollziehbarkeit und Review-Schritte prüfen.",
  },
];
