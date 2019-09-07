const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Deck = require('./Deck')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Username or email has already been registered."]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Username or email has already been registered."]
    },
    password: {
        type: String,
        required: true
    },
    profile_image: {
        type: String,
        default: 'https://www.pinclipart.com/picdir/big/97-977420_png-black-and-white-icon-free-download-png.png'
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