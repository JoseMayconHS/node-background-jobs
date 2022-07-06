import { Queue } from 'bull'

import { LibMailConfig } from '@lib/mail/MailLib'

export interface Keys {
	mail: '@registrationMail'
}

export interface QueueRest<T, K> {
	queue: Queue<T>
	handle(props: T): Promise<void>
	process(): void
	key: K
}

export interface MailQueueConfig
	extends QueueRest<LibMailConfig, Keys['mail']> {}

export interface QueueLib {
	mail: Omit<MailQueueConfig, 'handle'>
	processQueue(): void
}
