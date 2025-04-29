import { productsApi } from "@/core/api/productsApi";
import { User } from "../interface/user";

export interface AuthResponse {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    token: string;
}


const returnUserToken = (data: AuthResponse): { user: User, token: string } => {
    const { token, ...user } = data;

    return {
        user,
        token
    }
};



export const AuthLogin = async( email: string, password: string ) => {

    email = email.toLowerCase().trim();

    try {
        const { data } = await productsApi.post<AuthResponse>( '/auth/login', { email, password } );

        return returnUserToken( data );

    } catch (error) {
        console.log(error)
        throw new Error( 'Error en la autenticación' );
    }

};


export const AuthCheckStatus = async( token: string ) => {
    try {
        const { data } = await productsApi.get<AuthResponse>( '/auth/check-status' );

        return returnUserToken( data );
        
    } catch (error) {
        console.log(error)
        return null;
    }
}


//TODO hacer register