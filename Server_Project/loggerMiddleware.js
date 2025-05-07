const fs = require("fs");
const path = require("path");
const url = require("url"); // Add this line to import the url module

// Ensure logs directory exists
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logFilePath = path.join(logsDir, "log.txt");
const jsonLogFilePath = path.join(logsDir, "log.json");

// Initialize JSON log file if it doesn't exist
if (!fs.existsSync(jsonLogFilePath)) {
  fs.writeFileSync(jsonLogFilePath, "[]");
}

function formatTime() {
  const now = new Date();
  return now.toISOString();
}

function loggerMiddleware(req) {
  const myUrl = url.parse(req.url, true);
  const timestamp = formatTime();

  // Text log entry
  const textLog = `${timestamp} : ${req.method} ${req.url} : Request Received\n`;

  // JSON log entry
  const jsonLogEntry = {
    timestamp,
    method: req.method,
    url: req.url,
    path: myUrl.pathname,
    query: myUrl.query,
    headers: req.headers,
  };

  // Append to text log
  fs.appendFile(logFilePath, textLog, (err) => {
    if (err) console.error("Error writing to text log:", err);
  });

  // Update JSON log
  fs.readFile(jsonLogFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON log:", err);
      return;
    }

    try {
      const logs = JSON.parse(data);
      logs.push(jsonLogEntry);

      fs.writeFile(jsonLogFilePath, JSON.stringify(logs, null, 2), (err) => {
        if (err) console.error("Error writing to JSON log:", err);
      });
    } catch (parseErr) {
      console.error("Error parsing JSON log:", parseErr);
    }
  });
}

module.exports = loggerMiddleware;
