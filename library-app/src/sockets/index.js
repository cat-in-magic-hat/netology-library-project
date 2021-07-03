const socketIO = require('socket.io');
const http = require('http');
const { addComment } = require('../data/books-repository');

const COMMENT_ADDED_EVENT = 'comment-added';

const configureSocket = (app) => {
    const server = http.Server(app);
    const io = socketIO(server);
    io.on('connection', (socket) => {
        const { id } = socket;
        console.log(`socket connected ${id}`);
        const { roomName } = socket.handshake.query;
        socket.join(roomName);

        socket.on(COMMENT_ADDED_EVENT, async (msg) => {
            try {
                await addComment(roomName, { ...msg });
                socket.to(roomName).emit(COMMENT_ADDED_EVENT, msg);
                socket.emit(COMMENT_ADDED_EVENT, msg);
            } catch (err) {
                console.log(err);
            }
        })
        socket.on('disconnect', () => {
            console.log(`socket disconnected ${id}`);
        });
    })
    return server;
}

module.exports = {
    configureSocket
}