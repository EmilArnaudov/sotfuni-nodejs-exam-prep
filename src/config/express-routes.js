const routes = require('./routes');

function applyRoutes(app) {
    app.use(routes);
}

module.exports = applyRoutes