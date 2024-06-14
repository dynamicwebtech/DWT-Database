import { MongoClient } from "mongodb";

async function connectToDatabase(uri) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  return client;
}

export default async function handler(req, res) {
  let projectsClient = null;
  let clientsClient = null;

  try {
    if (req.method === "POST") {
      projectsClient = await connectToDatabase(
        process.env.PROJECTS_DB_CONNECTION_URI
      );
      clientsClient = await connectToDatabase(
        process.env.CLIENTS_DB_CONNECTION_URI
      );

      const projectsCollection = projectsClient
        .db(process.env.PROJECTS_DB_NAME)
        .collection(process.env.PROJECTS_DB_COLLECTION);
      const clientsCollection = clientsClient
        .db(process.env.CLIENTS_DB_NAME)
        .collection(process.env.CLIENTS_DB_COLLECTION);

      // Fetch project based on the selected project name
      const selectedProjectName = req.body.clientProject;
      const project = await projectsCollection.findOne({
        projectName: selectedProjectName,
      });

      if (!project) {
        return res.status(404).json({ error: "Selected project not found" });
      }

      // Include project details in the client data
      const clientData = {
        ...req.body,
        clientProject: project,
      };

      // Save client data to clients database
      await clientsCollection.insertOne(clientData);

      res.status(200).json({ message: "Client added successfully!" });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error adding client to database: ", error);
    res.status(500).json({ error: "Failed to add client" });
  } finally {
    if (projectsClient) {
      await projectsClient.close();
    }
    if (clientsClient) {
      await clientsClient.close();
    }
  }
}
