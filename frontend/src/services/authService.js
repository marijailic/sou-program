import userTypeEnum from '@/enums/userTypeEnum';

export default {
    saveAuthData: ({ authUser }) => {
        const { id, name, surname, username, type, profile_picture_key } =
            authUser;
        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
        localStorage.setItem('surname', surname);
        localStorage.setItem('username', username);
        localStorage.setItem('type', type);
        localStorage.setItem('profile_picture_key', profile_picture_key);
    },
    deleteAuthData: () => {
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('surname');
        localStorage.removeItem('username');
        localStorage.removeItem('type');
        localStorage.removeItem('profile_picture_key');
    },
    getAuthUserID: () => localStorage.getItem('id'),
    isAuthUserDemos: () => localStorage.getItem('type') === userTypeEnum.DEMOS,
};
