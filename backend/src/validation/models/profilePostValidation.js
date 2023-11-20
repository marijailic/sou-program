import { validatedRequest } from '../baseValidation.js';

export const createProfilePostValidation = async (req, res, next) => {
    return validatedRequest({
        data: req.body,
        rules: { text: ['required', 'string'] },
        errorMessage: '[POST] Create profile picture validation failed',
        res,
        next,
    });
};

export const updateProfilePostValidation = async (req, res, next) => {
    return validatedRequest({
        data: req.body,
        rules: { text: ['required', 'string'] },
        errorMessage: '[PATCH] Update profile picture validation failed',
        res,
        next,
    });
};
