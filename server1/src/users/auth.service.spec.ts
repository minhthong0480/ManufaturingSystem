import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service"
import { User } from "./user.entity"
import { BadRequestException } from "@nestjs/common"
import {expect, jest, test} from '@jest/globals'

describe('Auth Service', () =>{
    let service: AuthService
    let fakeUserService: Partial<UsersService>

    beforeEach(async ()=> {
        fakeUserService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User)
        }
    
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                }
            ]
        }).compile()
    
        service = module.get(AuthService)
    })
    
    it('can create an instance of auth service', async () =>{
        expect(service).toBeDefined()
    })

    it('create a new user with a salted and hashed password', async () => {
        const user = await service.signup('asds@asds.com', 'asdasd')

        expect(user.password).not.toEqual('asdasd')
        const [salt,hash] = user.password.split('.')
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    })

    it('throws an error if user signs up with email that is in use', async () => {
        fakeUserService.find = () =>
          Promise.resolve([
            { id: 1, email: 'user@domain.pl', password: 'pass' } as User,
          ]);
     
        expect.assertions(2)
     
        try {
          await service.signup('a@a.pl', 'pass')
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException)
          expect(err.message).toBe('Email already existed')
        }
    })

    it('throws if signin is called with an unused email', async () => {
        await expect(service.signin('asdsa@asdaf.com', 'asdasd')).rejects.toThrow()
    })

    it('throws if an invalid password provided',async () => {
        fakeUserService.find = () => Promise.resolve([{ email: 'asdas@asdas.com', password: 'adasd'} as User])
        
        await expect(service.signin('asdasd@asdsad.com', 'asdasd')).rejects.toThrow()

    })

    it('returns a user if correct password is provided', async () => {
        fakeUserService.find = () => Promise.resolve([{ email: 'asdas@asdas.com', password: 'b048839f360a94cd.b59caccce9a1207d06bccf36e028d01ce314b00581ced9b3966c73b5340f1a1c'} as User])

        const user = await service.signin('asdas@asdas.com', 'asdasd')

        expect(user).toBeDefined()
    })
})

