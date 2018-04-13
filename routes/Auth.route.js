//Dependencies
var router = require("express").Router();
var mongoose = require('mongoose');
var User = require('../models/Users.js');

//Main auth route
router.get('/', (req, res) => {
    res.send('Hello auth')
})

//Login route
router.get('/login', (req, res) => {
    res.render('pages/login')
})
//Login post route
router.post('/login', (req, res) => {
    //if post data includes username and password
    if (req.body.username &&
        req.body.password) {
        //Authenticate user with schema method
        User.authenticate(req.body.username, req.body.password, (err, user) => {
            //If account is found and password is correct
            if (user) {
                //Set session data for user
                req.session.userId = user._id
                req.session.username = user.username
                req.session.authenticated = true
                //redirect to main page
                res.redirect('/')
            } else {
                //username or password was incorrect, so redirecting back to login page
                res.redirect('/a/login')
            }
        })
    }
})

//Signup route
router.get('/signup', (req, res) => {
    res.render('pages/signup')
})
//Signup post route
router.post('/signup', (req, res) => {
    //If user post'ed username, email and pass
    if (req.body.username &&
        req.body.email &&
        req.body.password) {
        //Creating new user from user schema
        var cUser = new User({
            username: req.body.username,
            email: req.body.email,
        })
        //Hashing password with method from user schema
        cUser.setPassword(req.body.password);
        //Saving user to database
        cUser.save(function (err) {
            if (err) throw err;
        })
        //Redirect back to main page assuming everything went fine
        res.redirect('/')
    } else {
        //Redirect back to signup as users post wasnt correct
        res.redirect('/a/signup')
    }
})
//Logout route
router.get('/logout', (req, res) => {
    //Destroy session
    req.session.destroy(function (err) {
        //Redirect to main page
        res.redirect('/')
    })
})


//Exports
module.exports = router;