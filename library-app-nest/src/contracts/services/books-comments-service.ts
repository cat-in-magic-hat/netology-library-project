import { BookCommentModel } from '../../models/db';
import { BookCommentDto } from '../../models/dto';

export interface IBooksCommentsService {
    getAll: () => Promise<BookCommentModel[]>;
    findAllBookComments: (bookId: string) => Promise<BookCommentModel[]>;
    getCommentById: (commentId: string) => Promise<BookCommentModel | null>;
    addComment: (comment: BookCommentDto) => Promise<BookCommentModel>; 
    deleteComment: (commentId: string) => Promise<boolean>;
    updateComment: (commentId: string, comment: BookCommentDto) => Promise<boolean>;
}