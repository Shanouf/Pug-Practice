//defining certain constants
const express=require('express');
const path=require("path");
const mongoose=require('mongoose');
const app=express();
const hostname='127.0.0.1';
const port=8000;
//connecting the mongoose
mongoose.connect('mongodb://localhost/shanouf', {useNewUrlParser: true, useUnifiedTopology: true});
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('The connection is successful');
});
//regarding creation of a schema and a model
const contactSchema= new mongoose.Schema({
    Name: String,
    College: String,
    'Favourite Subject': String,
    Email: String,
    Phone: String,
    'Interest of the student': String,
});
var Content=mongoose.model('data', contactSchema);
//regarding static files
app.use('/static', express.static('static'));
app.use(express.urlencoded());
//setting the template engine
app.set('view engine', 'pug');
app.set('../views', path.join(__dirname, '../views'));
//setting the post request to collect the data of the form
app.post('/submit', (req, res) => {
    var myData= new Content(req.body);
    myData.save().then(()=>{
        res.send("your data is saved in the database");
    }).catch(()=>{
        res.status(400).send("your data was not saved to the database");
    })
});
//setting the endpoints
app.get('/', (req, res) => {
    res.status(200).render('home');
});
app.get('/about', (req, res) => {
    res.status(200).render('about');
});
app.get('/form', (req, res) => {
    res.status(200).render('form');
});
//listening to the port
app.listen(port, hostname, () => {
    console.log(`The server started successfully at http://${hostname}:${port}`);
});


