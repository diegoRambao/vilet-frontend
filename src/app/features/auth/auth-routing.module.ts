import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sign',
    loadChildren: () =>
      import('./presentation/pages/sign/sign.module').then(
        (m) => m.SignPageModule
      ),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./presentation/pages/sign-up/sign-up.module').then(
        (m) => m.SignUpPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
