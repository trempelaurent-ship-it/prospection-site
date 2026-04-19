import fs from "fs";
import path from "path";
import { Prospect } from "./types";

let cached: Prospect[] | null = null;

export function getAllProspects(): Prospect[] {
  if (cached) return cached;
  const file = path.join(process.cwd(), "data", "prospects.json");
  if (!fs.existsSync(file)) {
    cached = [];
    return cached;
  }
  cached = JSON.parse(fs.readFileSync(file, "utf-8")) as Prospect[];
  return cached;
}

export function getProspectBySlug(slug: string): Prospect | null {
  return getAllProspects().find((p) => p.slug === slug) ?? null;
}
