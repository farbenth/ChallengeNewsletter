import { IGetAllNewsletter } from "../../../application/interfaces/uses-cases/IGetAllNewsletter";
import { IGetSubscriptionsByEmail } from "../../../application/interfaces/uses-cases/IGetSubscriptionsByEmail";
import { IBaseController } from "../IController";
import { Request, Response } from "express";

export default class GetAllByEmailController implements IBaseController {
  constructor(private readonly getAllSubscriptions: IGetSubscriptionsByEmail) {}
  run = async (req: Request, res: Response) => {
    const { email } = req.query;

    if (!email) {
      res.status(400).json({ errors: "Query email es obligatorio" });
      return;
    }
    const subscriptions = await this.getAllSubscriptions.run({
      email: email.toString(),
    });

    res.status(200).json(subscriptions);
  };
}
