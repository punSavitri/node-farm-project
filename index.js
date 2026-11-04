const http = require("http");
//creating web server
const server = http.createServer((req, res) => {
  res.end("Hello there!");
});
//listen the incoming request from client 
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to the request on port 8000");
});
