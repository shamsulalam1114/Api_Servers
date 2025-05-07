const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()} : ${req.url} : New Request Recieved \n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Home Page");
        break;

      case "/about":
        const username = myUrl.query.myName;

        res.end(`hi, ${username}`);
        break;
      case "/search":
        const search = myUrl.query.search_query;
        res.end("here are your result for " + search);
      case "/tools":
        res.end("I've many tools");
        break;

      default:
        res.end("404 Not Found");
    }
  });

  // console.log(req.headers)
  // console.log(req)
});

const PORT = 8007;
myServer.listen(8007, () => {
  console.log(`Server started at port no ${PORT} `);
});
