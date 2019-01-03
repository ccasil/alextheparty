let express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

let app = express();

mongoose.connect('mongodb://localhost/alextheparty');

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist'));

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});