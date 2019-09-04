const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Card = require('./Card')

const deckSchema = new Schema({
    cards: [Card.schema],
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String
    }
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck