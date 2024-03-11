import { Server } from "./server";
let server = new Server().app;
let port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log("Listening on port " + port);
});
