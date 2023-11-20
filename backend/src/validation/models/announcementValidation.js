import { validatedRequest } from '../baseValidation.js';

export const createAnnouncementValidation = async (req, res, next) => {
    return validatedRequest({
        data: req.body,
        rules: { text: ['required', 'string'] },
        errorMessage: '[POST] Create announcement validation failed',
        res,
        next,
    });
};

export const updateAnnouncementValidation = async (req, res, next) => {
    return validatedRequest({
        data: req.body,
        rules: { text: ['required', 'string'] },
        errorMessage: '[PATCH] Update announcement validation failed',
        res,
        next,
    });
};
