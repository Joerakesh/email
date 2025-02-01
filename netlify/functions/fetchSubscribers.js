import { createClient } from "@libsql/client";

export async function handler(event, context) {
  const db = createClient({
    url: "libsql://magazinedata-joerakesh.turso.io",
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    // Fetch all subscribers from the database
    const result = await db.execute("SELECT * FROM subscribers");

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch subscribers" }),
    };
  }
}
