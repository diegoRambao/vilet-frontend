import { Observable } from "rxjs";
import { UseCase } from "src/app/core/utils/use-case";
import { CategoryModule } from "../models/category.module";
import { CategoryRepository } from "../repositories/category.repository";

export class GetAllCategoryUseCase implements UseCase<void, CategoryModule[]> {

    constructor(private categoryRepository: CategoryRepository) { }

    execute(): Observable<CategoryModule[]> {
        return this.categoryRepository.getAll();
    }
}