import { Length } from 'class-validator';

export class IdValidation {
    @Length(24, 24)
    id: string;
}
