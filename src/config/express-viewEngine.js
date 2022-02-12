const { engine } = require('express-handlebars');

function setViewEngine(app) {
    app.engine('hbs', engine({
        extname: 'hbs',
        defaultLayout: null,
    }));
    app.set('view engine', 'hbs');
}   

module.exports = setViewEngine;