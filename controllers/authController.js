const bcrypt = require('bcryptjs');
const validate = require('../validation/register');
const db = require('../models');

const register = (req, res) => {
    const { errors, notValid } = validate(req.body);

    if (notValid) {
        return res.status(400).json({ status: 400, errors });
    };
  
    db.User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
    
        if (foundUser) return res.status(400).json({
            status: 400,
            message: "Email or username has already been registered."
        });

        db.User.findOne({ username: req.body.username }), (err, foundUser) => {
            if (err) return res.status(500).json({
                status: 500,
                message: "Something went wrong, please try again."
            });

            if (foundUser) return res.status(400).json({
                status: 400,
                message: "Email or username has already been registered."
            })
            // generate salt and asynchronous callback version
            bcrypt.genSalt(10, (err, salt) => {
                  if (err) return res.status(500).json({
                      status: 500,
                      message: "something went wrong, please try again."
                  });
    
            // hash user password
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) return res.status(500).json({
                        status: 500,
                        message: "Something went wrong, please try again."
                    });
        
                    const newUser = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        password2: hash,
                    };
            
                    db.User.create(newUser, (err, savedUser) => {
                        if (err) return res.status(500).json({
                            status: 500,
                            message: err
                        });
                        res.status(201).json({
                            status: 201,
                            message: 'Success'
                        });
                    });
                });
            });
        };
        // generate salt and asynchronous callback version
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({
                status: 500,
                message: "something went wrong, please try again."
            });

        // hash user password
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) return res.status(500).json({
                    status: 500,
                    message: "Something went wrong, please try again."
                });
    
                const newUser = {
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    password2: hash,
                };
        
                db.User.create(newUser, (err, savedUser) => {
                    if (err) return res.status(500).json({
                        status: 500,
                        message: err
                    });
                    res.status(201).json({
                        status: 201,
                        message: 'Success'
                    });
                });
            });
        });
    });
};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 400,
            message: 'Please enter your email and password.'
        });
    };
    
    db.User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "something went wrong, please try again."
        })
    
        if (!foundUser) return res.status(400).json({
            status: 400,
            message: "Email or password is incorrect."
        });
    
        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({
                status: 500,
                message: "Something went wrong, please try again."
            });
        
            if (isMatch) {
                req.session.loggedIn = true;
                req.session.currentUser = { id: foundUser._id };
                return res.status(200).json({
                    status: 200,
                    message: "Success", id: foundUser._id 
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Username or password is incorect."
                });
            };
        });
    });
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });
        res.sendStatus(200);
    });
};

module.exports = {
    register,
    login,
    logout
}