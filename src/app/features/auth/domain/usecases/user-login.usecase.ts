import { Observable } from "rxjs";
import { UseCase } from "src/app/core/utils/use-case";
import { UserModel } from "../models/user.module";
import { UserRepository } from "../repositories/user.repository";

export class UserLoginUseCase implements UseCase<{ email: string, password: string }, { user: UserModel, token: string }> {

    constructor(private userRepository: UserRepository) { }

    execute(params: { email: string; password: string; }): Observable<{ user: UserModel, token: string }> {
        return this.userRepository.login(params);
    }
}
