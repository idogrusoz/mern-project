export interface UserInterface {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    password: string;
}

export interface ServiceResponse<T> {
    statusCode: number;
    error: boolean;
    message?: string;
    data?: T;
}
