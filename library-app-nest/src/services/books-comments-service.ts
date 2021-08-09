import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IBooksCommentsService } from '../contracts/services';
import { BookCommentModel, BookComment } from '../models/db';
import { BookCommentDto } from '../models/dto';
import { Injectable } from '@nestjs/common';

const SELECT_FIELDS = '-__v -_id';
@Injectable()
export class BooksCommentsService implements IBooksCommentsService {
    constructor(
        @InjectModel(BookComment.name) private bookCommentModel: Model<BookCommentModel>
    ){}

    public async getAll(): Promise<BookCommentModel[]> {
        return this.bookCommentModel.find().select(SELECT_FIELDS);
    }

    public async findAllBookComments(bookId: string): Promise<BookCommentModel[]> {
        return this.bookCommentModel.find({ bookId }).select(SELECT_FIELDS);
    }

    public async getCommentById(commentId: string): Promise<BookCommentModel | null> {
        return this.bookCommentModel.findOne({ id: commentId }).select(SELECT_FIELDS);
    }

    public async addComment(comment: BookCommentDto): Promise<BookCommentModel> {
        const created = await new this.bookCommentModel(comment).save();
        const { _id, __v, ...book } = created;
        return book as BookCommentModel;
    }
    
    public async deleteComment(commentId: string): Promise<boolean> {
        const deletedComment = await this.bookCommentModel.findOneAndDelete({ id: commentId });
        return deletedComment != null;
    }
    
    public async updateComment(commentId: string, comment: BookCommentDto): Promise<boolean> {
        const updatedComment = await this.bookCommentModel.findOneAndUpdate({ id: commentId }, comment);
        return updatedComment != null;
    }
}