const containsUppercase = (value) => /[A-Z]/.test(value);
const containsSpecialCharacter = (value) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(value);
const containsWhitespace = (value) => /\s/.test(value);

export const password = (value) => {
    return (
        containsUppercase(value) &&
        containsSpecialCharacter(value) &&
        value.length >= 8 &&
        value.length <= 255
    );
};

export const noWhitespace = (value) => {
    return !containsWhitespace(value);
};

export const array = (value) => {
    return !value || (Array.isArray(value) && value.length > 0);
};
