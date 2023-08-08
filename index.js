// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api", function (req, res) {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:date", function (req, res) {
  const date = req.params.date.includes("-")
    ? new Date(req.params.date)
    : new Date(Number(req.params.date));

  console.log(date.getTime());
  const unix = date.getTime();
  const utc = date.toUTCString();

  if (unix === null || utc === "Invalid Date")
    res.json({ error: "Invalid Date" });

  res.json({
    unix,
    utc,
  });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
