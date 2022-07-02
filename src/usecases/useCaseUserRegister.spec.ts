import { UseCaseUserRegister } from "./useCaseUserRegister"

describe('User Register', () => {
  it('should be able register user', async () => {

    const userRepositoryCreateSpy = jest.fn()
    const mailLibCreateSpy = jest.fn()
    const inMemoryLibSetItemSpy = jest.fn()

    const useCaseUserRegister = new UseCaseUserRegister({
      create: userRepositoryCreateSpy
    }, {
      sendMail: mailLibCreateSpy
    }, {
      setItem: inMemoryLibSetItemSpy
    })

    await expect(useCaseUserRegister.execute({
      user: {
        name: 'a', email: 'a@a.com'
      }
    }))
    .resolves
    .not.toThrow()

    expect(userRepositoryCreateSpy).toBeCalled()
    expect(mailLibCreateSpy).toBeCalled()
    expect(inMemoryLibSetItemSpy).toBeCalled()
  })

  it('should not be able register user', async () => {
    const useCaseUserRegister = new UseCaseUserRegister({
      async create() { }
    }, {
      async sendMail() {}
    }, {
      async setItem() {}
    })

    await expect(useCaseUserRegister.execute({
      user: {
        name: '', email: ''
      }
    }))
    .rejects.toThrow()
  })
})
