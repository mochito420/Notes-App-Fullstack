import http from "http";
import dotenv from "dotenv";
import { usersRouter } from "./routers/users-router.js";
dotenv.config();

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/users")) {
    usersRouter(req, res);
  } else {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("hello front my server");
  }
});

server.listen(1000, () => {
  console.log(`server runnig at http://localhost:1000`);
});
