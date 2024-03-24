import { LoginResponse } from "../dtos/login.response";

export interface LoginContract {
    execute(): Promise<LoginResponse>
}