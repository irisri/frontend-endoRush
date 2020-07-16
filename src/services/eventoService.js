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
        description: null,
        location: {
          name: "null",
          lat: null,
          lng: null
        },
        startTime: null,
        tags: [],
        capaity: null
    }
}

function query() {
    return axios.get(`http://localhost:3000/evento/`)
        .then(res => res.data)
        .catch(err => err)     
    // return HttpService.get("evento");
}

async function getById(id) {
    return axios.get(`http://localhost:3000/evento/${id}`)
        .then(res => res.data)
        .catch(err => err)
    // return await HttpService.get(`evento/${id}`)
}

function save(evento) {
    return HttpService.post(`evento`, evento);
}

function update(evento) {
    return HttpService.put(`evento/${evento._id}`, evento)
}

function remove(id) {
    return HttpService.delete(`evento/${id}`)
}