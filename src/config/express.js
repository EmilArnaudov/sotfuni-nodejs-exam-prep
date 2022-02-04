const express = require('express');
const { engine } = require('express-handlebars');
const routes = require('../routes');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended: true}));

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: null,
}));
app.set('view engine', 'hbs');

app.use(express.static(path.normalize(path.join(__dirname, '../public'))));

app.use(routes);


module.exports = app;