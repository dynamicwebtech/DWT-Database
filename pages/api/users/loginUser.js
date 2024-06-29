import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

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
    if (req.method === "POST") {
      const { createEmail, createUsername, createPassword } = req.body;

      db_client = await connectToDatabase();

      const collection = db_client
        .db(process.env.USERS_DB_NAME)
        .collection(process.env.USERS_DB_COLLECTION);

      // Find the user based on email or username
      const user = await collection.findOne({
        $or: [{ createEmail }, { createUsername }],
      });

      if (!user) {
        res.status(401).json({
          error:
            "ERROR: That user was not found.. Make sure the email or username is correct and selected!",
        });
        return; // Exit if user not found
      }

      // Compare the provided password with the hashed password from the database
      const isPasswordCorrect = await bcrypt.compare(
        createPassword,
        user.createPassword
      );

      if (!isPasswordCorrect) {
        res.status(401).json({ error: "ERROR: Invalid password" });
        return; // Exit if password is incorrect
      }

      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(405).json({ error: "ERROR: Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "ERROR: Internal Server Error" });
  } finally {
    if (db_client) {
      await db_client.close();
      console.log("Closed connection to database");
    }
  }
}
