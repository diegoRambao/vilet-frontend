import { Observable } from "rxjs";
import { CategoryModule } from "../models/category.module";

export abstract class CategoryRepository {
    abstract getAll(): Observable<CategoryModule[]>;
}