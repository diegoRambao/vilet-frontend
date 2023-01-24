import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'category',
    loadChildren: () =>
      import('./presentation/pages/category/category.module').then(
        (m) => m.CategoryPageModule
      ),
  },
  {
    path: '',
    loadChildren: () => import('./presentation/pages/list-of-requests/list-of-requests.module').then(m => m.ListOfRequestsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
