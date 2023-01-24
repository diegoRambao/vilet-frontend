import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from 'src/app/core/const/api-urls';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../domain/models/user.module';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable({
    providedIn: 'root',
})
export class UserImplementationRepository implements UserRepository {
    constructor(private http: HttpClient) { }

    login(params: {
        email: string;
        password: string;
    }): Observable<{ user: UserModel; token: string }> {
        return this.http.post<{ user: UserModel; token: string }>(
            `${environment.baseUrl}${ApiUrl.login}`,
            params
        );
    }
    register(params: {
        email: string;
        password: string;
        name: string;
        phone: string;
    }): Observable<{ user: UserModel; token: string }> {
        return this.http.post<{ user: UserModel; token: string }>(
            `${environment.baseUrl}${ApiUrl.register}`,
            params
        );
    }
}
