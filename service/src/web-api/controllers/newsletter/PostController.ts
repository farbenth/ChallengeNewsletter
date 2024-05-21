import { ISendNewsletter } from "../../../application/interfaces/uses-cases/ISendNewsletter";
import { validateSendNewsletter } from "../../../application/validators/createNewsletter";
import { IBaseController } from "../IController";
import { Request, Response } from "express";

export default class PostController implements IBaseController {
  constructor(private readonly sendNewsletter: ISendNewsletter) {}
  run = async (req: Request, res: Response) => {
    const result = validateSendNewsletter({
      ...req.body,
      attachment: req.file?.path,
      emails: req.body.emails?.split(","),
      scheduledFor:
        req.body.scheduledFor && new Date(req.body.scheduledFor).getTime(),
    });

    if (result.error) {
      res.status(400).json({ errors: result.error });
      return;
    }

    const newsletter = await this.sendNewsletter.run(result.data);
    res.status(201).json(result);
  };
}
