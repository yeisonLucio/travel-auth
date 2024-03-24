import { User } from "src/users/domain/entities/user";
import {User as UserEntity } from "src/users/infra/entities/user.entity"
import { UserRepositoryContract } from "src/users/domain/repositories/user.repository";
import { Either } from "src/users/domain/helpers/either/either";
import { Failure } from "src/users/domain/helpers/failure";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepositoryImpl implements UserRepositoryContract{

    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>){}

    async create(user: User): Promise<Either<Failure, void>> {
        try {
            let result = await this.userRepository.save(user)
            return Either.right(null)
        } catch (error) {
            return Either.left(new Failure(error, 500))
        }
    }

    async existEmail(email: string): Promise<Either<Failure, Boolean>> {
        try {
            const exists = await this.userRepository.existsBy({email})
            return Either.right(exists)
        } catch (error) {
            return Either.left(new Failure(error, 500))
        }
    }

    async findByEmail(email: string): Promise<Either<Failure, User>> {
        try {
            const user = await this.userRepository.findOneBy({email: email})
            return Either.right(user)
        } catch (error) {
            return Either.left(new Failure(error, 500))
        }
    }
}