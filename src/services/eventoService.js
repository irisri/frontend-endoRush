import HttpService from './HttpService'
import axios from 'axios';

export default {
    query,
    remove,
    save,
    update,
    getById,
    getEmpty
}

function getEmpty() {
    return {
        title: null,
        description: null,
        location: {
          name: "null",
          lat: null,
          lng: null
        },
        startTime: null,
        tags: [],
        capacity: null
    }
}

function query() {
    // return axios.get(`http://localhost:3000/evento/`)
    //     .then(res => res.data)
    //     .catch(err => err)     
    return HttpService.get("evento");
}

async function getById(id) {
    // return axios.get(`http://localhost:3000/evento/${id}`)
    //     .then(res => res.data)
    //     .catch(err => err)
    return await HttpService.get(`evento/${id}`)
}

function save(evento) {
    //Front or in server?
    evento.createdAt = Date.now();
    evento.members = [];
    evento.owner = '';
    console.log('saveing', evento);
    
    // return axios.post(`http://localhost:3000/evento/`, evento)
    //     .then(res => res.data)
    //     .catch(err => err);
    return HttpService.post(`evento`, evento);
}

function update(evento) {
    // return axios.put(`http://localhost:3000/evento/${evento.id}`, evento)
    // .then(res => res.data)
    // .catch(err => err);
    return HttpService.put(`evento/${evento._id}`, evento)
}

function remove(id) {
    // return axios.delete(`http://localhost:3000/evento/${id}`)
    //     .then(res => res.data)
    //     .catch(err => err);
    return HttpService.delete(`evento/${id}`)
}