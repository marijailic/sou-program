import userTypeEnum from '@/enums/userTypeEnum';
import { keys, storage } from './storageService';

const authUserKey = keys.AUTH_USER;

export const saveAuthData = ({ authUser }) => {
    const { id, name, surname, username, type, profile_picture_key } = authUser;

    storage.set(authUserKey, {
        id,
        name,
        surname,
        username,
        type,
        profile_picture_key,
    });
};

export const deleteAuthData = () => storage.delete(authUserKey);
/**
 * @returns {{id:string, name:string, surname:string, username:string, type:string, profile_picture_key:string}}
 */
export const getAuthData = () => storage.get(authUserKey);
export const isAuthUserDemos = () => getAuthData().type === userTypeEnum.DEMOS;
