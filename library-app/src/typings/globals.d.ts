import { Socket } from 'socket.io';
declare var io: {
    connect(url: string, options?: any): Socket;
}

declare interface uidGenerator {
    generateUniqueId: () => string;
}