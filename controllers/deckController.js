const db = require('../models');

const indexDecks = (req, res) => {
    db.User.findById(req.session.currentUser.id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
        const foundDecks = foundUser.decks;
        res.status(200).json({
            status: 202,
            data: foundDecks
        });
    });
};

const createDeck = (req, res) => {
    db.User.findById(req.session.currentUser.id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
        db.Deck.create(req.body, (err, createdDeck) => {
            if (err) return res.status(500).json({
                status: 500,
                message: "Something went wrong, please try again."
            });
            foundUser.decks.push(createdDeck);
            foundUser.save((err) => {
                if (err) return res.status(500).json({
                    status: 500,
                    message: "Something went wrong, please try again."
                });
                res.status(201).json({
                    status: 201,
                    data: createdDeck,
                    message: "Deck successfully created."
                });  
            })
        });
    });
};

const editDeck = (req, res) => {
    db.User.findById(req.session.currentUser.id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
        const foundDeck = foundUser.decks.id(req.params.deckId)
        foundDeck.title = req.body.title
        foundDeck.description = req.body.description
        foundUser.save((err) => {
            if (err) return res.status(500).json({
                status: 500,
                message: "Something went wrong, please try again."
            });
            res.status(202).json({
                status: 202,
                data: foundUser,
                message: "Deck successfully editted."
            });
        });
    });
};

const deleteDeck = (req, res) => {
    db.User.findById(req.session.currentUser.id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
        function findDeckId(deck) {
            return deck._id == req.params.deckId
        };
        const foundDeck = foundUser.decks.find(findDeckId);
        foundUser.decks.remove(foundDeck._id);
        foundUser.save((err) => {
            if (err) return res.status(500).json({
                status: 500,
                message: "Something went wrong, please try again."
            });
            res.status(200).json({
                status: 200,
                message: "Deck successfully deleted."
            });
        });
    });
};

const indexCards = (req, res) => {
    db.User.findById(req.session.currentUser.id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again please."
        });
        function findDeckId(deck) {
            return deck._id == req.params.deckId
        };
        const foundDeck = foundUser.decks.find(findDeckId);
        res.status(200).json({
            status: 200,
            data: foundDeck.cards 
        })
    });
};

const createCard = (req, res) => {
    db.User.findById(req.session.currentUser.id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again please."
        });
        function findDeckId(deck) {
            return deck._id == req.params.deckId
        };
        const foundDeck = foundUser.decks.find(findDeckId);
        db.Card.create(req.body, ( err, createdCard ) => {
            if (err) return res.status(500).json({
                status: 500,
                message: "Something went wrong, please try again create.", 
            });   
            foundDeck.cards.push(createdCard);
            foundUser.save((err) => {
                if (err) return res.status(500).json({
                    status: 500,
                    message: "Something went wrong, please try again."
                });
                res.status(201).json({
                    status: 201,
                    data: createdCard,
                    message: "Card successfully saved."
                })
            });
        });
    });
};

// const editCard = (req, res) => {
//     db.User.findById(req.session.currentUser.id, ( err, foundUser ) => {
//         if (err) return res.status(500).json({
//             status: 500,
//             message: "Something went wrong, please try again."
//         });

//         function findDeckId(deck) {
//             return deck._id == req.params.deckId
//         };
//         const foundDeck = foundUser.decks.find(findDeckId);
//         console.log(foundUser)

//         function findCardId(card) {
//             return card._id == req.params.cardId
//         };
//         const foundCard = foundDeck.cards.find(findCardId);
//         console.log(foundCard);

//         foundDeck.cards.pop(foundCard);

//         db.Card.create(req.body, ( err, createdCard ) => {
//             if (err) return res.status(500).json({
//                 status: 500,
//                 message: "Something went wrong, please try again create.", 
//             });

//             foundDeck.cards.push(createdCard);
//             foundUser.save((err) => {
//                 if (err) return res.status(500).json({
//                     status: 500,
//                     message: "Something went wrong, please try again."
//                 });  
//                 res.status(202).json({
//                     status: 202,
//                     data: createdCard,
//                     message: "Card successfully editted."
//                 });
//             });

//         // db.Card.findByIdAndUpdate(req.params.cardId, req.body, ( err, updatedCard ) => {
//         //     if (err) return res.status(500).json({
//         //         status: 500,
//         //         message: "Something went wrong, please try again."
//         //     });
//         //     foundDeck.save((err) => {
//         //         if (err) return res.status(500).json({
//         //             status: 500,
//         //             message: "Something went wrong, please try again."
//         //         });  
//         //         res.status(202).json({
//         //             status: 202,
//         //             data: updatedCard,
//         //             message: "Card successfully editted."
//         //         });
//         //     });
//         // });
//         });
//     });
// };

const editCard = (req, res) => {
    db.User.findById(req.session.currentUser.id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again. 1"
        });
        const foundDeck = foundUser.decks.id(req.params.deckId);
        const foundCard = foundDeck.cards.id(req.params.cardId);
        foundCard.card_text = req.body.card_text;
        foundUser.save((err) => {
            if (err) return res.status(500).json({
                status: 500,
                message: "Something went wrong, please try again."
            });
            res.status(202).json({
                status: 202,
                data: foundCard.card_text,
                message: "Card successfully edited"
            });
        });
    });
};

const deleteCard = (req, res) => {
    db.User.findById(req.session.currentUser.id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
        function findDeckId(deck) {
            return deck._id == req.params.deckId;
        };
        const foundDeck = foundUser.decks.find(findDeckId);
        function findCardId(card) {
            return card._id == req.params.cardId;
        };
        const foundCard = foundDeck.cards.find(findCardId);
        foundDeck.cards.remove(foundCard._id)
        foundUser.save((err) => {
            if (err) return res.status(500).json({
                status: 500,
                message: "Something went wrong, please try again."
            });
            res.status(200).json({
                status: 200,
                message: "Deck successfully deleted."
            });
        });
    }
)};

module.exports ={ 
    indexDecks,
    createDeck,
    editDeck,
    deleteDeck,
    indexCards,
    createCard,
    editCard,
    deleteCard
}