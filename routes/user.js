const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authrequired');

// User Routes
router.get('/:id', authRequired, ctrl.user.show);
router.put('/:id', authRequired, ctrl.user.edit);

module.exports = router;
