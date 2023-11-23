export const keys = {
    AUTH_USER: 'auth_user',
    SHOULD_REFRESH: 'should_refresh',
    TOKEN: 'token',
};

export const storage = {
    set: (key, data) => localStorage.setItem(key, data),
    delete: (key) => localStorage.removeItem(key),
    get: (key) => localStorage.getItem(key),
};
