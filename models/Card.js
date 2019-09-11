const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    card_text: {
        required: true,
        type: String
    },
    clicked: {
        required: true,
        type: Boolean,
        default: false
    },
    visibility: {
        required: true,
        type: String,
        default: "visible"
    }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;