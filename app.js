// Dependencies
var express = require('express'),
  https = require("https"),
  fs = require('fs')

// Express setup
var app = express()

//SSL Path
var options = {
  cert: fs.readFileSync('./config/ssl/fullchain.pem'),
  key: fs.readFileSync('./config/ssl/privkey.pem')
}

//Routes
app.get('/', (req, res) => {
  res.send('hello world')
})

//Server listeners
var http = app.listen(3000, () => {
  console.log("Listening on port 3000")
})

var server = https.createServer(options, app).listen(3001, () => {
  console.log("Listening on port 3001 for https")
})
