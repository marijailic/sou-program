import moment from 'moment-timezone';

const cookieName = 'sp_session';

export const getCookieTokenFromReq = (req) => {
    const authCookie = req.cookies?.[cookieName];
    if (!authCookie) {
        return null;
    }

    return authCookie;
};

export const addAuthCookieToRes = (res, token) => {
    res.cookie(cookieName, token, {
        expires: moment().add(1, 'year').toDate(),
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    });
};
export const removeAuthCookieFromRes = (res) => {
    res.clearCookie(cookieName);
};
