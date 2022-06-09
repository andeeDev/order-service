import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ProductService } from '../../product/product.service';
import { ValidationMessages } from '../messages';

@ValidatorConstraint({ name: 'ProductExists', async: true })
@Injectable()
export class ProductExistsRule implements ValidatorConstraintInterface {
    constructor(private readonly productService: ProductService) {}

    async validate(value: string): Promise<boolean> {
        try {
            await this.productService.findOne(value);
        } catch {
            return false;
        }

        return true;
    }

    defaultMessage(): string {
        return ValidationMessages.ProductNotExist;
    }
}

export function ProductExists(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void {
    return function (object: any, propertyName: string): void {
        registerDecorator({
            name: 'ProductExists',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: ProductExistsRule,
        });
    };
}
