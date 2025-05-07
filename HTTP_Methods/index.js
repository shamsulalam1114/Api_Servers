const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello from Home Page");
});

app.get("/about", (req, res) => {
  return res.send(`Hello ${req.query.name}`);
});

const PORT = 3000;
app.listen(3000, () => {
  console.log(`Server started at port no ${PORT} `);
});
