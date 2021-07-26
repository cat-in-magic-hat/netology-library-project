import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class BookDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(50)
  description: string;

  @IsString()
  @IsNotEmpty()
  authors: string;

  @IsString()
  favorite: string;

  @IsString()
  fileCover: string;
  
  @IsString()
  fileName: string;
}
