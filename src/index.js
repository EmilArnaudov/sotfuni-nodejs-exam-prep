const { PORT } = require('./constants')
const { DB_STRING } = require('./constants');

const app = require('./config/express');
const mongoose = require('mongoose');

mongoose.connect(DB_STRING)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server up and running at port ${PORT}...`)
        });
    })


