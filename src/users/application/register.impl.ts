import { Inject, Injectable } from "@nestjs/common"
import { RegisterContract } from "../domain/usecases/register.contract"
import { RegisterResponse } from "../domain/dtos/register.response"
import { User } from "../domain/entities/user"
import { Either } from "src/users/domain/helpers/either/either"
import { UserRepositoryContract } from "../domain/repositories/user.repository"
import { Failure } from "../domain/helpers/failure"
import { hashPassword } from "../domain/helpers/encoders"

const EMAIL_ALREADY_EXISTS = "El email ya existe"

@Injectable()
export class RegisterImpl implements RegisterContract {
    constructor(
        @Inject("UserRepositoryContract") private readonly userRepository: UserRepositoryContract,
    ){}

    async execute(user: User): Promise<Either<Failure, RegisterResponse>>{
        let existsEmailResult = await this.userRepository.existEmail(user.email)
        if (existsEmailResult.isLeft()) return Either.left(existsEmailResult.getLeft());

        if (existsEmailResult.getRight()) {
            return Either.left(new Failure(EMAIL_ALREADY_EXISTS, 400))
        }

        user.password = await hashPassword(user.password)

        let result = await this.userRepository.create(user)
        if (result.isLeft()) return Either.left(result.getLeft());
    
        const response: RegisterResponse = {id: user.id}

        return Either.right(response)
    }
}