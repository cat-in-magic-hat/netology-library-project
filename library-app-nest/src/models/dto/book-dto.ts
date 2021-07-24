import { IsNotEmpty } from 'class-validator';

export class BookDto {
  id: string;
  @IsNotEmpty()
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
}
