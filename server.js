let express = require("express");
let cors = require("cors");

var app = express();

app.use(cors({ origin: "https://trello.com" }));
app.use(express.static("public"));

var listener = app.listen(process.env.PORT, function () {
  console.log("Listening on port " + listener.address().port);
});
