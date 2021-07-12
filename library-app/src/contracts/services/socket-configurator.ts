import { Server } from 'http';
import { Express } from 'express';

export interface ISocketConfigurator {
    configure: (app: Express) => Server;
}