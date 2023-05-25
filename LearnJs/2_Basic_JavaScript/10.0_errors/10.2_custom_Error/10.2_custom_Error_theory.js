/**
 * Расширение Error
 * Мы можем написать свою кастомную ошибку, которая будет наследоваться от базовых классов
 */

{
    class ValidationError extends Error {
        constructor(message) {
            super(message)
            this.name = "ValidationError";
        }
    }

    const validationError = new ValidationError('Нет поля name')

    console.log(validationError instanceof ValidationError) // true
    console.log(validationError instanceof Error) // true

    throw validationError  // ValidationError: Нет поля name

    class PropertyRequiredError extends ValidationError {
        constructor(property) {
            super("Нет свойства: " + property);
            this.name = "PropertyRequiredError";
            this.property = property;
        }
    }

    throw new PropertyRequiredError('test') // PropertyRequiredError: Нет свойства: test
}
