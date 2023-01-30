import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { CategoryRepository } from './domain/repositories/category.repository';
import { GetAllCategoryUseCase } from './domain/usecases/get-all-category';
import { CategoryRepositoryImplementation } from './data/repositories/category-implementation.repository';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { RequestRepository } from './domain/repositories/request.repository';
import { CreateRequestUseCase } from './domain/usecases/create-request';
import { RequestRepositoryImplementation } from './data/repositories/request-implmentation.repository';

const getAllCategoryUseCaseFactory = (categoryRepository: CategoryRepository) => new GetAllCategoryUseCase(categoryRepository);

export const getAllCategoryUseCaseProvider = {
  provide: GetAllCategoryUseCase,
  useFactory: getAllCategoryUseCaseFactory,
  deps: [CategoryRepository]
}

const createRequestUseCaseFactory = (requestRepository: RequestRepository) => new CreateRequestUseCase(requestRepository);
export const createRequestUseCaseProvider = {
  provide: CreateRequestUseCase,
  useFactory: createRequestUseCaseFactory,
  deps: [RequestRepository]
}

@NgModule({
  declarations: [],
  providers: [
    getAllCategoryUseCaseProvider,
    createRequestUseCaseProvider,
    { provide: CategoryRepository, useClass: CategoryRepositoryImplementation },
    { provide: RequestRepository, useClass: RequestRepositoryImplementation }
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    HttpClientModule,
    TranslateModule
  ]
})
export class HomeModule { }
