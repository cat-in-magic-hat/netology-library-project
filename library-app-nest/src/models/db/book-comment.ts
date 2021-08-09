import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import uidGenerator from 'node-unique-id-generator';
import { BookDto } from '../dto';

export type BookCommentModel = BookDto & Document;

@Schema()
export class BookComment {
    @Prop({ required: true, default: uidGenerator.generateUniqueId })
    public id: string;  
    @Prop({ required: true })
    public bookId: string;    
    @Prop({ required: true })
    public comment: string;    
}
export const BookCommentSchema = SchemaFactory.createForClass(BookComment);