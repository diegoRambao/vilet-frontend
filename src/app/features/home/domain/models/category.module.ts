export interface Subcategory {
    id?: number;
    name: string;
}

export interface CategoryModule {
    id?: number;
    name: string;
    icon: string;
    subcategories?: Subcategory[] | null;
}