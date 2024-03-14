// server/index.js
const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 3002;

const app = express();

const username = encodeURIComponent(process.env.MONGO_DB_USER);
const password = encodeURIComponent(process.env.MONGO_DB_PASSWORD);

const { MongoClient, ObjectId } = require("mongodb");
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

async function addTask(task) {
  try {
    // Connect to MongoDB
    await client.connect();

    // Access the "tasks" database and collection
    const database = client.db("tasks");
    const collection = database.collection("tasks");

    // Insert the task document into the collection
    const result = await collection.insertOne(task);

    return result.insertedId; // Return the ID of the inserted document
  } catch (error) {
    console.error("Error adding task:", error);
    throw error; // Rethrow the error to be handled by the caller
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

async function editTask(updatedTask) {
  try {
    // Connect to MongoDB
    await client.connect();

    // Access the "tasks" database and collection
    const database = client.db("tasks");
    const collection = database.collection("tasks");
    const objectId = new ObjectId(updatedTask._id);

    // Update the task document in the collection
    const result = await collection.updateOne(
      { _id: objectId }, // Filter for the task with the given ID
      { $set: { title: updatedTask.title, status: updatedTask.status } } // Update the task with the provided object
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error editing task:", error);
    throw error; // Rethrow the error to be handled by the caller
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

async function deleteTask(task) {
  try {
    // Connect to MongoDB
    await client.connect();

    // Access the "tasks" database and collection
    const database = client.db("tasks");
    const collection = database.collection("tasks");
    const objectId = new ObjectId(task._id);

    // Delete the task document from the collection
    const result = await collection.deleteOne({ _id: objectId });

    // Check if the task was found and deleted
    return result;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error; // Rethrow the error to be handled by the caller
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// WELCOME
app.get("/", async (req, res) => {
  res.send("Welcome");
});

// CREATE
app.post("/api/task", async (req, res) => {
  try {
    let newTask = await addTask(req.body); // Use await to wait for the promise to resolve
    let taskList = await getTasks();
    res.json(taskList);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching tasks.");
  }
});

// READ
app.get("/api/tasks", async (req, res) => {
  try {
    let taskList = await getTasks(); // Use await to wait for the promise to resolve
    res.json(taskList);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching tasks.");
  }
});

// UPDATE
app.put("/api/task", async (req, res) => {
  try {
    let updatedTask = await editTask(req.body); // Use await to wait for the promise to resolve
    console.log(updatedTask);
    let taskList = await getTasks();
    res.json(taskList);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching tasks.");
  }
});

// DELETE
app.delete("/api/task", async (req, res) => {
  try {
    let deletedTask = await deleteTask(req.body); // Use await to wait for the promise to resolve
    let taskList = await getTasks();
    res.json(taskList);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching tasks.");
  }
});
