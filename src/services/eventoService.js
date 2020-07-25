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
        capacity: null,
        imgUrls: [],
        imgUrls: [],
        category: null,
        createdAt: null,
        members: [],
        owner: {},
        imgUrls: [],
        tags: []
    }
}

function query(filterBy) {
    const filterUrl = _getParams(filterBy);
    return HttpService.get(`evento?${filterUrl}`);
}

async function getById(id) {
    return await HttpService.get(`evento/${id}`)
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

function _getParams(filterBy) {
    var queryParams = new URLSearchParams();

    if (filterBy.title) queryParams.set('title', filterBy.title);
    if (filterBy.category) queryParams.set('category', filterBy.category);
    if (filterBy.tags) queryParams.set('tags', filterBy.tags);
    if (filterBy.location) queryParams.set(location, filterBy.location)
    if (filterBy.timeAndDate) {
        if (filterBy.timeAndDate === 'Any day') {
            queryParams.set('timeAndDate', 'all');
        } else if (filterBy.timeAndDate === 'Today') {
            queryParams.set('timeAndDate', 'Today');
        } else if (filterBy.timeAndDate === 'Tomorrow') {
            queryParams.set('timeAndDate', 'Tomorrow');
        } else if (filterBy.timeAndDate === 'This week') {
            queryParams.set('timeAndDate', 'This week');
        } else if (filterBy.timeAndDate === 'Next week') {
            queryParams.set('timeAndDate', 'Next week');
        }
    }
    return queryParams;
}