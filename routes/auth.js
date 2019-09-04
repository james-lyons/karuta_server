const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authrequired');

// Register Routes
router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.post('/logout', ctrl.auth.logout);

module.exports = router;