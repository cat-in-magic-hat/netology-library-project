import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';
import { BooksCommentsService } from '../services';

@WebSocketGateway()
export class BooksCommentsGateWay {
    @WebSocketServer()
    server: Server;

    constructor(private readonly bookCommentsService: BooksCommentsService) {        
    }

    @SubscribeMessage('request_comments')
    async getAllComments(@MessageBody() data: { bookId: string },
    @ConnectedSocket() socket: Socket): Promise<void> {
        const comments = await this.bookCommentsService.findAllBookComments(data.bookId);
        socket.emit('receive_comments', comments);
    }

    @SubscribeMessage('send_comment')
    async addComment(@MessageBody() data: { bookId: string, comment: string },
    @ConnectedSocket() socket: Socket): Promise<void> {
        const comment = await this.bookCommentsService.addComment({ bookId: data.bookId, comment: data.comment});
        socket.emit('comment_added', comment);
    }
}