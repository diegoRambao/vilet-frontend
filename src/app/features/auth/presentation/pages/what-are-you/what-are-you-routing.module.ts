import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatAreYouPage } from './what-are-you.page';

const routes: Routes = [
  {
    path: '',
    component: WhatAreYouPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatAreYouPageRoutingModule {}
