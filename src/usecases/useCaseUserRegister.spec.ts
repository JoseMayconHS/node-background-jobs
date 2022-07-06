import { UseCaseUserRegister } from './useCaseUserRegister'

describe('User Register', () => {
	const userRepositoryCreateSpy = jest.fn()
	const queueMailLibSpy = jest.fn()

	const useCaseUserRegister = new UseCaseUserRegister(
		{
			create: userRepositoryCreateSpy,
		},
		{
			mail: {
				queue: {
					add: queueMailLibSpy,
				},
			},
		}
	)

	it('should be able register user', async () => {
		await expect(
			useCaseUserRegister.execute({
				user: {
					name: 'a',
					email: 'a@a.com',
				},
			})
		).resolves.not.toThrow()

		expect(userRepositoryCreateSpy).toBeCalled()
		expect(queueMailLibSpy).toBeCalled()
	})

	it('should not be able register user', async () => {
		await expect(
			useCaseUserRegister.execute({
				user: {
					name: '',
					email: '',
				},
			})
		).rejects.toThrow()
	})
})
