var express = require('express');
var app = express();

//setting middleware
app.use(express.static(__dirname + '/public'));   //Serves resources from public folder

app.post('/gpioOperation', (req, res) => {
  res.send('Set up Pin Succeed !');
});

app.post('/timerOperation', (req, res) => {
  res.send('PWM has started !');
});

var server = app.listen(5000);