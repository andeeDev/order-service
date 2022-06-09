import { Length } from 'class-validator';
import { ProductExists } from './ProductExists';

export class IdContainsValidation {
    @Length(24, 24)
    @ProductExists()
    id: string;
}
