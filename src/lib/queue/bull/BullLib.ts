import { NodemailerLibMail } from '@lib/mail/nodemailer/NodemailerLibMail'

import { QueueLib, MailQueue } from '../QueueLib'

const nodemailerLibMail = new NodemailerLibMail()

export class BullLib implements QueueLib {
  mail: MailQueue = {
    key: '@registrationMail',
    async handle({ data }) {
      await nodemailerLibMail.sendMail(data)
    }
  }
}
