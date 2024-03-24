import { Inject, Injectable } from "@nestjs/common";
import { Credentials } from "../domain/dtos/credentials";
import { LoginResponse } from "../domain/dtos/login.response";
import { Either } from "../domain/helpers/either/either";
import { Failure } from "../domain/helpers/failure";
import { LoginContract } from "../domain/usecases/login.contract";
import { UserRepositoryContract } from "../domain/repositories/user.repository";
import { validatePassword } from "../domain/helpers/encoders";
import * as jwt from "jsonwebtoken"
import * as dayjs from "dayjs";

const ERRORS = {
    USER_UNAUTHORIZED: "Usuario o contraseña incorrecta"
}

@Injectable()
export class LoginImpl implements LoginContract{

    constructor(
        @Inject("UserRepositoryContract") private readonly userRepository: UserRepositoryContract,
    ){}

    async execute(credentials: Credentials): Promise<Either<Failure, LoginResponse>> {
        const { JWT_SECRET_KEY, JWT_EXPIRATION_TIME } = process.env

        const userExists = await this.userRepository.existEmail(credentials.email)
        if(userExists.isLeft()) return Either.left(new Failure(ERRORS.USER_UNAUTHORIZED, 401))

        const userResult = await this.userRepository.findByEmail(credentials.email)
        if(userExists.isLeft()) return Either.left(userResult.getLeft())

        const user = userResult.getRight()

        const isValidPassword = await validatePassword(user.password, credentials.password)
        if (!isValidPassword) return Either.left(new Failure(ERRORS.USER_UNAUTHORIZED, 401))

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            JWT_SECRET_KEY,
            {expiresIn: JWT_EXPIRATION_TIME}
        )

        const response: LoginResponse = {
            id: user.id,
            jwt: token,
            expires_at: dayjs().add(1, 'h').format("YYYY-MM-DDTHH:mm:ss")
        }

        return Either.right(response)
    }
}