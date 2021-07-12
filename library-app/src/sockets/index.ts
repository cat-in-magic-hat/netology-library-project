import { Server, Socket } from 'socket.io';
import { Express } from 'express';
import http from 'http';
import { container } from '../configuration/ioc-config';
import { BooksRepository } from '../data/books-repository';
import { IComment } from '../contracts/models';

const COMMENT_ADDED_EVENT = 'comment-added';

export const configureSocket = (app: Express) => {
    const server = new http.Server(app);
    const io = new Server(server);
    io.on('connection', (socket: Socket) => {
        const { id } = socket;
        console.log(`socket connected ${id}`);
        const roomName = socket.handshake.query.roomName as string;
        socket.join(roomName);

        socket.on(COMMENT_ADDED_EVENT, async (msg: IComment) => {
            try {
                await container.get(BooksRepository).addComment(roomName, { ...msg });
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