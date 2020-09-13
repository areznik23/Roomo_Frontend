import axios from 'axios';

import {API_URL} from './API_URL.js'


export default class UsersService{
    
    constructor(){}

    loginUser(User){
        const url = `${API_URL}/api/users/login`;
        return axios.post(url, User);
    }
    registerUser(User){
        const url = `${API_URL}/api/users/register`;
        return axios.post(url, User);
    }
    logOutUser(){
        const url = `${API_URL}/api/users/logout`;
        return axios.post(url);
    }
    updateProfile(data){
        const url = `${API_URL}/api/users/profile`
        return axios.put(url,data,{
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
    }
    createGalleryImage(data){
        const url = `${API_URL}/api/users/profile/gallery`
        return axios.post(url,data,{
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
    }
    getInbox(){
        const url = `${API_URL}/api/users/messages/inbox`
        return axios.get(url)
    }
    getSent(){
        const url = `${API_URL}/api/users/messages/sent`
        return axios.get(url)
    }

    
}