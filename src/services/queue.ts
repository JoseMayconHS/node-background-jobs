import 'dotenv/config'

import { redisConfig } from '@lib/inMemory/redis/RedisLib'
import { NodemailerLibMail } from '@lib/mail/nodemailer/NodemailerLibMail'
import { BuildLibProps, BullLib } from '@lib/queue/bull/BullLib'

const nodeMailerLibMail = new NodemailerLibMail()

const mailQueueProps: BuildLibProps['mailQueueProps'] = {
	mailLib: nodeMailerLibMail,
}

export const queueService = new BullLib({
	mailQueueProps,
	redisConfig,
})
