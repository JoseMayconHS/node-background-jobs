import { RedisOptions } from 'ioredis';
import Queue, { QueueOptions } from 'bull'

import { LibMail } from '@lib/mail/MailLib';

import { QueueLib, MailQueueConfig } from '../QueueLib'

interface MailQueue {
  mailLib: LibMail
}

export interface BuildLibProps {
  mailQueueProps: MailQueue
  redisConfig?: QueueOptions | RedisOptions
}

export class BullLib implements QueueLib {
  #queueConfig?: BuildLibProps['redisConfig']
  mail: QueueLib['mail']

  constructor({
    mailQueueProps,
    redisConfig
  }: BuildLibProps) {
    this.#queueConfig = redisConfig

    this.mailQueue(mailQueueProps)
    this.middleware()
  }

  queue(key: string) {
    return new Queue(key, {
      redis: this.#queueConfig as RedisOptions
    })
  }

  mailQueue({ mailLib }: MailQueue) {
    const key: MailQueueConfig['key'] = '@registrationMail'

    const queue = this.queue(key)

    const handle: MailQueueConfig['handle'] = async (data) => {
      await mailLib.sendMail(data)
    }

    const process = () => {
      queue.process(({ data }) => handle(data))
    }

    this.mail = {
      process, queue, key
    }
  }

  middleware() {
    interface OnCallback {
      key: string
    }

    const completed = ({ key }: OnCallback) => {
      console.log(`Job ${ key } completed`)
    }

    interface OnErrorCallback extends OnCallback {
      message: string
    }

    const error = ({ key, message }: OnErrorCallback) => {
      console.log(`Job ${ key } error - ${ message }`)
    }

    const failed = ({ key, message }: OnErrorCallback) => {
      console.log(`Job ${ key } failed - ${ message }`)
    }

    [
      this.mail
    ].forEach(job => {
      const { queue, key } = job

      queue.on('completed', () => completed({ key }))

      queue.on('error', ({ message }) => error({ message, key }))

      queue.on('failed', (_, { message }) => failed({ key, message }))
    })
  }

  processQueue(): void {
    console.log('Filas OK')
    this.mail.process()
  }
}
