const express = require('express');

function setUpStaticFiles(app) {
    app.use(express.static('public'));
}


module.exports = setUpStaticFiles;