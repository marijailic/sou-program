import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../models/models';
import { getAuthUserData } from '../services/authService';
import { addAuthCookieToRes } from '../services/cookieService.js';

export const AuthService = class {
    fails;

    constructor(reqBody) {
        const { username, password } = reqBody;
        this.fails = !username || !password;
        this.username = username;
        this.password = password;
    }

    // try {
    //     const authUserData = await getAuthUserData(username, password);

    //     addAuthCookieToRes(res);

    //     return res.json({
    //         message: 'Login successful',
    //         data: {
    //             username: authUserData.username,
    //             type: authUserData.type,
    //         },
    //     });
    // } catch (error) {
    //     console.error(`[POST] Login error: ${error.message}`);
    //     res.status(500).json({
    //         message: 'Internal server error',
    //         data: {},
    //     });
    // }
};

export const hashPassword = async (passwordInput) => {
    const hashedPassword = await bcrypt.hash(passwordInput, 8);
    return hashedPassword;
};

export const getAuthUserData = async (username, password) => {
    const user = await Users().select().where('username', username).first();
    if (!user) {
        throw new Error('No user');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Password fail');
    }

    const tokenPayload = {
        username,
        type: user.type,
    };

    const accessToken = jwt.sign(
        tokenPayload,
        process.env.ACCESS_TOKEN_SECRET,
        { algorithm: 'HS512', expiresIn: '1y' }
    );

    // TODO: vratiti i userId da se lakse radi sa podacima

    return { token: accessToken, username, type: user.type };
};

export const validateToken = ({ username, userType, token, secret }) => {
    try {
        const tokenPayload = jwt.verify(token, secret);
        const oldUsername = tokenPayload.username;
        const oldUserType = tokenPayload.type;

        return username === oldUsername && userType === oldUserType;
    } catch (err) {
        return false;
    }
};
