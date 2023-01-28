import { readFileSync } from "fs";
import { createServer } from "https";
import { Server } from "socket.io";

const httpsServer = createServer({
  key: readFileSync("./ssl/key.pem"),
  cert: readFileSync("./ssl/cert.pem"),
});

const io = new Server(httpsServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log(socket);
  // ...
});

httpsServer.listen(4000);
