import { registerDecorator, ValidationOptions } from 'class-validator';

//I've got this code from Google Gemini, it allows check different params from password and apply all of them to validation field.  
export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions || {},
      validator: {
        validate(value: string) {
          if (!value) {
            return false; // Empty password
          }
          

          const hasLowercase = /[a-z]/.test(value);
          const hasUppercase = /[A-Z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
          const minLength = value.length >= 8 ? value.length : 8;

          return (
            hasLowercase &&
            hasUppercase &&
            hasNumber &&
            (hasSymbol || value.length >= minLength + 2) && // Allow for symbols or longer password without symbol
            value.length >= minLength
          );
        },
        defaultMessage() {
          return 'Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number, and a symbol or be at least 10 characters long.';
        },
      },
    });
  };
};
