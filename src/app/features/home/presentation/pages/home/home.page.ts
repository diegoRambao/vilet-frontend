import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import { CategoryModule, Subcategory } from '../../../domain/models/category.module';
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

  constructor(private getAllCategory: GetAllCategoryUseCase, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.getAllCategory.execute().subscribe({
      next: (categories) => this.categories = categories,
      error: (error) => console.error(error),
      complete: () => this.loading = false
    });
  }

  setOpen(category: CategoryModule) {
    this.categorySelected = category
    this.isModalOpen = true;
  }

  async selectSubCategory(subCategory: Subcategory): Promise<void> {
    await this.cancel();
    const category = { ...this.categorySelected, subCategory };
    this.router.navigate(['home/new-request'], { state: { category } });
  }

  async cancel() {
    await this.modal.dismiss(null, 'cancel');
    this.isModalOpen = false;
  }
}
