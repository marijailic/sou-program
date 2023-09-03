const bcrypt = require("bcrypt");
const db = require("./db");
const jwt = require("jsonwebtoken");

async function hashPassword(passwordInput) {
    const passwordHash = await bcrypt.hash(passwordInput, 8);
    return passwordHash;
}

async function authUser(username, password) {
    try {
        const response = await db
            .where("username", username)
            .select()
            .from("user");

        if (
            response[0].username &&
            (await bcrypt.compare(password, response[0].password))
        ) {
            const authenticatedUser = {
                username: response[0].username,
            };

            let token = jwt.sign(
                authenticatedUser,
                process.env.ACCESS_TOKEN_SECRET,
                {
                    algorithm: "HS512",
                    expiresIn: "30s",
                }
            );

            let refreshToken = jwt.sign(
                authenticatedUser,
                process.env.REFRESH_TOKEN_SECRET,
                {
                    algorithm: "HS512",
                }
            );

            return {
                token,
                refreshToken: refreshToken,
                username: authenticatedUser.username,
            };
        } else {
            throw new Error("Unauthorized");
        }
    } catch (error) {
        throw error;
    }
}

function authMiddleware(req, res, next) {
    try {
        let authorization = req.headers["authorization"].split(" ");
        let type = authorization[0];
        let token = authorization[1];

        // console.log("TYPE", type);
        // console.log("TOKEN", token);

        let refreshToken = req.headers["refreshtoken"];
        // console.log("REFRESH TOKEN", refreshToken);

        let username = req.headers["username"];
        // console.log("USERNAME", username);

        if (type !== "Bearer") {
            return res.status(401).json({ error: "Unauthorized" });
        } else {
            try {
                req.jwt = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                console.log("AUTH MIDDLEWARE: FIRST TOKEN");
                next();
            } catch (error) {
                // console.log(error);
                // console.log(error.name);
                if (error.name === "TokenExpiredError") {
                    try {
                        if (refreshToken == null)
                            return res
                                .status(401)
                                .json({ error: "Unauthorized" });

                        req.jwt = jwt.verify(
                            refreshToken,
                            process.env.REFRESH_TOKEN_SECRET
                        );

                        let authenticatedUser = { username: username };

                        let token = jwt.sign(
                            authenticatedUser,
                            process.env.ACCESS_TOKEN_SECRET,
                            {
                                algorithm: "HS512",
                                expiresIn: "30s",
                            }
                        );

                        req.jwt = jwt.verify(
                            token,
                            process.env.ACCESS_TOKEN_SECRET
                        );

                        console.log("AUTH MIDDLEWARE: TOKEN REFRESHED");

                        next();
                    } catch (error) {
                        return res.status(401).json({ error: "Unauthorized" });
                    }
                } else {
                    return res.status(401).json({ error: "Unauthorized" });
                }
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Unauthorized" });
    }
}

module.exports = {
    hashPassword,
    authUser,
    authMiddleware,
};
