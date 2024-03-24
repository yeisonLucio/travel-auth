import { RegisterResponse } from "../dtos/register.response";
import { User } from "../entities/user";
import { Either } from "src/users/domain/helpers/either/either";
import { Failure } from "../helpers/failure";

export interface RegisterContract{
 execute(user: User): Promise<Either<Failure, RegisterResponse>>
}