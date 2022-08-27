import { registerDecorator, ValidationOptions, isEmpty } from 'class-validator';
import { SortQuery } from '../entities/sort.query';

export function IsSortQueryContains(
  allowFields: string[],
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Object, propertyKey: string) {
    registerDecorator({
      name: 'isSortQuery',
      target: target.constructor,
      propertyName: propertyKey,
      options: {
        message: 'sort fields are not acceptable',
        ...validationOptions,
      },
      validator: {
        validate(sortQuery: SortQuery<string>): boolean {
          return !isEmpty(sortQuery)
            ? Object.keys(sortQuery).every((sortField) =>
                allowFields.includes(sortField),
              )
            : false;
        },
      },
    });
  };
}
