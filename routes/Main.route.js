var router = require("express").Router();

//Main route
router.get('/', (req, res) => {
    res.render('pages/index', {
        session: req.session
    })
})

//Info Route
router.use('/info', require('./Info.route.js'))
//Auth Route
router.use('/a', require('./Auth.route.js'))

//Route for anything else, for shortened urls, provided by :shortId
router.get('/:shortId', (req, res) => {
    if (req.originalUrl.endsWith('?'))
        res.redirect('/info/' + req.params.shortId)
    else
        res.send('URL: ' + req.params.shortId)
})


module.exports = router;