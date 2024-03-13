// server/index.js
import express from "express";

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
  res.json(req.body);
});

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
