import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as Mapboxgl from 'mapbox-gl';
import { StorageKeys } from 'src/app/core/const/storage-keys';
import { StorageService } from 'src/app/core/domain/storage.service';
import { UserModel } from 'src/app/features/auth/domain/models/user.module';

import { MapComponent } from 'src/app/shared/presentation/components/map/map.component';
import { CreateRequestUseCase } from '../../../domain/usecases/create-request';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.page.html',
  styleUrls: ['./new-request.page.scss'],
})
export class NewRequestPage {
  form!: FormGroup;
  isModalOpen = false;
  map!: Mapboxgl.Map;

  constructor(private fb: FormBuilder, private router: Router, private modal: ModalController, private storage: StorageService, private createRequest: CreateRequestUseCase) {
    this.initializeForm();
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.form.controls['category'].setValue(state!['category']);
  }

  get category() {
    return this.form.controls['category'].value;
  }

  get location(): { placeName: string, longitude: number, latitude: number } {
    return {
      placeName: this.form.controls['placeName'].value,
      longitude: this.form.controls['longitude'].value,
      latitude: this.form.controls['latitude'].value
    }
  }

  initializeForm() {
    this.form = this.fb.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      client: ['', Validators.required],
      placeName: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
    })
  }

  async cancel(): Promise<void> {
    await this.modal.dismiss(null, 'cancel');
    this.form.reset();
    this.isModalOpen = false;
  }

  async setOpen() {
    const modal = await this.modal.create({
      component: MapComponent,
      componentProps: {
        location: this.location
      }
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    this.form.controls['placeName'].setValue(data.placeName);
    this.form.controls['longitude'].setValue(data.longitude);
    this.form.controls['latitude'].setValue(data.latitude);
  }

  back(): void {
    this.router.navigate(['home'])
  }


  async saveRequest() {
    const user = await this.storage.get<UserModel>(StorageKeys.currenUser);
    this.form.controls['client'].setValue(user);
    if (this.form.invalid) { console.log('complete todos los campos') };

    this.createRequest.execute({ request: this.form.value }).subscribe(data => {
      console.log(data)
    })
  }

}
