import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import uidGenerator from 'node-unique-id-generator';
import { BookDto } from '../dto';

export type BookDocument = BookDto & Document;

@Schema()
export class Book {
    @Prop({ required: true, default: uidGenerator.generateUniqueId })
    public id: string;  
    @Prop({ required: true })
    public title: string;    
    @Prop()
    public description: string;    
    @Prop()
    public authors: string;
    @Prop()
    public favorite: string;
    @Prop()
    public fileCover: string;
    @Prop()
    public fileName: string;
}
export const BookSchema = SchemaFactory.createForClass(Book);
