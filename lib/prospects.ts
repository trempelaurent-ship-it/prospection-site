import fs from "fs";
import path from "path";
import { Prospect } from "./types";

export function getAllProspects(): Prospect[] {
  const file = path.join(process.cwd(), "data", "prospects.json");
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf-8")) as Prospect[];
}

export function getProspectBySlug(slug: string): Prospect | null {
  return getAllProspects().find((p) => p.slug === slug) ?? null;
}
