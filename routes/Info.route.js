//Dependencies
var router = require("express").Router();

//Main route
router.get('/', (req, res) => {
    res.send('Hello info')
})

//Info route for specific id profided by :shortId 
router.get('/:shortId', (req, res) => {
    res.send('Info on ' + req.params.shortId)
})


//Exports
module.exports = router;
