// server/index.js
const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 3002;

const app = express();

const username = encodeURIComponent(process.env.MONGO_DB_USER);
const password = encodeURIComponent(process.env.MONGO_DB_PASSWORD);

const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${username}:${password}@taskmanager.orlicon.mongodb.net/`;

const client = new MongoClient(uri);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
  res.json(req.body);
});

async function getTasks() {
  try {
    await client.connect(); // Ensure the client is connected before querying
    const database = client.db("tasks");
    const collection = database.collection("tasks");
    // Fetch all documents within the "tasks" collection
    const tasks = await collection.find({}).toArray();
    return tasks;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Rethrow the error to be caught by the caller
  } finally {
    await client.close();
  }
}

// CREATE
app.post("/api/task", (req, res) => {
  res.json(req.body);
});

// READ
app.get("/api/tasks", async (req, res) => {
  try {
    let taskList = await getTasks(); // Use await to wait for the promise to resolve
    console.log(taskList);
    res.json(taskList);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching tasks.");
  }
});

// UPDATE
app.put("/api/task", (req, res) => {
  res.json(req.body);
});

// DELETE
app.delete("/api/task", (req, res) => {
  res.send("Delete task");
});
