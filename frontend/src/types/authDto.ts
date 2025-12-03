export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    firstname: string;
    lastname?: string;
    password: string;
}

export interface AuthResponseDto {
    token: string;
}
