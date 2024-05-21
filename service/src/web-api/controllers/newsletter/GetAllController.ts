import { IGetAllNewsletter } from "../../../application/interfaces/uses-cases/IGetAllNewsletter";
import { IBaseController } from "../IController";
import { Request, Response } from "express";

export default class GetAllController implements IBaseController {
  constructor(private readonly getAllNewsletter: IGetAllNewsletter) {}
  run = async (req: Request, res: Response) => {
    const newsletters = await this.getAllNewsletter.run();
    res.status(200).json(newsletters);
  };
}
