import HttpService from './HttpService'

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
    if (filterBy.category !== "All") queryParams.set('category', filterBy.category);
    if (filterBy.tags) queryParams.set('tags', filterBy.tags);
    if (filterBy.location) queryParams.set(location, filterBy.location)
    if (filterBy.date) {
        if (filterBy.date === 'Any day') {
            queryParams.set('date', 'all');
        } else if (filterBy.date === 'Today') {
            queryParams.set('date', 'Today');
        } else if (filterBy.date === 'Tomorrow') {
            queryParams.set('date', 'Tomorrow');
        } else if (filterBy.date === 'This week') {
            queryParams.set('date', 'This week');
        } else if (filterBy.date === 'Next week') {
            queryParams.set('date', 'Next week');
        }
    }
    return queryParams;
}