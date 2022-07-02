import { createTransport, Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { LibMail, LibMailConfig } from "../MailLib";

const mailConfig: SMTPTransport.Options = {
  host: process.env.MAIL_HOST,
  port: +process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
}

export class NodemailerLibMail implements LibMail {
  #nodemailer: Transporter

  constructor() {
    this.#nodemailer = createTransport(mailConfig);
  }

  async sendMail(config: LibMailConfig): Promise<void> {
    const { body, subject } = config

    await this.#nodemailer.sendMail({
      to: 'maycon@nodemailer.com.br',
      from: 'Application <application@app.com.br>',
      subject,
      html: body.join('')
    })
  }
}
