// packages

const express = require('express')
const mongoose = require('mongoose')
const hbs = require('express-handlebars');
const path = require('path')
const bodyParser = require('body-parser');

// ----------------

const userControl = require('./Routes/user');
const { PORT, URL } = require('./config/constants');
//---------
const app = express()

//middlewares

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/', userControl)

// view engine
app.engine('.hbs', hbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));



// database connection configuration
mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('database connection error' + err.message);
    } else {
        console.log('database connected ');
    }
})


// server connection configuration
app.listen(PORT, (err, done) => {
    if (err) {
        console.log('error in server connection' + err.message);
    } else {
        console.log(`server connected port ${PORT}`);
    }
})

