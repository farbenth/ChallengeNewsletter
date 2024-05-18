import express, { Router } from "express";

export class Server {
  public readonly app = express();
  private readonly port: number;

  constructor(port: number = 3100) {
    this.port = port;
  }

  async start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
