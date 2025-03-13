const jwt = require("jsonwebtoken");
const secret = "fitnessApp";

// Function to create an access token
const createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };
    return jwt.sign(data, secret, { expiresIn: "1d" }); // Ensure expiry is set
};

// Middleware for verifying JWT
const verify = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ auth: "Failed. No Token" });
    }

    token = token.slice(7, token.length); // Remove "Bearer " prefix

    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            return res.status(401).send({ auth: "Failed", message: err.message });
        } else {
            req.user = decodedToken;
            next();
        }
    });
};

// Correctly export both functions
module.exports = { createAccessToken, verify };
