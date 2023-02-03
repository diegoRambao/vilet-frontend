import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./presentation/pages/home/home.module').then(
        (m) => m.HomePageModule
      ),
    pathMatch: 'full'
  },
  {
    path: 'new-request',
    loadChildren: () => import('./presentation/pages/new-request/new-request.module').then(m => m.NewRequestPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
