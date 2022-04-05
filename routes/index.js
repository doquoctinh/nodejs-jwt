const authRouter = require('./auth');
const bookRouter = require('./books');

module.exports = (app) => {
    app.use('/auth', authRouter);

    app.use('/books', bookRouter);
}