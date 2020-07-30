import io from 'socket.io-client';
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '//localhost:3030' 
var socket;

export default {
    setup,
    terminate,
    on,
    off,
    emit,
}

function setup() {
    socket = io(BASE_URL);
}

function terminate() {
    socket = null;
}

function on(trigger, cb) {
    socket.on(trigger, cb)
}

function off(trigger, cb) {
    socket.off(trigger, cb)
}

function emit(trigger, data) {
    socket.emit(trigger, data)
}
