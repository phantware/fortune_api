const http = require("http");

const hostname = "localhost";

const port = 8089;

const server = http.createServer((req, res) => {
  res.end("Welcome to my app");
});

server.listen(port, hostname, () => {
  console.log(`Server running at ${hostname}: ${port}`);
});
