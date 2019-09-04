const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
// const authRequired = require('../middleware/authrequired');

// User Routes
router.get('/:id', ctrl.user.show);
router.put('/:id', ctrl.user.edit);

// Deck Routes
// router.get('/:id/deck/:id', ctrl.deck.show);
// router.get('/:id/deck', ctrl.deck.index);
// router.post('/:id/deck', ctrl.deck.create);
// router.put('/:id/deck/:id', ctrl.deck.edit);
// router.delete('/:id/deck/:id', ctrl.deck.deleteDeck);

// card Routes
// router.get('/:id/deck/:id/card/:id', ctrl.card.show);
// router.get('/:id/deck/:id/card', ctrl.card.index);
// router.post('/:id/deck/:id/card', ctrl.card.create);
// router.put('/:id/deck/:id/card/:id', ctrl.card.edit);
// router.delete('/:id/deck/:id/card/:id', ctrl.card.deleteCard);

module.exports = router;
