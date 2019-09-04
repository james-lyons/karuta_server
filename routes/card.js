const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authrequired');

router.get('/id:', ctrl.card.show);
router.get('/', ctrl.card.index);
router.post('/', ctrl.card.create);
router.put('/:id', ctrl.card.edit);
router.delete('/:id', ctrl.card.deleteCard);

module.exports = router;