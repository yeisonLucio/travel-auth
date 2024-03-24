import { Credentials } from "../dtos/credentials";
import { LoginResponse } from "../dtos/login.response";
import { Either } from "../helpers/either/either";
import { Failure } from "../helpers/failure";

export interface LoginContract {
    execute(credentials: Credentials): Promise<Either<Failure, LoginResponse>>
}