import userTypeEnum from '@/enums/userTypeEnum';
import { keys, storage } from './storageService';
import backendApiService from './backendApiService';

const AUTH_USER_KEY = keys.AUTH_USER;
const EXPIRES_AFTER = 1000 * 60 * 60; // 1 hour

export const saveAuthData = ({ authUser }) => {
    const { id, name, surname, username, type, profile_picture_key } = authUser;

    storage.set(
        AUTH_USER_KEY,
        JSON.stringify({
            id,
            name,
            surname,
            username,
            type,
            profile_picture_key,
            expires: Date.now() + EXPIRES_AFTER,
        })
    );
};

export const deleteAuthData = () => storage.delete(AUTH_USER_KEY);
/**
 * @returns {{id:string, name:string, surname:string, username:string, type:string, profile_picture_key:string, expires:number}}
 */
export const getAuthData = () => JSON.parse(storage.get(AUTH_USER_KEY));
export const isAuthUserDemos = () => getAuthData().type === userTypeEnum.DEMOS;
export const fetchAuthData = async () =>
    await backendApiService.post({
        url: '/auth/me',
        headers: {
            'Content-Type': 'application/json',
        },
    });
