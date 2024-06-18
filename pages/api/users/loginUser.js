/**
 *
 *  This is the loginUser api
 *
 */

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
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { loginEmail, loginUsername, loginPassword } = req.body;

  if (!loginEmail && !loginUsername) {
    return res.status(400).json({ error: "Email or username is required" });
  }

  if (!loginPassword) {
    return res.status(400).json({ error: "Password is required" });
  }

  let client;
  try {
    client = await connectToDatabase();
    const db = client.db(process.env.USERS_DB_NAME);
    const usersCollection = db.collection(process.env.USERS_DB_COLLECTION);

    const user = await usersCollection.findOne({
      $or: [{ email: loginEmail }, { username: loginUsername }],
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid username/email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      loginPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ error: "Invalid username/email or password" });
    }

    // Here you can generate a token if using JWT or handle session management
    const token = "Current User"; // Replace with real token generation
    const message = "Login successful";

    return res.status(200).json({ message, token });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
