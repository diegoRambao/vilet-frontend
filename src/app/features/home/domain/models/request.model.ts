import { UserModel } from "src/app/features/auth/domain/models/user.module";
import { CategoryModule } from "./category.module";

export interface ProfesionalWithStatus extends Omit<UserModel, 'password'> {
    status?: string;
}

export interface RequestModel {
    id?: number;
    category: CategoryModule;
    client: UserModel;
    description?: string;
    latitude?: number;
    longitude?: number;
    placeName?: string;
    state?: 'A' | 'C';
    professionals?: ProfesionalWithStatus[];
}