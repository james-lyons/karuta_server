const mongoose = require('mongoose');
const DB_URL = process.env.DB_URI || 'mongodb://localhost:27017/karuta_server';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log(`MongoDB connection error: ${err}`));

module.exports = {
    User: require('./User'),
    Deck: require('./Deck'),
    Card: require('./Card')
}