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

app.get("/", (req, res) => {
  res.send("Welcome");
});
