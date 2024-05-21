import { IMailer, IMailerOptions } from "../../domain/services/IMailer";
import nodemailer from "nodemailer";

export class MailerNodemailer implements IMailer {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.HOST_SMTP,
      port: 587,
      auth: {
        user: process.env.USER_SMTP,
        pass: process.env.PASS_SMTP,
      },
    });
  }
  async sendEmail(options: IMailerOptions): Promise<string> {
    const info = await this.transporter.sendMail({
      from: '"Test Newsletter" <test@testnewsletter.com>',
      to: options.to,
      subject: options.subject,
      attachments: options.attachment
        ? [{ path: options.attachment }]
        : undefined,
      html: options.body,
    });

    return nodemailer.getTestMessageUrl(info) || "";
  }
}
