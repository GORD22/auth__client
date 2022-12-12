import { IUser } from "../models/IUser";
import {makeAutoObservable} from "mobx"
import AuthService from "../services/AuthService";
import { AxiosError } from "axios";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import { BooleanLiteral } from "typescript";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading: boolean | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user; 
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async signin(email: string, password: string) {
        try {
            const response = await AuthService.signin(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            const e = error as AxiosError
            console.log(e.response?.data);
        }
    }

    async signup(email: string, password: string) {
        try {
            const response = await AuthService.signup(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            const e = error as AxiosError
            console.log(e.response?.data);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (error) {
            const e = error as AxiosError
            console.log(e.response?.data);
        }
    }

    

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            const e = error as AxiosError
            console.log(e.response?.data);
        } finally {
            this.setLoading(false);
        }
    }
}