import { getTrends } from "../../dashboard/trend-source";

export function GET() {
  const trends = getTrends();

  return Response.json({
    source: "mock",
    updatedAt: new Date().toISOString(),
    count: trends.length,
    trends,
  });
}
