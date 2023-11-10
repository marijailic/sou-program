import { validatedRequest } from '../../validation/baseValidation';

export const createUserValidation = async (req, res, next) => {
    return validatedRequest({
        data: req.body,
        rules: {
            name: ['required', 'string', 'max:30'],
            surname: ['required', 'string', 'max:30'],
            email: ['required', 'email'],
            username: ['required', 'string', 'max:30', 'no_whitespace'],
            password: ['required', 'string', 'between:8,100'],
            profile_picture_key: ['string'], // TODO: Zasto se slika ne salje u requestu? Staviti dodati 'present'
            bio: ['present', 'string'],
            type: ['required', 'string'],
        },
        errorMessage: '[POST] Create user validation failed',
        res,
        next,
    });
};

export const updateUserValidation = async (req, res, next) => {
    return validatedRequest({
        data: req.body,
        rules: {
            name: ['required', 'string', 'max:30'],
            surname: ['required', 'string', 'max:30'],
            email: ['required', 'email'],
            profile_picture_key: ['string'], // TODO: Zasto se slika ne salje u requestu? Staviti dodati 'present'
            bio: ['present', 'string'],
            type: ['required', 'string'],
        },
        errorMessage: '[PATCH] Update user validation failed',
        res,
        next,
    });
};
