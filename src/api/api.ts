import axios from "axios";

const instance = axios.create({
    withCredentials:true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers:{
        "API-KEY" : "d6a9965b-9508-4ee9-9d27-31daa8d146f5"
    }
})

export const userAPI = {
    getUsers(currentPage:number,pageSize:number = 1)  {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
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
        console.warn('Obsolete method. Please profile API object')
        return profileAPI.getProfile(userID)
    }
}

export const profileAPI = {
    getProfile(userID:string) {
        return instance.get(`profile/` + userID)
    },
    getStatus(userID:string) {
      return instance.get(`profile/status/` + userID)
    },
    updateStatus(status:string) {
        return instance.put<updateStatusType>(`profile/status/`,{status})
    },
    savePhoto(photo:File) {
        const formData = new FormData();
        formData.append('image', photo);
        return instance.put(`profile/photo/`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
    }
}

export const authAPI = {
    me() {
       return instance.get(`auth/me`)
    },
    login(email:string,password:string,rememberMe:boolean =false) {
        return instance.post('auth/login',{email, password, rememberMe})
    },
    logout() {
        return instance.delete('auth/login')
    }
}

type updateStatusType = {
    resultCode:number
    messages: string[]
    data:{}
}
