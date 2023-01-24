import { UserType } from "src/app/shared/types/user-type.enum";

export interface UserModel {
    id: string;
    email: string;
    password: string;
    name: string;
    lastName?: string;
    type: UserType;
    // category?: Category | null;
    description?: string;
    location?: string | number;
}