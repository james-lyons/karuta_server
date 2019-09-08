const db = require('../models');

const showDeck = (req, res) => {
    db.User.findById(req.session.currentUser.id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });

        db.Deck.findById(req.params.deckId, (err, foundDeck) => {
            if (err) return res.status(400).json({
                status: 400,
                message: "Something went wrong, please try again."
            });
            res.status(200).json({
                status: 200,
                data: foundDeck
            });
        });
    });
};;

const indexDecks = (req, res) => {
    db.User.findById(req.session.currentUser.id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
        
        db.Deck.find({}, (err, foundDecks) => {
            if (err) return res.status(400).json({
                status: 400,
                message: "Something went wrong, please try again."
            });
            res.status(200).json({
                status: 200,
                data: foundDecks
            });
        });
    })
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

        function findDeckId(deck) {
            return deck._id == req.params.deckId
        };
        const foundDeck = foundUser.decks.find(findDeckId);
        console.log(foundDeck);

        // foundUser.decks.pop(foundDeck);
        foundDeck.update(req.body, (err, updatedDeck) => {
            if (err) return res.status(500).json({
                status: 500,
                message: "Something went wrong, please try again."
            });
            foundUser.save((err) => {
                if (err) return res.status(500).json({
                    status: 500,
                    message: "Something went wrong, please try again."
                });
                res.status(202).json({
                    status: 202,
                    data: updatedDeck,
                    message: "Deck successfully editted."
                });
            });

        })

        // db.Deck.updateOne(req.body.deckId, req.body, (err, updatedDeck) => {
        //     if (err) return res.status(500).json({
        //         status: 500,
        //         message: "Something went wrong, please try again."
        //     });

        //     // foundUser.decks.push(createdDeck);
        //     foundUser.save((err) => {
        //         if (err) return res.status(500).json({
        //             status: 500,
        //             message: "Something went wrong, please try again."
        //         });
        //         res.status(202).json({
        //             status: 202,
        //             data: updatedDeck,
        //             message: "Deck successfully editted."
        //         });
        //     });


//         db.Deck.findByIdAndUpdate(req.params.deckId, req.body, (err, updatedDeck) => {
// 
//             foundUser.save((err) => {
//                 if (err) return res.status(500).json({
//                     status: 500,
//                     message: "Something went wrong, please try again."
//                 });
//                 res.status(202).json({
//                     status: 202,
//                     data: updatedDeck,
//                     message: "Deck successfully editted."
//                 });
//             });
//         });
        // });
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
        console.log(foundDeck);

        foundUser.decks.pop(foundDeck);
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
        // db.Deck.findByIdAndDelete(req.params.deckId, (err, deletedDeck) => {
        //     if (err) return res.status(500).json({
        //         status: 500,
        //         message: "Something went wrong, please try again."
        //     });
        //     res.status(200).json({
        //         status: 200,
        //         message: "Deck successfully deleted."
        //     });
        // });
    });
};

const showCard = (req, res) => {
    db.Deck.findById(req.params.deckId, (err, foundDeck) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        })
        db.Card.findById(req.params.cardId, ( err, foundCard ) => {
            if (err) return res.status(500).json({
                status: 500,
                message: "Something went wrong, please try again."
            });
            res.status(200).json({
                status: 200,
                data: foundCard,
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
    // db.Deck.findById(req.params.deckId, (err, foundDeck) => {
    //     if (err) return res.status(500).jron({
    //         status: 500,
    //         message: "Something went wrong, please try again."
    //     })
    
        console.log(foundUser)

        function findDeckId(deck) {
            return deck._id == req.params.deckId
        };
        const foundDeck = foundUser.decks.find(findDeckId);
        console.log(foundDeck);

        res.status(200).json({
            status: 200,
            data: foundDeck.cards 
        })
    
        // db.Card.find({}, ( err, foundCards ) => {
        //     if (err) return res.status(500).json({
        //         status: 500,
        //         message: "Something went wrong, please try again."
        //     });
        //     res.status(200).json({
        //         status: 200,
        //         data: foundCards,
        //         message: `${res}`
        //     });
    //     });
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
        // console.log(foundDeck);

        // db.Deck.findById(req.params.deckId, ( err, foundDeck ) => {
        //     if (err) return res.status(501).json({
        //         status: 501,
        //         message: "Something went wrong, please try again findbyid."
        //     });
    
            db.Card.create(req.body, ( err, createdCard ) => {
                if (err) return res.status(500).json({
                    status: 500,
                    message: "Something went wrong, please try again create.", 
                });
    
                foundDeck.cards.push(createdCard);
                // foundDeck.save((err) => {
                //     if (err) return res.status(500).json({
                //         status: 500,
                //         message: "Something went wrong, please try again save."
                //     });
                //     res.status(201).json({
                //         status: 201,
                //         data: createdCard,
                //         message: "Card successfully created."
                //     });
                // })
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
        // });
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

        db.Deck.findById(req.params.deckId, (err, foundDeck) => {
            if (err) return res.status(500).json({
                status: 500,
                message: "Something went wrong, please try again. 2"
            });

            db.Card.updateOne(req.body.cardId, req.body, (err, updatedCard) => {
                if (err) return res.status(500).json({
                    status: 500,
                    message: "Something went wrong, please try again. 3"
                });

                foundUser.save((err) => {
                    if (err) return res.status(500).json({
                        status: 500,
                        message: "Something went wrong, please try again. 4"
                    });

                    res.status(202).json({
                        status: 202,
                        data: updatedCard,
                        message: "Card successfully editted"
                    });
                });
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
        console.log(foundDeck)

        function findCardId(card) {
            return card._id == req.params.cardId;
        };
        const foundCard = foundDeck.cards.find(findCardId);
        console.log(foundCard)

        foundDeck.cards.pop(foundCard)
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

// // });
//     db.Deck.findById(req.params.deckId, (err, foundDeck) => {
//         if (err) return res.status(500).json({
//             status: 500,
//             message: "Something went wrong, please try again."
//         });
//         db.Card.findByIdAndDelete( req.params.cardId, ( err, deletedCard ) => {
//             if (err) return res.status(500).json({
//                 status: 500,
//                 message: "Something went wrong, please try again."
//             });
//             res.status(200).json({
//                 status: 200,
//                 message: "Card successfully deleted."
//             });
//         });
    )};
// };

module.exports ={ 
    showDeck,
    indexDecks,
    createDeck,
    editDeck,
    deleteDeck,
    showCard,
    indexCards,
    createCard,
    editCard,
    deleteCard
}