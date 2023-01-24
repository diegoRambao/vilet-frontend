import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/utils/use-case';
import { UserModel } from '../models/user.module';
import { UserRepository } from '../repositories/user.repository';

export class UserRegisterUseCase
    implements
    UseCase<
    { email: string; password: string; name: string; phone: string },
    { user: UserModel; token: string }
    >
{
    constructor(private userRepository: UserRepository) { }

    execute(params: {
        email: string;
        password: string;
        name: string;
        phone: string;
    }): Observable<{ user: UserModel; token: string }> {
        return this.userRepository.register(params);
    }
}
