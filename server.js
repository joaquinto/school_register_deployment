const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const ejs = require('ejs');
const app = express();

const stud = require('./router/students.router');
mongoose.connect('mongodb://joaquinto:geek5490^%$@ds249415.mlab.com:49415/heroku_ws7cnzp8');
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'i am a boy',
    saveUninitialized: true,
    resave:true
}));

app.use(express.static(__dirname + '/dist/'));
app.set('views', __dirname + '/dist/');
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.use(cors({ origin: 'http://localhost:4200' }));

app.use('/api/student', stud);

app.get('*', function (req, res) {
    res.render('index.html');
});

mongoose.connection.on('connected', function(){
    app.listen(port, function(){
        console.log('server running on port '+ port);
    });
})
    .on('err', function(err){
        console.log('database error' + err);
    });
