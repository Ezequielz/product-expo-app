


export interface User {
    id: string;
    email: string;
    fullName: string;
    password?: string;
    isActive?: boolean;
    roles?: string[];
}