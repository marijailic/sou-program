import userTypeEnum from '@/enums/userTypeEnum';

export default {
    getAuthHeaders: () => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        const username = localStorage.getItem('username');
        const type = localStorage.getItem('type');

        return {
            Authorization: `Bearer ${token}`,
            RefreshToken: refreshToken,
            username,
            type,
        };
    },
    saveAuthData: ({ username, type, token, refreshToken }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('type', type);
        localStorage.setItem('username', username);
    },
    deleteAuthData: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        localStorage.removeItem('type');
    },
    getAuthUsername: () => localStorage.getItem('username'),
    isAuthUserDemos: () => localStorage.getItem('type') === userTypeEnum.DEMOS,
};
