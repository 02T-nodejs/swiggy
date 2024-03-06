import * as express from "express";
import * as mongoose from "mongoose";
import { GetEnvironmentVariables } from "./enviroments/enviroment";
let app = express();
// connect mongodb
mongoose
  .connect(GetEnvironmentVariables().db_uri)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use((req, res, next) => {
  console.log("Middleware global");
  next();
});
app.use(
  "/user/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);
app.listen(3333, () => {
  console.log("Server started");
});
