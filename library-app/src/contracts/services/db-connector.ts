import mongoose from 'mongoose';

export interface IDbConnector {    
    connect: () => Promise<typeof mongoose>;
}