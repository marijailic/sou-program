const bcrypt = require("bcrypt");
const db = require("./db");
const jwt = require("jsonwebtoken");

async function hashPassword(passwordInput) {
    const passwordHash = await bcrypt.hash(passwordInput, 8);
    return passwordHash;
}

async function getAuthUserData(username, password) {
    const user = await db
        .select()
        .from("user")
        .where("username", username)
        .first();

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
}

function validateToken({ username, userType, token, secret }) {
    try {
        const tokenPayload = jwt.verify(token, secret);
        const oldUsername = tokenPayload.username;
        const oldUserType = tokenPayload.type;

        return username === oldUsername && userType === oldUserType;
    } catch (err) {
        return false;
    }
}

function authMiddleware(req, res, next) {
    const authorization = req.headers["authorization"].split(" ");
    const authorizationType = authorization[0];
    const token = authorization[1];
    const refreshToken = req.headers["refreshtoken"];
    const username = req.headers["username"];
    const userType = req.headers["type"];

    if (authorizationType !== "Bearer") {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Validate token
    let isTokenValid = validateToken({
        username,
        userType,
        token,
        secret: process.env.ACCESS_TOKEN_SECRET,
    });

    if (isTokenValid) {
        next();
        return;
    }

    // Validate refresh token
    let isRefreshTokenValid = validateToken({
        username,
        userType,
        token: refreshToken,
        secret: process.env.REFRESH_TOKEN_SECRET,
    });

    if (isRefreshTokenValid) {
        next();
        return;
    }

    return res.status(401).json({ error: "Unauthorized" });
}

module.exports = {
    hashPassword,
    getAuthUserData,
    authMiddleware,
};
