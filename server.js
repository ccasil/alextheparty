let express = require('express'),
    session = require('express-session'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

let app = express();

mongoose.connect('mongodb://localhost/alextheparty', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

// "C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe"

var UserSchema = new mongoose.Schema({
    name: { type: String },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean }
})
mongoose.model('User', UserSchema)
let User = mongoose.model('User')

app.use(session({
    secret: 'myname',
    resave: false,
    saveUninitialized: false,
}))

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist'));

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});