import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListOfRequestsPage } from './list-of-requests.page';

const routes: Routes = [
  {
    path: '',
    component: ListOfRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListOfRequestsPageRoutingModule {}
