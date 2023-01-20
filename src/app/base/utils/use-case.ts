import { Observable } from "rxjs";

export abstract class UseCase<S, T> {
    abstract execute(parms: S): Observable<T> | Promise<T>;
}