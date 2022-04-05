const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const postLogin = (req, res, next) => {
    try {
        const user = req.app.db.get("users").find({ username: req.body.username }).value();
        if (!user) {
            return next(createError(401));
        }

        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user.id, username: user.username }, secret, {
            expiresIn: '24h'
        });

        res.json({ token });

    } catch (error) {
        next(createError(500));
    }
}

module.exports = {
    postLogin
}