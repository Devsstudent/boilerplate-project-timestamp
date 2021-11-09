// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  if (/^\d{4}-\d{2}-\d{2}/.test(req.params.date) )
  {
    var ut = new Date(req.params.date);
    var timestp = Date.parse(req.params.date);
    res.json({unix: timestp, utc: ut.toUTCString()});
  }
  else if (/\d{13}/.test(req.params.date))
  {
    var time_unix = parseInt(req.params.date);
    var utcc = new Date(time_unix * 1);
    res.json({unix: time_unix, utc: utcc.toUTCString()});
  }
  else if (req.params.date)
  {
    res.json({error: "Invalid Date"});
  }
  else if (/\/$/.test(req.params.date))
  {
    res.json({error: "Invalid Date"});
  }
  else 
  {
    var time = new Date().getTime();
    var utccc = new Date(time * 1);
    res.json({unix: time, utc: utccc.toUTCString()});
  }
  
}); 




// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
