// Dependencies
var express = require('express'),
  https = require("https"),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  keys = require('./config/keys.js'),
  helmet = require('helmet')

// Express setup
var app = express()

//Express middleware Helmet that hardens the default express installation
app.use(helmet())

//Express middleware - Bodyparser makes parsing request data easier
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Express middleware - session setup
app.use(session({
  secret: keys.secret,
  cookie: {},
  resave: true,
  saveUninitialized: false
}))



//Express middleware for all routes to use session data
app.use(function (req, res, next) {
  res.locals.session = req.session
  next()
})

//Connect to mongodb using mongoose
mongoose.connect(keys.mongodb.dbURI)

//Set view engine as ejs
app.set('view engine', 'ejs')


//SSL Path
var ssl = {
  cert: fs.readFileSync('./config/ssl/fullchain.pem'),
  key: fs.readFileSync('./config/ssl/privkey.pem')
}

//Routes
app.use('/', require('./routes/Main.route.js'))

//Server listeners
var http = app.listen(3000, () => {
  console.log("Listening on port 3000")
})

var server = https.createServer(ssl, app).listen(3001, () => {
  console.log("Listening on port 3001 for https")
})