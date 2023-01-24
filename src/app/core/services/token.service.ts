import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

    private _token!: string;
    private _transToken!: string;
    private _authToken!: string;

    get token() {
        return this._token;
    }

    set token(_token: string) {
        this._token = _token;
    }

    get transToken() {
        return this._transToken;
    }

    set transToken(_transToken: string) {
        this._transToken = _transToken;
    }

    get authToken() {
        return this._authToken;
    }

    set authToken(_authToken: string) {
        this._authToken = _authToken;
    }


}
