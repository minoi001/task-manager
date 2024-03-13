// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3002;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
