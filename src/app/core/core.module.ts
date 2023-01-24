import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageIonicService } from './data/services/storage-ionic.service';
import { StorageService } from './domain/storage.service';
import { TokenService } from './services/token.service';


@NgModule({
  providers: [
    { provide: StorageService, useClass: StorageIonicService },
    TokenService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
