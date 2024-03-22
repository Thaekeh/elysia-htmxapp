import Database from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { MergedSchema } from "./mergedSchema";

const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite, { schema: MergedSchema });
