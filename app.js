/**
 * Express app
 * @module app
 * @requires module:configuration
 * @requires module:middlewares
 * @requires module:routes
 */
const swaggerUI = require("swagger-ui-express");
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const express = require('express');
const { logger } = require('./configuration')
const createError = require('http-errors');

const {middleware} = require('./middlewares');

const routes = require('./routes')

/**
 * @type {Object}
 * @namespace app
 * @const
 */
const app = express();

/**
 * Load swagger document
 */

 const swaggerDocument = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './configuration', 'open-api.yaml'), 'utf8'));


/**
 * GET home page
 */
app.get('/', (req, res) => {
	logger.debug('GET /');
	res.redirect('/api-docs');
});

var swaggerOptions = {
	defaultModelsExpandDepth: -1,
}

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, false, swaggerOptions));

process.on('unhandledRejection', (reason) => {
  logger.error(reason);
  process.exit(1);
});

/**
 * Executes middlewares in app.js file
 * @function middleware {@link module:middleware}
 */
middleware(app);

/**
 * Executes routes in app.js file
 * @function routes {@link module:routes}
 */
routes(app);

app.use((req, res, next) => {
  const error = createError(404);
  next(error);
});
 
/**
 * @function use
 * @param {Callback} errorHandler - global handler
 */
app.use(
  /**
   * returns a user friendly response for errors
   * @function errorHandler
   * @param {Object} error
   * @param {Object} req
   * @param {Object} res
   * @param {Callback} next
   */
  (error, req, res, next) => { 
  logger.error(error.message);

  res.statusCode = error.statusCode;
  res.json({
    message: error.message
  });
});

module.exports = app;