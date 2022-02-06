const express = require('express');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const path = require('path');
const { authenticate } = require('../middleware/authMiddleware');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(authenticate);

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: null,
}));
app.set('view engine', 'hbs');

app.use(express.static(path.normalize(path.join(__dirname, '../public'))));

app.use(routes);


module.exports = app;