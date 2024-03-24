import { Body, Controller, Get, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { RegisterContract } from 'src/users/domain/usecases/register.contract';
import { NewUser } from '../requests/newuser';
import { User } from 'src/users/domain/entities/user';
import { v4 as uuid } from 'uuid';
import { Response } from 'express';

@Controller('users')
export class UserController {
    constructor(
        @Inject('RegisterContract') private readonly registerUC: RegisterContract 
    ){}

    @Get("/login")
    login(){
      return "hello world"  
    }

    @Post()
    async register(@Body() newUser: NewUser, @Res() res: Response){
        let user: User = {
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
