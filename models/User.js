const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Deck = require('./Deck')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    profile_image: {
        type: String,
        default: 'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png'
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    decks: [Deck.schema],
    signup_date: {
        type: Date,
        default: Date.now
    },
    games_played: {
        type: Number,
        default: 0
    },
    games_won: {
        type: Number,
        default: 0
    },
    decks_created: {
        type: Number,
        default: 0
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User