const { postLogin } = require('../controllers');
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user name
 *         password:
 *           type: string
 *           description: Password
 *       example:
 *         username: tdo43
 *         password: password
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successfully
 *       500:
 *         description: Some server error
 */
router.post("/login", postLogin);

module.exports = router;