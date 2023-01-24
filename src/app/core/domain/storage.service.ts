export abstract class StorageService {
    abstract get<T>(key: string): Promise<T>;
    abstract set(key: string, value: any): Promise<any>;
    abstract remove(key: string): Promise<any>;
    abstract clearAll(): Promise<any>;
}
