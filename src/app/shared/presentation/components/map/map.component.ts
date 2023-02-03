import { CommonModule } from '@angular/common';
import { Geolocation } from '@capacitor/geolocation';
import { Component, Input } from '@angular/core';
import { IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { MapService } from 'src/app/core/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [IonicModule, TranslateModule, CommonModule]
})
export class MapComponent {
  locations: any = [];
  marcker: any;
  search: string = '';
  @Input() location: any;

  constructor(private map: MapService, private loadingCtrl: LoadingController, private modal: ModalController) { }

  ionViewDidEnter() {
    this.search = this.location?.placeName || '';
    this.map.buildMap({
      container: 'map',
      latitude: this.location?.latitude,
      longitude: this.location?.longitude,
      isMarker: true
    });
  }

  async handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    if (query === this.search?.toLocaleLowerCase()) {
      this.locations = [];
      return;
    }
    this.map.search(query).subscribe(data => {
      console.log(data)
      this.locations = data;
    });
  }

  setLocation(location: any) {
    const { placeName, longitude, latitude } = location;
    this.locations = []
    this.search = placeName;
    this.removeMarker();
    this.location = location;
    this.marcker = this.map.addMarker({
      latitude,
      longitude
    });
  }

  private removeMarker(): void {
    if (this.marcker) this.marcker?.remove();
  }

  async printCurrentPosition() {
    const loading = await this.loadingCtrl.create({
      message: 'cargando ubicacion',
    });
    loading.present()

    this.removeMarker();
    const coordinates = await Geolocation.getCurrentPosition();
    const { longitude, latitude } = coordinates.coords;
    this.search = await this.searchReversePlaceName({ longitude, latitude });
    this.marcker = this.map.addMarker({
      latitude,
      longitude
    });

    this.location = {
      placeName: this.search,
      latitude,
      longitude
    }
    loading.dismiss()
  };

  closeMap() {
    this.modal.dismiss(this.location)
  }

  private async searchReversePlaceName({ longitude, latitude }: { longitude: number, latitude: number }): Promise<any> {
    return new Promise((resolve) => {
      this.map.search(`${longitude},${latitude}`).subscribe(data => {
        resolve(data[0].placeName)
      });
    })
  }
}
