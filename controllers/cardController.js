const db = require('../models');

const show = (req, res) => {
    db.Card.findById(req.params.id, (err, foundCard) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
        res.status(200).json({
            status: 200,
            data: foundCard
        });
    });
};

const index = (req, res) => {
    db.Card.find({}, (err, foundCards) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
        res.status(200).json({
            status: 200,
            data: foundCards
        });
    });
};

const create = (req, res) => {
    db.Card.create(req.body, (err, createdCard) => {
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

const edit = (req, res) => {
    db.Card.findByIdAndUpdate(req.params.id, (err, updatedCard) => {
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
    db.Card.findByIdAndDelete(req.params.id, (err, deletedCard) => {
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

module.exports = {
    show, 
    index,
    create,
    edit,
    deleteCard
}