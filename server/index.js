// server/index.js
import express from "express";

const PORT = process.env.PORT || 3002;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// CREATE
app.post("/api/task", (req, res) => {
  res.send("Create task");
});

// READ
app.get("/api/tasks", (req, res) => {
  res.send("Get tasks");
});

// UPDATE
app.put("/api/task", (req, res) => {
  res.send("Update task");
});

// DELETE
app.delete("/api/task", (req, res) => {
  res.send("Delete task");
});
