import $api from "../http";
import {AxiosResponse} from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async signin(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/signin', {email, password})
    }

    static async signup(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/signup', {email, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
}