// server/index.js
const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
  res.json(req.body);
});

function mongoDBReq() {
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_USER}.orlicon.mongodb.net/?retryWrites=true&w=majority&appName=TaskManager`;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
}

// CREATE
app.post("/api/task", (req, res) => {
  res.json(req.body);
});

// READ
app.get("/api/tasks", (req, res) => {
  res.json(req.body);
});

// UPDATE
app.put("/api/task", (req, res) => {
  res.json(req.body);
});

// DELETE
app.delete("/api/task", (req, res) => {
  res.send("Delete task");
});
