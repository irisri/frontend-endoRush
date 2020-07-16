import HttpService from './HttpService'

export const eventoService = {
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
    return HttpService.get("evento");
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