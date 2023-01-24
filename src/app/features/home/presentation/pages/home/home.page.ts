import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import { CategoryModule } from '../../../domain/models/category.module';
import { GetAllCategoryUseCase } from '../../../domain/usecases/get-all-category';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  categories!: CategoryModule[];
  loading = false;
  @ViewChild(IonModal) modal!: IonModal;
  isModalOpen = false;
  categorySelected!: CategoryModule;

  constructor(private getAllCategory: GetAllCategoryUseCase) { }

  ngOnInit() {
    this.loading = true;
    this.getAllCategory.execute().subscribe({
      next: (categories) => {
        console.log(categories);
        this.categories = categories
      },
      error: (error) => console.error(error),
      complete: () => this.loading = false
    });
  }

  setOpen(category: CategoryModule) {
    this.categorySelected = category
    this.isModalOpen = true;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.isModalOpen = false;
  }
}
