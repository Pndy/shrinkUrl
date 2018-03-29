var router = require("express").Router();

//Main route
router.get('/', (req, res) => {
    res.send('Hello world')
})

//Info Route
router.use('/info', require('./Info.route.js'))
//Auth Route
router.use('/a', require('./Auth.route.js'))

//Route for anything else, for shortened urls, provided by :shortId
router.get('/:shortId', (req, res) => {
    res.send('URL: ' + req.params.shortId)
})


module.exports = router;
