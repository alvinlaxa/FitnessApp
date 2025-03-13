const bcrypt = require('bcrypt');
const User = require("../models/User");

const auth = require("../auth");

module.exports.registerUser = (req, res) => {
    console.log("Register Request Received:", req.body);

    if (!req.body.email.includes("@")) {
        return res.status(400).send({ error: "Email invalid" });
    }
    if (req.body.password.length < 8) {
        return res.status(400).send({ error: "Password must be at least 8 characters" });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    let newUser = new User({
        email: req.body.email,
        password: hashedPassword
    });

    newUser.save()
        .then(() => res.status(201).send({ message: "Registered Successfully" }))
        .catch(err => {
            console.error("Error in saving:", err);
            return res.status(500).send({ error: "Error in saving user" });
        });
};

module.exports.loginUser = (req, res) => {
    console.log("Login Request Received:", req.body); // ✅ Debugging line

    if (!req.body.email.includes("@")) {
        return res.status(400).send({ error: "Invalid email format" });
    }

    User.findOne({ email: req.body.email })
        .then(result => {
            console.log("User Found:", result); // ✅ Debugging line

            if (!result) {
                return res.status(404).send({ error: "No Email Found" });
            }

            const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
            console.log("Password Match:", isPasswordCorrect); // ✅ Debugging line

            if (isPasswordCorrect) {
                const token = auth.createAccessToken(result);
                console.log("Generated Token:", token); // ✅ Debugging line
                return res.status(200).send({ access: token });
            } else {
                return res.status(401).send({ message: "Email and password do not match" });
            }
        })
        .catch(err => {
            console.error("Error in login:", err);
            return res.status(500).send({ error: "Server error" });
        });
};

module.exports.getProfile = (req, res) => {

    return User.findById(req.user.id)
    .then(user => {
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        user.password = undefined;

        return res.status(200).send({ user });
    })
    .catch(err => {
        console.error("Error in fetching user profile", err)
        return res.status(500).send({ error: 'Failed to fetch user profile' })
    });

};