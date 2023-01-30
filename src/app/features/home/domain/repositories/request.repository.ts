import { Observable } from "rxjs";
import { RequestModel } from "../models/request.model";

export abstract class RequestRepository {
    abstract create(request: RequestModel): Observable<RequestModel>;
}