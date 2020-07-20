import HttpService from './HttpService'
import axios from 'axios';

export const userService = {
    login,
    logout,
    signup,
    query,
    getById,
    remove,
    update,
    addReview
}

function addReview(newReview, owner) {
    
}

function getById(userId) {
    return HttpService.get(`user/${userId}`)
    // console.log('userId - service', userId);
    // return axios.get(`http://localhost:3000/user/${userId}`)
    //     .then(res => res.data)
    //     .catch(err => err)
}

function remove(userId) {
    return HttpService.delete(`user/${userId}`)
}

function update(user) {
    return HttpService.put(`user/${user._id}`, user)
    // return axios.put(`http://localhost:3000/user/${user.id}`, user)
    // .then(res => res.data)
    // .catch(err => err);
}

async function login(userCred) {
    console.log('usrt-ser-fro-userCred', userCred);
    const user = await HttpService.post('auth/login', userCred)
    console.log('userservice-http', user);
    return _handleLogin(user)
    // return axios.post(`http://localhost:3000/auth/login`,userCred)
    // .then(res =>{
    //     // res=>res.data
    //     return _handleLogin(res.data)
    // })
    // .catch(err => err);
}
async function signup(userCred) {
    const user = await HttpService.post('auth/signup', userCred)
    return _handleLogin(user)
    // return axios.post(`http://localhost:3000/auth/signup`,userCred)
    // .then(res =>{
    //     // res=>res.data
    //     return _handleLogin(res.data)
    // })
    // .catch(err => err);
}

async function logout() {
    await HttpService.post('auth/logout');
    // return axios.get(`http://localhost:3000/auth/logout`)
    // .then(res => {
    //     sessionStorage.clear();
        // res.data
    // })
    // .catch(err => err)  
    // sessionStorage.clear();
}

function query() {
    return HttpService.get('user')
    // return axios.get(`http://localhost:3000/user/`)
    // .then(res => res.data)
    // .catch(err => err)  
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}



