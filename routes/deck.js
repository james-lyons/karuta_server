const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authrequired');

// Deck Decks
router.get('/:deckId', authRequired, ctrl.deck.showDeck);
router.get('/', authRequired, ctrl.deck.indexDecks);
router.post('/', authRequired, ctrl.deck.createDeck);
router.put('/:deckId', authRequired, ctrl.deck.editDeck);
router.delete('/:deckId', authRequired, ctrl.deck.deleteDeck);

// Card Routes
router.get('/:deckId/card/:cardId', authRequired, ctrl.deck.showCard);
router.get('/:deckId/card', authRequired, ctrl.deck.indexCards);
router.post('/:deckId/card', ctrl.deck.createCard);
router.put('/:deckId/card/:cardId', authRequired, ctrl.deck.editCard);
router.delete('/:deckId/card/:cardId', authRequired, ctrl.deck.deleteCard);

module.exports = router;
