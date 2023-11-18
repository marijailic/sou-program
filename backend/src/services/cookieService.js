const cookieName = 'sp_session';

export const getCookieDataFromRequest = (req) => {
    const authCookie = req.cookies?.[cookieName];
    if (!authCookie) {
        return null;
    }

    const { token, username, type } = authCookie;
    if (!token || !username || !type) {
        return null;
    }

    return { token, username, type };
};

export const addAuthCookieToRes = (res) => {
    res.cookie(cookieName, JSON.stringify(authUserData), {
        expires: expires ?? moment().add(1, 'year').toDate(),
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    });
};
