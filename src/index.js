const { PORT } = require('./constants')
const { DB_STRING } = require('./constants');
const mongoose = require('mongoose');

const app = require('./config/express');

mongoose.connect(DB_STRING)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server up and running at port ${PORT}...`)
        });
    })


