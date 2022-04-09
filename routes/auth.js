const { postLogin } = require('../controllers');
const express = require("express");
const router = express.Router();

router.post("/login", postLogin);

module.exports = router;