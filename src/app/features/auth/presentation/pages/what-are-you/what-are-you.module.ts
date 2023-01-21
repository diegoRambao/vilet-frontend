import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatAreYouPageRoutingModule } from './what-are-you-routing.module';

import { WhatAreYouPage } from './what-are-you.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatAreYouPageRoutingModule,
    TranslateModule
  ],
  declarations: [WhatAreYouPage]
})
export class WhatAreYouPageModule { }
