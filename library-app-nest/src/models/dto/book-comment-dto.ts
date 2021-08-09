import { IsNotEmpty, IsString } from 'class-validator';

export class BookCommentDto {
  id?: string;

  @IsString()
  @IsNotEmpty()
  bookId: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
