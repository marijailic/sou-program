import { getUserByUsername } from '../../services/userService.js';
import { validatedRequest } from '../baseValidation.js';

const getValidationRules = () => {
    return {
        text: ['required', 'string'],
        authorID: ['required'],
    };
};

const getValidationData = async (req) => {
    const username = req.headers['username'];

    return {
        text: req.body.text,
        authorID: (await getUserByUsername(username)).id,
    };
};

export const createProfilePostValidation = async (req, res, next) => {
    return validatedRequest({
        data: await getValidationData(req),
        rules: getValidationRules(),
        errorMessage: '[POST] Create profile picture validation failed',
        res,
        next,
    });
};

export const updateProfilePostValidation = async (req, res, next) => {
    return validatedRequest({
        data: await getValidationData(req),
        rules: getValidationRules(),
        errorMessage: '[PATCH] Update profile picture validation failed',
        res,
        next,
    });
};
