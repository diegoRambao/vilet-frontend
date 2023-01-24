import { Observable } from 'rxjs';
import { UserModel } from '../models/user.module';

export abstract class UserRepository {
    abstract login(params: {
        email: string;
        password: string;
    }): Observable<{ user: UserModel, token: string }>;
    abstract register(params: {
        email: string;
        password: string;
        name: string;
        phone: string;
    }): Observable<{ user: UserModel; token: string }>;
}
