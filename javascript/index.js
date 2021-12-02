const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shanouf', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("The connection is successful");
});

const KittySchema = new mongoose.Schema({
    name: String,
});

KittySchema.methods.speak = function () {
    var greeting = "Hello, this is " + this.name;
    console.log(greeting);
}
var Kitten = mongoose.model('shankitty', KittySchema);

var shankit = new Kitten({name : "sangkitty"});
var shakit = new Kitten({name: "yellkitty"});
shankit.save(function (err, shaki) {
    if (err) return console.error(err);
    shaki.speak();
});
shakit.save(function (err, shanu) {
    if (err) return console.error(err);
    shanu.speak();
});
Kitten.find({name: 'yellkitty'}, function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
});


