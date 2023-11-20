import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../models/models.js';

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

    return user;
};

export const generateTokenFromUser = (user) => {
    const tokenPayload = {
        id: user.id,
        username: user.username,
        type: user.type,
    };

    const accessToken = jwt.sign(
        tokenPayload,
        process.env.ACCESS_TOKEN_SECRET,
        { algorithm: 'HS512', expiresIn: '1y' }
    );

    return accessToken;
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
