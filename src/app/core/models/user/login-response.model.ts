import { Designation } from "./designation.model";

export interface LoginResponse {
    id: number,
    uuid: string,
    username: string,
    email: string,
    token: string,
    bearer: string,
    
    designacion: Designation,
    modulos: string[],
    roles: string[],
}
