import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sign',
    loadChildren: () =>
      import('./presentation/pages/sign/sign.module').then(
        (m) => m.SignPageModule
      ),
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./presentation/pages/sign-up/sign-up.module').then(
        (m) => m.SignUpPageModule
      ),
    pathMatch: 'full'
  },
  {
    path: 'what-are-you',
    loadChildren: () => import('./presentation/pages/what-are-you/what-are-you.module').then(m => m.WhatAreYouPageModule),
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
