import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { CategoryRepository } from './domain/repositories/category.repository';
import { GetAllCategoryUseCase } from './domain/usecases/get-all-category';
import { CategoryRepositoryImplementation } from './data/repositories/category-implementation.repository';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

const getAllCategoryUseCaseFactory = (categoryRepository: CategoryRepository) => new GetAllCategoryUseCase(categoryRepository);

export const getAllCategoryUseCaseProvider = {
  provide: GetAllCategoryUseCase,
  useFactory: getAllCategoryUseCaseFactory,
  deps: [CategoryRepository]

}

@NgModule({
  declarations: [],
  providers: [
    getAllCategoryUseCaseProvider,
    { provide: CategoryRepository, useClass: CategoryRepositoryImplementation }
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    HttpClientModule,
    TranslateModule
  ]
})
export class HomeModule { }
