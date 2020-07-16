import HttpService from './HttpService'

export const eventService = {
    query,
    remove,
    save,
    update,
    getById,
    getEmpty
}

function getEmpty() {
    return {
        name: '',
        price: 0,
        type: '',
        inStock: false
    }
}

function query() {
    return HttpService.get("event");
}

async function getById(id) {
    return await HttpService.get(`event/${id}`)
}

function save(event) {
    return HttpService.post(`event`, event);
}

function update(event) {
    return HttpService.put(`event/${event._id}`, event)
}

function remove(id) {
    return HttpService.delete(`event/${id}`)
}