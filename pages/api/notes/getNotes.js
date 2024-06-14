import { MongoClient } from "mongodb";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5gb",
    },
  },
};

async function connectToDatabase() {
  const client = new MongoClient(process.env.NOTES_DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  return client; // Return the MongoClient instance directly
}

export default async function handler(req, res) {
  let db_client = null;

  try {
    if (req.method === "GET") {
      db_client = await connectToDatabase();

      const collection = db_client
        .db(process.env.NOTES_DB_NAME)
        .collection(process.env.NOTES_DB_COLLECTION);

      const notes = await collection.find({}).toArray();

      res.status(200).json({ notes });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error retrieving Notes from database: ", error);
    res.status(500).json({ error: "Failed to retrieve Notes" });
  } finally {
    if (db_client) {
      await db_client.close();
      console.log("CLOSED connection to Notes DB");
    }
  }
}
