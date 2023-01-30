import { Observable } from "rxjs";
import { UseCase } from "src/app/core/utils/use-case";
import { RequestModel } from "../models/request.model";
import { RequestRepository } from "../repositories/request.repository";

export class CreateRequestUseCase implements UseCase<{ request: RequestModel }, RequestModel> {

    constructor(private repository: RequestRepository) { }

    execute(params: { request: RequestModel; }): Observable<RequestModel> {
        return this.repository.create(params.request);
    }
}