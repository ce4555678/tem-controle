import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "./schema";

export const clientDb = new PGlite("idb://tem-controle");

const db = drizzle(clientDb, { schema });

export default db;
