import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiUrl } from "src/app/core/const/api-urls";
import { environment } from "src/environments/environment";
import { RequestModel } from "../../domain/models/request.model";
import { RequestRepository } from "../../domain/repositories/request.repository";

@Injectable()
export class RequestRepositoryImplementation implements RequestRepository {

    constructor(private http: HttpClient) { }

    create(request: RequestModel): Observable<RequestModel> {
        console.log(request)
        return this.http.post<RequestModel>(`${environment.baseUrl}${ApiUrl.requests}`, request);
    }
}