const db = require('../models');

const show = (req, res) => {
    db.User.findById(req.params.id, { password: 0, __v: 0 }, ( err, foundUser ) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again..."
        });
        res.status(200).json({
            status: 200,
            data: foundUser
        });
    });
};
      
const edit = (req, res) => {
    db.User.findByIdAndUpdate(req.session.currentUser.id, req.body, ( err, editedUser ) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Somethign went wrong, please try again'
        });
        res.status(202).json({
            status: 202,
            data: editedUser
        });
    });
};

module.exports = {
    show,
    edit,
}