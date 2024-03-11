import { Application } from "express";
import mongoose from "mongoose";
import { GetEnvironmentVariables } from "./enviroments/enviroment";
import UserRouter from "./routers/UserRouter";
import express = require("express");

export class Server {
  public app: Application = express();

  constructor() {
    this.setConfigs();
    this.setRouter();
  }

  setConfigs() {
    this.connectMongoDB();
  }
  connectMongoDB() {
    mongoose
      .connect(GetEnvironmentVariables().db_uri)
      .then(() => console.log("Connected to MongoDB..."))
      .catch((err) => console.error("Could not connect to MongoDB..."));
  }
  setRouter() {
    this.userRouter();
  }
  userRouter() {
    this.app.use("/api/user", UserRouter);
  }
}
