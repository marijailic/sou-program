import Validator from 'validatorjs';
import { noWhitespace, password, array } from './customValidations.js';

Validator.register('password', password);
Validator.register('no_whitespace', noWhitespace);
Validator.register('array', array);

export const validatedRequest = ({ data, rules, errorMessage, res, next }) => {
    const validator = new Validator(data, rules);

    if (validator.fails()) {
        console.error(`${errorMessage}:`, validator.errors);
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
        });
    }

    return next();
};
