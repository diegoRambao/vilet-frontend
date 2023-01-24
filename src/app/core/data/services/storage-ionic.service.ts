/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../../domain/storage.service';

@Injectable()
export class StorageIonicService implements StorageService {
    private _storage: Storage | null = null;

    constructor(private storage: Storage) {
        this.init();
    }

    async init() {
        const storage = await this.storage.create();
        this._storage = storage;
    }

    async get(key: string): Promise<any> {
        if (!this._storage) {
            await this.init();
        }

        const value = await this._storage?.get(key);

        return JSON.parse(value);
    }

    set(key: string, value: any): Promise<any> {
        return this._storage!.set(key, JSON.stringify(value));
    }

    remove(key: string): Promise<any> {
        return this._storage!?.remove(key);
    }

    clearAll(): Promise<any> {
        return this._storage!?.clear();
    }
}