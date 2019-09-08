const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authrequired');

// User Routes
router.get('/:id', authRequired, ctrl.user.show);
router.put('/:id', authRequired, ctrl.user.edit);

// // Deck Decks
// router.get('/:/deck/:deckId', authRequired, ctrl.deck.showDeck);
// router.get('/', authRequired, ctrl.deck.indexDecks);
// router.post('/', authRequired, ctrl.deck.createDeck);
// router.put('/:deckId', authRequired, ctrl.deck.editDeck);
// router.delete('/:deckId', authRequired, ctrl.deck.deleteDeck);

// // Card Routes
// router.get('/:id/deck/:deckId/card/:cardId', authRequired, ctrl.deck.showCard);
// router.get('/:id/deck/:deckId/card', authRequired, ctrl.user.indexCards)
// router.post('/:id/deck/:deckId/card', ctrl.deck.createCard);
// router.put('/:/deck/:deckId/card/:cardId', authRequired, ctrl.deck.editCard);
// router.delete('/:id/deck/:deckId/card/:cardId', authRequired, ctrl.deck.deleteCard);

module.exports = router;
