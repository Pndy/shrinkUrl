//Dependencies
var router = require("express").Router();

//Main route
router.get('/', (req, res) => {
    res.send('Hello auth')
})

//Login route
router.get('/login', (req, res) => {
    res.send('Login')
})

//Logout route
router.get('/logout', (req, res) => {
    res.send('Logout')
})


//Exports
module.exports = router;
