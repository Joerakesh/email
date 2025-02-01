import { createClient } from "@libsql/client/web";

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, price } = JSON.parse(event.body);

  if (!email) {
    return { statusCode: 400, body: "Missing email" };
  }

  const db = createClient({
    url: "libsql://magazinedata-joerakesh.turso.io",
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    await db.execute("INSERT INTO subscribers (email) VALUES (?)", [email]);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data inserted successfully!" }),
    };
  } catch (error) {
    console.error("Insert Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
