import { MongoClient } from "mongodb";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5gb",
    },
  },
};

async function connectToDatabase() {
  const client = new MongoClient(process.env.CLIENTS_DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  return client; // Return the MongoClient instance directly
}

export default async function handler(req, res) {
  let db_client = null;

  try {
    if (req.method === "PUT") {
      res.status(200).json({ message: "Client updated successfully!" });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error updating Clients from database: ", error);
    res.status(500).json({ error: "Failed to updating Clients" });
  } finally {
    if (db_client) {
      await db_client.close();
      console.log("CLOSED connection to Clients DB");
    }
  }
}
