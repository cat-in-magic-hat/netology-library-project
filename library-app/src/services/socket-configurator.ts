import { inject, injectable } from 'inversify';
import { Server, Socket } from 'socket.io';
import { Express } from 'express';
import http from 'http';
import { ISocketConfigurator } from '../contracts/services/socket-configurator';
import { IComment } from '../contracts/models';
import { SERVICE_IDENTIFIER } from '../constants';
import { IBooksRepository } from '../contracts/services/books-repository';

const COMMENT_ADDED_EVENT = 'comment-added';

@injectable()
export class SocketConfigurator implements ISocketConfigurator {
    constructor(@inject(SERVICE_IDENTIFIER.BOOKS_REPOSITORY) private readonly booksRepository: IBooksRepository) {
    }

    public configure(app: Express): http.Server {
        const server = new http.Server(app);
        const io = new Server(server);
        io.on('connection', (socket: Socket) => {
            const { id } = socket;
            console.log(`socket connected ${id}`);
            const roomName = socket.handshake.query.roomName as string;
            socket.join(roomName);

            socket.on(COMMENT_ADDED_EVENT, async (msg: IComment) => {
                try {
                    await this.booksRepository.addComment(roomName, { ...msg });
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
}
