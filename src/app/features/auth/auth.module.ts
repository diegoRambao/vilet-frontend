import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AuthRoutingModule } from './auth-routing.module';
import { UserLoginUseCase } from './domain/usecases/user-login.usecase';
import { UserRepository } from './domain/repositories/user.repository';
import { UserRegisterUseCase } from './domain/usecases/user.register.usecase';
import { UserImplementationRepository } from './data/repositories/user-implementation.repository';
import { CoreModule } from 'src/app/core/core.module';

const userLoginUseCaseFactory = (userRepository: UserRepository) => new UserLoginUseCase(userRepository);
export const userLoginUseCaseProvider = {
  provide: UserLoginUseCase,
  useFactory: userLoginUseCaseFactory,
  deps: [UserRepository],
};

const userRegisterUseCaseFactory = (userRepository: UserRepository) => new UserRegisterUseCase(userRepository);
export const userRegisterUseCaseProvider = {
  provide: UserRegisterUseCase,
  useFactory: userRegisterUseCaseFactory,
  deps: [UserRepository],
};

@NgModule({
  providers: [
    userLoginUseCaseProvider,
    userRegisterUseCaseProvider,
    { provide: UserRepository, useClass: UserImplementationRepository },
  ],
  imports: [
    CommonModule,
    IonicModule,
    AuthRoutingModule,
    TranslateModule,
    HttpClientModule,
  ],
})
export class AuthModule { }
