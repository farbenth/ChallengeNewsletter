import { Request, Response } from "express";

export interface IBaseController {
  run(req: Request, res: Response): Promise<void>;
}
