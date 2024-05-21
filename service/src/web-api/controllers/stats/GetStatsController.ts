import { IGetStats } from "../../../application/interfaces/uses-cases/IGetStats";
import { IBaseController } from "../IController";
import { Request, Response } from "express";

export default class GetStatsController implements IBaseController {
  constructor(private readonly getStats: IGetStats) {}
  run = async (req: Request, res: Response) => {
    const stats = await this.getStats.run();
    res.status(200).json(stats);
  };
}
