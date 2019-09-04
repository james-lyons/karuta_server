const db = require('../models');

const showDeck = (req, res) => {
    db.Deck.findById(req.params.id, (err, foundDeck) => {
        if (err) return res.status(400).json({
            status: 400,
            message: "Something went wrong, please try again."
        });
        res.status(200).json({
            status: 200,
            data: foundDeck
        });
    });
};;

const indexDeck = (req, res) => {
    db.Deck.find(req.session.currentUser, (err, foundDecks) => {
        if (err) return res.status(400).json({
            status: 400,
            message: "Something went wrong, please try again."
        });
        res.status(200).json({
            status: 200,
            data: foundDecks
        });
    });
};

const createDeck = (req, res) => {
    db.Deck.create(req.body, (err, createdDeck) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
        res.status(201).json({
            status: 201,
            data: createdDeck,
            message: "Deck successfully created"
        });
    });
};

const editDeck = (req, res) => {
    db.Deck.findByIdAndUpdate(req.params.id, (err, updatedDeck) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again"
        });
        res.status(202).json({
            status: 202,
            data: updatedDeck,
            message: "Deck successfully editted"
        });
    });
};

const deleteDeck = (req, res) => {
    db.Deck.findByIdAndDelete(req.params.id, (err, deletedDeck) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again"
        });
        res.status(200).json({
            status: 200,
            message: "Deck successfully deleted"
        });
    });
};

const showCard = (req, res) => {
    db.Card.findById(req.params.id, ( err, foundCard ) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
        res.status(200).json({
            status: 200,
            data: foundCard,
            message: `${res}`
        });
    });
};

const indexCard = (req, res) => {
    db.Card.find({}, ( err, foundCards ) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
        res.status(200).json({
            status: 200,
            data: foundCards,
            message: `${res}`
        });
    });
};

const createCard = (req, res) => {
    db.Card.create(req.body, ( err, createdCard ) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
        res.status(201).json({
            status: 201,
            data: createdCard,
            message: "Card successfully created."
        });
    });
};

const editCard = (req, res) => {
    db.Card.findByIdAndUpdate( req.params.id, ( err, updatedCard ) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
        res.status(202).json({
            status: 202,
            data: updatedCard,
            message: "Card successfully editted."
        })
    })
}

const deleteCard = (req, res) => {
    db.Card.findByIdAndDelete( req.params.id, ( err, deletedCard ) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again"
        });
        res.status(200).json({
            status: 200,
            message: "Card successfully deleted"
        });
    });
};

module.exports ={ 
    showDeck,
    indexDeck,
    createDeck,
    editDeck,
    deleteDeck,
    showCard,
    indexCard,
    createCard,
    editCard,
    deleteCard
}