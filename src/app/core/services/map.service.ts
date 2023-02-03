import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  mapbox = mapboxgl as typeof mapboxgl;
  map!: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v12`;
  geocoder!: MapboxGeocoder;
  // Coordenadas de la localización donde queremos centrar el mapa
  lat = 43.1746;
  lng = -2.4125;
  zoom = 16;
  constructor(private http: HttpClient) {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapBoxToken;
  }
  buildMap({ zoom, longitude, latitude, container, isMarker }: { zoom?: number, longitude?: number, latitude?: number, container: string, isMarker: boolean }) {
    this.map = new mapboxgl.Map({
      container,
      style: this.style,
      zoom: zoom || this.zoom,
      center: [longitude || this.lng, latitude || this.lat],
    });
    if (isMarker && longitude && latitude) this.addMarker({ longitude, latitude })
  }

  search(query: string) {
    return this.http
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${environment.mapBoxToken}`
      )
      .pipe(
        map((data: any) => {
          return data.features.map((feature: any) => {
            const { place, country, region } = this.extractLocation(feature)
            return {
              placeName: feature.place_name,
              longitude: feature.center[0],
              latitude: feature.center[1],
              text: feature.text,
              place,
              country,
              region
            };
          });
        })
      );
  }

  private extractLocation(feature: any) {
    const newOrder: any = {}
    feature.context.forEach((data: any) => {
      const letter = data.id.split('.')[0]
      const isInclude = ['place', 'region', 'country'].includes(letter)
      if (isInclude) {
        newOrder[letter] = data.text
      }
    })

    if (!newOrder.hasOwnProperty('place')) newOrder['place'] = feature.text;

    return newOrder;
  }

  addMarker(options: { longitude: number; latitude: number }) {
    this.map.setCenter([options.longitude, options.latitude])
    this.map.setZoom(16);
    return new mapboxgl.Marker({
      color: '#ff5271',
      scale: 1.5
    }).setLngLat([options.longitude, options.latitude])
      .addTo(this.map);
  }
}
