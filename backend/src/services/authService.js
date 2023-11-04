import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../models/models";

export const hashPassword = async (passwordInput) => {
    const passwordHash = await bcrypt.hash(passwordInput, 8);
    return passwordHash;
};

export const getAuthUserData = async (username, password) => {
    const user = await Users().select().where("username", username).first();

    if (!user) {
        throw new Error("No user");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error("Password fail");
    }

    const authenticatedUser = {
        username,
        type: user.type,
    };

    const token = jwt.sign(authenticatedUser, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS512",
        expiresIn: "30s",
    });

    const refreshToken = jwt.sign(
        authenticatedUser,
        process.env.REFRESH_TOKEN_SECRET,
        {
            algorithm: "HS512",
        }
    );

    return { token, refreshToken, type: user.type };
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
