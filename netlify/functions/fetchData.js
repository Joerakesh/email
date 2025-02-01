import { createClient } from "@libsql/client";

export async function handler(event, context) {
  const db = createClient({
    url: "libsql://magazinedata-joerakesh.turso.io",
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const result = await db.execute("SELECT * FROM subscribers");

    console.log("Raw response:", result); // Debugging

    if (!result.rows || !Array.isArray(result.rows)) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Invalid response from database" }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message }),
    };
  }
}
