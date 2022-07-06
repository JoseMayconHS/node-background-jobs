export interface LibMailConfig {
	subject: string
	body: string[]
}

export interface LibMail {
	sendMail(config: LibMailConfig): Promise<void>
}
