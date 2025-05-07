const http = require("http");
const url = require("url");
const loggerMiddleware = require("./loggerMiddleware");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();

  // Use the logger middleware
  loggerMiddleware(req);

  const myUrl = url.parse(req.url, true);

  switch (myUrl.pathname) {
    case "/":
      res.end("Home Page");
      break;
    case "/about":
      const username = myUrl.query.myName;
      res.end(`Hi, ${username}`);
      break;
    case "/search":
      const search = myUrl.query.search_query;
      res.end("Here are your results for " + search);
      break;
    case "/tools":
      res.end("I've many tools");
      break;
    default:
      res.end("404 Not Found");
  }
});

const PORT = 9001;
myServer.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
