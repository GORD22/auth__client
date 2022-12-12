import $api, { API_URL } from "../http";
import {AxiosResponse} from 'axios';
import { IUser } from "../models/IUser";
import { useContext } from "react";





export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }

    static async fetchMeInfo(id: string): Promise<AxiosResponse<IUser[]>> {
        
        return $api.get<IUser[]>(`/me/${id}`)
    }

    static async fetchOneUser(id: string): Promise<AxiosResponse<IUser[]>> {
        
        return $api.get<IUser[]>(`/user/${id}`)
    }
}
