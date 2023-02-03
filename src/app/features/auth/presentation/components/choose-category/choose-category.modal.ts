import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryModule } from 'src/app/features/home/domain/models/category.module';
import { HomeModule } from 'src/app/features/home/home.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.modal.html',
  styleUrls: ['./choose-category.modal.scss'],
  standalone: true,
  imports: [IonicModule, TranslateModule, SharedModule, HomeModule]
})
export class ChooseCategoryModal implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  chooseCategory(category: CategoryModule) {
    this.modal.dismiss(category)
  }

  back() { }
}
