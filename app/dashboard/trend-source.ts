// Central trend data source for the dashboard.
// Today, getTrends() returns mock data from data.ts.
// Later, this file can load real trends from an API, Supabase, Google Sheets,
// or an n8n webhook while keeping app/dashboard/page.tsx mostly unchanged.
import { trends } from "./data";
import type { Trend } from "./data";

export function getTrends(): Trend[] {
  return trends;
}
