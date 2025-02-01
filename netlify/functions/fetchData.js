import { createClient } from "@libsql/client/web";

export async function handler(event, context) {
  const db = createClient({
    url: "libsql://magazinedata-joerakesh.turso.io",
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const result = await db.execute("SELECT * FROM subscribers"); // Ensure this table exists
    console.log("Fetched data:", result.rows); // Debugging
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
