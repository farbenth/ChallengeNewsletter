import express, { Router } from "express";
import { AppRoutes } from "./router";
import cors from "cors";
import { MongoDatabase } from "../infrastructure/db/MongoDatabase";

export class Server {
  public readonly app = express();
  private readonly port: number;

  constructor(port: number = 3100) {
    this.port = port;
  }

  async start() {
    // Middlewares

    await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME || "",
      mongoUrl: process.env.MONGO_URL || "",
    });

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use("/api", AppRoutes.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
