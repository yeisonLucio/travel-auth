import { Module } from '@nestjs/common';
import { UserController } from './infra/controllers/user.controller';
import { RegisterImpl } from './application/register.impl';
import { UserRepositoryImpl } from './infra/repositories/user.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infra/entities/user.entity';
import { LoginImpl } from './application/login.impl';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        {
            provide: 'RegisterContract',
            useClass: RegisterImpl,
        },
        {
            provide: 'UserRepositoryContract',
            useClass: UserRepositoryImpl,
        },
        {
            provide: "LoginContract",
            useClass: LoginImpl
        }
    ]
})
export class UsersModule {}
