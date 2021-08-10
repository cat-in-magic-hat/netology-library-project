import { Module } from '@nestjs/common';
import { BooksModule } from './books.module';

@Module({
  imports: [BooksModule]
})

export class AppModule {}
