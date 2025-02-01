import { createClient } from "@libsql/client";

export async function handler(event, context) {
  const db = createClient({
    url: "libsql://magazinedata-joerakesh.turso.io",
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const { email } = JSON.parse(event.body);

    // Insert email into subscribers table
    const result = await db.execute(
      `INSERT INTO subscribers (email) VALUES (?)`,
      [email]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Subscription successful", result }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to store email" }),
    };
  }
}
