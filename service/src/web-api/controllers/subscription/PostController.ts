import { ISaveSubscriptions } from "../../../application/interfaces/uses-cases/ISaveSubscriptions";
import { ISendNewsletter } from "../../../application/interfaces/uses-cases/ISendNewsletter";
import { validateSendNewsletter } from "../../../application/validators/createNewsletter";
import { validateSaveSubscriptions } from "../../../application/validators/saveSubscriptions";
import { IBaseController } from "../IController";
import { Request, Response } from "express";

export default class PostController implements IBaseController {
  constructor(private readonly saveSubscriptions: ISaveSubscriptions) {}
  run = async (req: Request, res: Response) => {
    const result = validateSaveSubscriptions({
      ...req.body,
    });

    if (result.error) {
      res.status(400).json({ errors: result.error });
      return;
    }

    const subs = await this.saveSubscriptions.run(result.data.subscriptions);
    res.status(200).json(subs);
  };
}
