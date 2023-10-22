export const required = (value) => !!value || 'Ovo polje je obavezno.';

export const email = (value) =>
    /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ||
    'Neispravna email adresa.';

export const maxLength = (max) => (value) =>
    value.length <= max || `Tekst ne može biti duži od ${max} znakova.`;

export const noWhitespace = (value) =>
    !/\s/.test(value) || 'Tekst ne smije imati razmak.';

export const containsUppercase = (value) =>
    /[A-Z]/.test(value) || 'Tekst mora imati barem jedno veliko slovo.';

export const containsSpecialCharacter = (value) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
    'Tekst mora imat barem jedan poseban znak.';

export const pattern = (pattern) => (value) =>
    pattern.test(value) || `Neispravna vrijednost.`;

export const minLength = (min) => (value) =>
    value.length >= min || `Tekst mora biti duži od ${min} znakova.`;
