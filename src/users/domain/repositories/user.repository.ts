import { Either } from "src/users/domain/helpers/either/either";
import { User } from "../entities/user";
import { Failure } from "../helpers/failure";

export interface UserRepositoryContract {
    create(user: User): Promise<Either<Failure, void>>
    existEmail(email: string): Promise<Either<Failure, Boolean>>
    findByEmail(email: string): Promise<Either<Failure, User>>
}