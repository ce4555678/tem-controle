// drizzle.config.ts
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle", // Onde as migrações e snapshots serão gerados
  schema: "./src/db/schema.ts", // Caminho para o seu arquivo de esquema
  dialect: "postgresql", // PGlite usa o dialeto PostgreSQL
  // O Drizzle Kit não precisa de dbCredentials para gerar as migrações,
  // mas você precisaria disso para rodar `drizzle-kit push` ou `migrate`
  // contra um banco de dados real. Para PGlite, você geraria os arquivos SQL
  // e depois os executaria manualmente ou usaria a API do PGlite.
  // dbCredentials: {
  //   url: process.env.DATABASE_URL!, // Se você fosse usar um banco de dados real
  // },
});
