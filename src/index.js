const { PORT } = require('./constants')
const express = require('express');
const app = express();


app.listen(PORT, () => {
    console.log(`Server up and running at port ${PORT}...`)
});

