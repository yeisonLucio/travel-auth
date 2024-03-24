import { Body, Controller, Get, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { RegisterContract } from 'src/users/domain/usecases/register.contract';
import { NewUser } from '../requests/newuser';
import { User } from 'src/users/domain/entities/user';
import { v4 as uuid } from 'uuid';
import { Response } from 'express';
import { Credentials } from '../requests/credentials';
import { LoginContract } from 'src/users/domain/usecases/login.contract';

@Controller('users')
export class UserController {
    constructor(
        @Inject('RegisterContract') private readonly registerUC: RegisterContract,
        @Inject('LoginContract') private readonly loginUC: LoginContract,
    ){}

    @Post("/login")
    async login(@Body() credentials: Credentials, @Res() res: Response){
        const result = await this.loginUC.execute(credentials)
        if (result.isLeft()){
            const fail = result.getLeft()
            return res.status(fail.code).send({
              message: fail.message,
              status: fail.code
            }) 
        }

        return res.status(HttpStatus.OK).send(result.getRight())
    }

    @Post()
    async register(@Body() newUser: NewUser, @Res() res: Response){
        const user: User = {
            email: newUser.email,
            id: uuid(),
            password: newUser.password,
            role: newUser.role
        }

        const response = await this.registerUC.execute(user)
       if (response.isLeft()){
           const fail = response.getLeft()
           return res.status(fail.code).send({
             message: fail.message,
             status: fail.code
           }) 
        }

        return res.status(HttpStatus.CREATED).send(response.getRight())
    }
}
