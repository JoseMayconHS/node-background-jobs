import { LibMailConfig } from "@lib/mail/MailLib"

export interface Queue<T> {
  handle(props: T): Promise<void>
}

export interface MailQueue extends Queue<{ data: LibMailConfig }> {
  key: '@registrationMail'
}

export interface QueueLib {
  mail: MailQueue
}
