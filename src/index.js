const { PORT } = require('./constants')

const app = require('./config/express');

app.listen(PORT, () => {
    console.log(`Server up and running at port ${PORT}...`)
});

