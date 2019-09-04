const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authrequired');

router.get('/:id', ctrl.deck.show);
router.get('/', ctrl.deck.index);
router.post('/', ctrl.deck.create);
router.put('/:id', ctrl.deck.edit);
router.delete('/:id', ctrl.deck.deleteDeck);

module.exports = router;