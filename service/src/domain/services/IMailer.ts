export interface IMailerOptions {
  to: string;
  subject: string;
  body: string;
  attachment?: string;
}

export interface IMailer {
  sendEmail(options: IMailerOptions): Promise<string>;
}
