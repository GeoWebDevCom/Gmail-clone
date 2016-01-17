var express = require('express');
var app = express();
var cors = require('cors');

// Load Express Configuration
require('./expressConfig')(app, express);

app.use(cors());

// Root route
app.get('/', function(req, res){
  res.sendfile('index.html', {root: app.settings.main});
});

// Load routes
require('./routes/mail')(app); // mail routes
// require('./routes/user')(app); //user routes
// require('./routes/category')(app); // category routes

module.exports = app;