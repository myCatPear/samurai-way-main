import axios from "axios";
import {ProfileType} from "../redux/profile-reducer";

const instance = axios.create({
    withCredentials:true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers:{
        "API-KEY" : "ecdc6e54-19e0-470a-834c-9d33301a545a"
    }
})

export const userAPI = {
    getUsers(currentPage:number,pageSize:number = 1)  {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollowUser (id:number)  {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    },
    followUser (id:number) {
        return instance.post(`follow/${id}`, {})
            .then(response => response.data)
    },
    getProfile(userID:string) {
        return instance.get(`profile/` + userID)
    }
}

export const authAPI = {
    me() {
       return instance.get(`auth/me`)
    }
}
