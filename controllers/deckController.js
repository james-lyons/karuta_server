const db = require('../models');

const show = (req, res) => {
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

const index = (req, res) => {
    db.Deck.findById(req.session.currentUser, (err, foundDecks) => {
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

const create = (req, res) => {
    db.Deck.create(req.session.currentUser, (err, createdDeck) => {
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

const edit = (req, res) => {
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

module.exports ={ 
    show,
    index,
    create,
    edit,
    deleteDeck
}