import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CategoryModule } from 'src/app/features/home/domain/models/category.module';
import { MapComponent } from 'src/app/shared/presentation/components/map/map.component';
import { UserType } from 'src/app/shared/types/user-type.enum';
import { ChooseCategoryModal } from '../../components/choose-category/choose-category.modal';

@Component({
  selector: 'app-what-are-you',
  templateUrl: './what-are-you.page.html',
  styleUrls: ['./what-are-you.page.scss'],
})
export class WhatAreYouPage {
  public userType: UserType | null = null;
  public UserType = UserType;
  public category: CategoryModule | null = null;
  private location?: any;

  constructor(private router: Router, private alertController: AlertController, private modal: ModalController) { }

  public changeUserType(userType: UserType): void {
    this.userType = userType;
  }

  async goToNext(): Promise<void> {
    if (!this.userType) return;

    if (this.userType === UserType.professional) {
      await this.openChooseCategory();
      await this.openMapSearch();
    }

    this.router.navigate(['auth/sign-up'], { state: { userType: this.userType, category: this.category, ...this.location } });
  }

  private async openChooseCategory() {
    const modal = await this.modal.create({
      component: ChooseCategoryModal,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    this.category = data;

  }

  private async openMapSearch() {

    const modal = await this.modal.create({
      component: MapComponent,
    });

    await modal.present();

    const alert = await this.alertController.create({
      message: 'Busca tu ubicacion para aparecer en las busquedas mas cercana a las solicitudes',
      mode: 'ios',
      buttons: ['OK'],
    });
    await alert.present();

    const { data } = await modal.onWillDismiss();
    this.location = data;
  }

}
