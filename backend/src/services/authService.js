import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../models/models';

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
        { algorithm: 'HS512', expiresIn: '30s' }
    );

    const refreshToken = jwt.sign(
        tokenPayload,
        process.env.REFRESH_TOKEN_SECRET,
        { algorithm: 'HS512' }
    );

    return { token: accessToken, refreshToken, type: user.type };
};

export const validateToken = ({ username, userType, token, secret }) => {
    try {
        const decodedToken = jwt.verify(token, secret);
        const tokenUsername = decodedToken.username;
        const tokenUserType = decodedToken.type;

        return username === tokenUsername && userType === tokenUserType;
    } catch (err) {
        return false;
    }
};
