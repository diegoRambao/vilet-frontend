import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { HideShowTabDirective } from './presentation/directives/hide-show-tab.directive';
import { TabComponent } from './presentation/components/tab/tab.component';

const components = [TabComponent]

const directives = [HideShowTabDirective];

@NgModule({
    declarations: [...directives, ...components],
    exports: [...directives, ...components],
    imports: [CommonModule, IonicModule, TranslateModule],
})
export class SharedModule { }
