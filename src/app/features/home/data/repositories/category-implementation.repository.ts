import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiUrl } from "src/app/core/const/api-urls";
import { environment } from "src/environments/environment";
import { CategoryModule } from "../../domain/models/category.module";
import { CategoryRepository } from "../../domain/repositories/category.repository";

@Injectable()
export class CategoryRepositoryImplementation implements CategoryRepository {
    constructor(private http: HttpClient) { }

    getAll(): Observable<CategoryModule[]> {
        return this.http.get<CategoryModule[]>(`${environment.baseUrl}${ApiUrl.category}`);
    }
}