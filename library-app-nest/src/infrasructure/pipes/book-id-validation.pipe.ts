import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const bookIdRegex = /[\da-zA-Z]{30}/;

@Injectable()
export class BookIdValidationPipe implements PipeTransform {
    public transform(value: string, metadata: ArgumentMetadata) {
        if (!bookIdRegex.test(value)) {
            throw new BadRequestException(`Invalid book id '${value}'`);
        }
        return value;
    }
}