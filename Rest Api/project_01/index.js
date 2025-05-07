const express = require("express");
const fs = require("fs");

const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 200;

app.use(express.urlencoded({ extended: false }));

app.use(express.json()); // Add this to parse JSON request bodies

//middleware

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}:${req.ip}:${req.method}:$(req.path)\n`,
    (err, data) => {
      next();
    }
  );
  req.myUserName = "Akash.org";
  next();
});

app.use((req, res, next) => {
  console.log("Hello from middleware 02", req.myUserName);

  next();
});

app.get("/users", (req, res) => {
  const html = `
      <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>  
    `;
  res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
  console.log("i am in get root", req.myUserName);
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  if (!body.first_name || !body.last_name || !body.email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newUser = { ...body, id: users.length + 1 };
  users.push(newUser);

  try {
    fs.writeFileSync("MOCK_DATA.json", JSON.stringify(users, null, 2));
    res.json({ status: "success", id: newUser.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to save user data" });
  }
});

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
