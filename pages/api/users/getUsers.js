import { MongoClient } from "mongodb";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5gb",
    },
  },
};

async function connectToDatabase() {
  const client = new MongoClient(process.env.USERS_DB_CONNECTION_URI, {
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
        .db(process.env.USERS_DB_NAME)
        .collection(process.env.USERS_DB_COLLECTION);

      const users = await collection.find({}).toArray();

      res.status(200).json({ users });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error retrieving Users from database: ", error);
    res.status(500).json({ error: "Failed to retrieve Users" });
  } finally {
    if (db_client) {
      await db_client.close();
      console.log("CLOSED connection to Users DB");
    }
  }
}
