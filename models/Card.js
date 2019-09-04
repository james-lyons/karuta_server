const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    card_text: {
        required: true,
        type: String
    }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;