import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListOfRequestsPageRoutingModule } from './list-of-requests-routing.module';

import { ListOfRequestsPage } from './list-of-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListOfRequestsPageRoutingModule
  ],
  declarations: [ListOfRequestsPage]
})
export class ListOfRequestsPageModule {}
