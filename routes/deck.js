const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authrequired');

// Deck Decks
router.get('/:id', ctrl.deck.showDeck);
router.get('/', ctrl.deck.indexDeck);
router.post('/', ctrl.deck.createDeck);
router.put('/:id', ctrl.deck.editDeck);
router.delete('/:id', ctrl.deck.deleteDeck);

// Card Routes
router.get('/:id/card/:id', ctrl.deck.showCard);
router.get('/:id/card', ctrl.deck.indexCard);
router.post('/:id/card', ctrl.deck.createCard);
router.put('/:id/card/:id', ctrl.deck.editCard);
router.delete('/:id/card/:id', ctrl.deck.deleteCard);

module.exports = router;
